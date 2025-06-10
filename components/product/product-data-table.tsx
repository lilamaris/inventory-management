// import { productColumns } from '@/lib/definition/schema'
// import { DataTable } from '../data/data-table'
// import { getInventoryItems } from '@/lib/service/inventory'
// import { Suspense } from 'react'
// import { Skeleton } from '../ui/skeleton'

// function LoadingTableSkeleton() {
//     return (
//         <div className="flex flex-col border rounded-md gap-2 p-2">
//             <Skeleton className="h-8 w-full" />
//             {Array.from({ length: 10 }).map((_, index) => (
//                 <div className="flex gap-2" key={index}>
//                     <Skeleton className="h-8 w-20" />
//                     <Skeleton className="h-8 flex-2" />
//                     <Skeleton className="h-8 flex-1" />
//                     <Skeleton className="h-8 w-10" />
//                 </div>
//             ))}
//         </div>
//     )
// }

// export function ProductDataTable() {
//     const products = getInventoryItems()
//     return (
//         <Suspense fallback={<LoadingTableSkeleton />}>
//             <DataTable columns={productColumns} data={products} />
//         </Suspense>
//     )
// }
