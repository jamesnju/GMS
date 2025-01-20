import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InvoiceItem {
  description: string;
  amount: number;
}

interface InvoiceBreakdownProps {
  items: InvoiceItem[];
  total: number;
}

export function InvoiceBreakdown({ items, total }: InvoiceBreakdownProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.description}</TableCell>
            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-bold">Total</TableCell>
          <TableCell className="text-right font-bold">${total.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

