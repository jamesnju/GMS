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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { seteditData, toggleEdit } from "@/store/slice/editSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Modal from 'react-modal';
import { deleteBookedService } from "@/actions/Services";

// Define the type for the services data
export type services = {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  createdAt: string;
  status: string;
};

// Component to render action buttons for each row
const ActionsCell = ({ row }: { row: { original: services } }) => {
  const dispatch = useDispatch();
  const services = row.original;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = async () => {
    try {
      const res = await deleteBookedService(services.id);
        
      // Handle successful deletion (e.g., refetch data, show success message)
      console.log(res);
      // alert(res);
      
    } catch (error) {
      console.error("Failed to delete service", error);
      alert("error")
      // Handle error (e.g., show error message)
    } finally {
      closeModal();
    }
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
              dispatch(seteditData({ ...services, id: Number(services.id) }));
              dispatch(toggleEdit());
            }}
          >
            <Link href={`/servicesBooking/${services.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this service?</p>
        <div className="modal-actions">
          <Button onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

// Define the columns for the table
export const columns: ColumnDef<services>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",  // Corrected accessorKey to match the data structure
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className={`${row.original.status === "Pending" ? "text-orange-300" : row.original.status === "Canceled" ? "text-red-600" : row.original.status  === "Confirmed" ? "text-green-400" : "" } max-w-[500px] truncate font-medium`}>
            {row.original?.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.original?.createdAt).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionsCell, // Use the ActionsCell component as a reference
  },
];