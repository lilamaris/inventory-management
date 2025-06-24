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

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export type PrimitiveWithPartial<Primitive, Map, Key extends (keyof Map)[]> = Primitive &
    UnionToIntersection<Partial<Map[Key[number]]>>
export type PrimitiveWithInclude<Primitive, Map, Key extends (keyof Map)[]> = Primitive &
    UnionToIntersection<Map[Key[number]]>
