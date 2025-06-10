import { auth } from '@/lib/auth'
// import { ProductDataTable } from '@/components/product/product-data-table'

export default async function Page() {
    const session = await auth()

    return (
        <>
            <h1>Products</h1>
            {/* <ProductDataTable /> */}
        </>
    )
}
