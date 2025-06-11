import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
    {
        'import/no-restricted-paths': [
            'error',
            {
                zones: [
                    // disable cross-feature imports:
                    // eg. src/features/auth should not import from src/features/product
                    {
                        target: './features/auth',
                        from: './features',
                        message: 'Cross-feature imports are not allowed',
                        except: ['./auth'],
                    },
                    {
                        target: './features/product',
                        from: './features',
                        message: 'Cross-feature imports are not allowed',
                        except: ['./product'],
                    },
                    {
                        target: './features/user',
                        from: './features',
                        message: 'Cross-feature imports are not allowed',
                        except: ['./user'],
                    },
                    {
                        target: './features/order',
                        from: './features',
                        message: 'Cross-feature imports are not allowed',
                        except: ['./order'],
                    },
                ],
            },
        ],
    },
    {
        'import/no-restricted-paths': [
            'error',
            {
                zones: [
                    // enforce unidirectional codebase:
                    // eg. src/app can import from src/features but not the other way around
                    {
                        target: './features',
                        from: './app',
                    },
                    {
                        target: ['./components', './hooks', './lib', './utils', './types'],
                        from: ['./features', './app'],
                    },
                ],
            },
        ],
    },
]

export default eslintConfig
