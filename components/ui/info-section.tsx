import { ReactNode } from 'react'

interface InfoSectionProps {
    title: string
    icon?: ReactNode
    descriptions: string[]
    className?: string
}

export default function InfoSection({ title, icon = '📋', descriptions, className = '' }: InfoSectionProps) {
    return (
        <div className={`rounded-lg border bg-card p-6 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg">{icon}</span>
                </div>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <ul className="space-y-3">
                {descriptions.map((description, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary mt-0.5">
                            {index + 1}
                        </div>
                        <span
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{
                                __html: description.replace(
                                    /\*\*(.*?)\*\*/g,
                                    '<span class="font-medium text-foreground">$1</span>',
                                ),
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
