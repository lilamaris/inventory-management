import { z } from 'zod'

type InterFieldErrors<T extends z.ZodType> = {
    [K in keyof z.infer<T>]?: string[]
}

export type ActionState<T extends z.ZodType> =
    | {
          errors?: InterFieldErrors<T>
          payload?: Record<string, FormDataEntryValue>
          message?: string
      }
    | undefined
