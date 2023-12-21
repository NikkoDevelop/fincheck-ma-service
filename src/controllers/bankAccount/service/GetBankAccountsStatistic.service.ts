import * as fs from 'fs';
import { PDFDocument } from 'pdfkit';

import { logger } from '../../../log';
import prisma from '../../../prisma';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';

interface IReturnGetBankAccountsStatisticServiceData extends IBaseServiceReply {
  file?: fs.WriteStream,
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

    const doc = new PDFDocument();
    const stream = fs.createWriteStream('output.pdf');

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

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      file: stream
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
