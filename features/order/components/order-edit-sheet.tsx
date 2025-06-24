import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PropsWithChildren } from 'react'

export interface OrderEditSheetProps {
    triggerIcon: React.ReactNode
}

export default function OrderEditSheet({ triggerIcon, children }: PropsWithChildren<OrderEditSheetProps>) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    {triggerIcon}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Order</SheetTitle>
                </SheetHeader>
                <div className="mx-4">{children}</div>
            </SheetContent>
        </Sheet>
    )
}
