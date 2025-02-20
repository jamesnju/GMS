'use client';

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  MoreHorizontal } from "lucide-react";
import baseUrl from "@/utils/constant";
import { toast } from "react-toastify";
import Link from "next/link";

// This type is used to define the shape of our data.
export type services = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  createdAt: string;
};

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Confirm Delete</h2>
        <p className="text-gray-600">Are you sure you want to delete this service?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

const ActionsCell = ({ row }: { row: { original: services } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = row.original;

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}${id}/service`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success("Service deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service, try again");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // Assuming you have a method to start editing
              // Here we would toggle an edit state or navigate to an edit page
              // For example, you could navigate to an edit page like this:
              // router.push(`/services/edit/${service.id}`);
            }}
          >
            
            <Link href={`/serviceManagement/${service.id}`}>

            Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(service.id)}
      />
    </>
  );
};

export const columns: ColumnDef<services>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "status",
    header: " Status",
    cell: ({ row }) => {
      const status = row.original.status ? row.original.status.toUpperCase() : "Available";
      return (
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            status === "pending"
              ? "bg-yellow-500 text-white"
              : status === "completed"
              ? "bg-green-500 text-white"
              : status === "initiated" 
              ? "bg-red-500 text-white"
              : status === "waiting verification"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
        {row.original.status || "Available"}
        </span>
      );
    },
  },

  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(amount);
 
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {new Date(row.original?.createdAt).toLocaleDateString()}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];