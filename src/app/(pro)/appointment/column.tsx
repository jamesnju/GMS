"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="m-0 p-0"
        >
          Email
          <ArrowUpDown className="" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
    
  },
  {
    id: "update",
    header: "Schedule",
    cell: ({ row }) => {
        const handleStatusUpdate = async (status: string) => {
            try {
                const payload = {
                    id: row.original.id,
                    status: status.toUpperCase(), // Convert to uppercase
                };
        
        
                //const response = await axios.patch(baseUrl + "/requestuseraccess", payload);
        
                // if (response.status === 201) {
                //     //toast.success(`Access ${status.toLowerCase()} successfully!`);
                //     //RevalidatePath("/intime-admin/requestaccess");
                //     // alert(`Access ${status.toLowerCase()} successfully!`);
                //     //row.original.status = status.toUpperCase(); // Update the row status locally
                // } else {
                //     //toast.error(`Failed to update access status`);
                //     // alert(`Unexpected response: ${response.status}`);
                // }
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.error?.[0] || // Log specific error details if available
                    "Failed to update access status. Please try again later.";
                console.error("Error updating access status:", error);
                alert(errorMessage);
            }
        };
        
        return (
            <div className="flex gap-2">
                <button
                    onClick={() => handleStatusUpdate("approved")} // Uppercase
                    //disabled={row.original.status === "APPROVED" || row.original.status === "REJECTED"}
                    className={`px-3 py-1 rounded 
                             "bg-gray-400 cursor-not-allowed"
                             "text-white bg-green-500 hover:bg-green-600"
                    `}
                >
                    Reschedule
                </button>
                <button
                    onClick={() => handleStatusUpdate("rejected")} // Uppercase
                    //disabled={row.original.status === "APPROVED" || row.original.status === "REJECTED"}
                    className={`px-3 py-1 rounded 
                        
                            "bg-gray-400 cursor-not-allowed"
                            "text-white bg-red-500 hover:bg-red-600"
                    `}
                >
                    Cancel
                </button>
            </div>
        );
        

      
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
