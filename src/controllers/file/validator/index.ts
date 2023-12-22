import { z } from 'zod';

export const DownloadFileSchema = z.object({
  filename: z.string({
    required_error: 'The filename is required!'
  })
    .min(1)
}).strict();
