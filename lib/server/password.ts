import { hash, verify } from '@node-rs/argon2'

export async function hashPassword(plainPassword: string): Promise<string> {
    return await hash(plainPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })
}

export async function verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await verify(hashedPassword, plainPassword)
}
