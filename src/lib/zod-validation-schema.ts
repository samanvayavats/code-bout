import { z } from 'zod'

export const RegisterSchema = z.object({
  userName: z.string(),
  email: z.email(),
  password: z.string().min(8),
})
export type registerUser = z.infer<typeof RegisterSchema>

export const Login = z.object({
  userName: z.string(),
  password: z.string().min(8),
})
