import * as fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';

interface IReturnGetBankAccountsStatisticServiceData extends IBaseServiceReply {
  file?: string,
}

interface Table {
  headers: string[];
  rows: (number | string)[][];
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

    const fileName = new Date().toISOString();
    const pdfPath = path.join(__dirname, '../../../export', `output_${fileName}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    doc.fontSize(16).text('Банковские транзакции', { align: 'center' });
    doc.moveDown();

    const table: Table = {
      headers: ['Банковский счет', 'Название', 'ID транзикции', 'Тип', 'Сумма', 'Описание'],
      rows: []
    };

    foundBankAccounts.forEach((bankAccount) => {
      table.rows.push([bankAccount.id, bankAccount.title, '', '', '', '']);

      bankAccount.transactions.forEach((transaction) => {
        table.rows.push(['', '', transaction.id, transaction.type, transaction.amount, transaction.description || '']);
      });
    });

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold'),
      prepareRow: () => doc.font('Helvetica')
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
