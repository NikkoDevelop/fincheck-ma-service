import * as fs from 'fs';
import * as path from 'path';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit');

interface IReturnGetBankAccountsStatisticServiceData extends IBaseServiceReply {
  file?: string,
}

export const GetBankAccountsStatisticService = async (
  userId: string
): Promise<IReturnGetBankAccountsStatisticServiceData> => {
  try {
    const foundBankAccounts = await prisma.bankAccount.findMany({
      where: {
        user: {
          id: userId
        }
      },
      include: {
        transactions: true
      }
    });

    if (!foundBankAccounts) {
      return {
        message: ErrorReplyData.NON_EXIST_DATA_ERROR.message,
        status: ErrorReplyData.NON_EXIST_DATA_ERROR.status
      };
    }

    const fileName = new Date().getTime();
    const pdfPath = path.join(__dirname, '../../../../export', `output_${fileName}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    doc.fontSize(16).text('Банковские транзакции', { align: 'center' });
    doc.moveDown();

    const tableHeaders = ['Банковский счет', 'Название', 'ID транзикции', 'Тип', 'Сумма', 'Описание'];

    doc.font('Helvetica-Bold');
    tableHeaders.forEach((header, index) => {
      doc.text(header, index * 100, doc.y, { width: 100, align: 'center' });
    });

    doc.font('Helvetica');
    let yOffset = doc.y;

    foundBankAccounts.forEach((bankAccount) => {
      const row = [
        bankAccount.id,
        bankAccount.title,
        '',
        '',
        '',
        ''
      ];

      bankAccount.transactions.forEach((transaction) => {
        row[2] = transaction.id;
        row[3] = transaction.type;
        row[4] = transaction.amount.toString();
        row[5] = transaction.description || '';

        doc.y = yOffset;
        row.forEach((data, index) => {
          doc.text(data, index * 100, doc.y, { width: 100, align: 'center' });
        });

        doc.moveDown();
        yOffset = doc.y;
      });
    });

    doc.end();

    await new Promise((resolve) => {
      stream.on('finish', resolve);
    });

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      file: `output_${fileName}.pdf`
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`GetBankAccountsStatisticService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
