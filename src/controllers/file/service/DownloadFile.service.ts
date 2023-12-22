import * as path from 'path';

import { logger } from '../../../log';
import { ErrorReplyData, IBaseServiceReply, SuccessReplyData } from '../../../types';

interface IReturnDownloadFileServiceData extends IBaseServiceReply {
  filePath?: string,
}

export const DownloadFileService = async (filename: string): Promise<IReturnDownloadFileServiceData> => {
  try {
    const generatedPath = path.join(__dirname, '../../../export', filename);

    return {
      message: SuccessReplyData.SEND_SUCCESS.message,
      status: SuccessReplyData.SEND_SUCCESS.status,
      filePath: generatedPath
    };
  } catch (error) {
    error instanceof Error &&
      logger.error(`DownloadFileService - ${error.message}`);

    return {
      message: ErrorReplyData.SEND_ERROR.message,
      status: ErrorReplyData.SEND_ERROR.status
    };
  }
};
