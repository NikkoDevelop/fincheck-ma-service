import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: 'The email is required!'
    })
    .email()
    .min(1),
  password: z
    .string({
      required_error: 'The password is required!'
    })
    .min(8)
}).required({
  email: true,
  login: true,
  password: true
});

export const SignInSchema = z.object({
  email: z
    .string()
    .email()
    .min(1),
  password: z
    .string({
      required_error: 'The password is required!'
    })
    .min(8)
}).strict();
