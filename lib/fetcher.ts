export default async function fetcher(...args: Parameters<typeof fetch>) {
    const res = await fetch(...args)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}