import { z } from 'zod'

type InferFieldErrors<T extends z.ZodType> = {
    [K in keyof z.infer<T>]?: string[] | undefined
}

export type ActionState<T extends z.ZodType> =
    | {
          formData?: FormData
          errors?: InferFieldErrors<T>
      }
    | undefined
