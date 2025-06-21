import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTime(time: Date) {
    return time.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function capitalize(str: string) {
    return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}
