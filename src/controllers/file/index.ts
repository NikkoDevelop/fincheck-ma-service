import { FastifyReply, FastifyRequest } from 'fastify';
import { createReadStream } from 'fs';

import { logger } from '../../log';
import { ErrorReplyData } from '../../types';
import { IDownloadFile } from './interface';
import { DownloadFileService } from './service/DownloadFile.service';
import {
  DownloadFileSchema
} from './validator';

export const DownloadFileController = async (
  req: FastifyRequest<{ Params: IDownloadFile }>,
  reply: FastifyReply
) => {
  try {
    const data = DownloadFileSchema.parse(req.params);

    const { message, status, filePath } = await DownloadFileService(data.filename);

    if (!filePath) {
      reply
        .status(status)
        .send({
          data: {
            message
          }
        });
      return;
    }

    const stream = createReadStream(filePath);

    reply
      .status(status)
      .header('Content-Type', 'application/pdf')
      .send(stream)
      .type('application/pdf');
  } catch (error) {
    error instanceof Error &&
      logger.error(`DownloadFileController - ${error.message}`);

    reply
      .status(ErrorReplyData.SEND_ERROR.status)
      .send({
        data: {
          message: ErrorReplyData.SEND_ERROR.message
        }
      });
  }
};

const FileController = {
  DownloadFileController
};

export default FileController;
