import Link from 'next/link'

export default function TermsAndService() {
    return (
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline">
                Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/policy" className="underline">
                Privacy Policy
            </Link>
            .
        </div>
    )
}
