import { describe, expect, it } from 'vitest'
import { hashPassword, verifyPassword } from './password'

describe('Password hash & verify', () => {
    const plainPassword = 'Th1s 1s th3 pl4in 7ex7'

    it('should hash password', async () => {
        const hashedPassword = await hashPassword(plainPassword)

        expect(hashedPassword).toBeDefined()
        expect(hashedPassword).not.toBe(plainPassword)
    })

    it('should verify password', async () => {
        const hashedPassword = await hashPassword(plainPassword)
        const isVerified = await verifyPassword(hashedPassword, plainPassword)

        expect(isVerified).toBe(true)
    })
})
