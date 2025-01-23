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
import axios from 'axios';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type services = {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  createdAt: string;
  price: number;
};

const ActionsCell = ({ row }: { row: { original: services } }) => {
  const dispatch = useDispatch();
  const services = row.original;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/services/${services.id}`);
      // Handle successful deletion (e.g., refetch data, show success message)
    } catch (error) {
      console.error("Failed to delete service", error);
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
    accessorKey: "name",
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
    accessorKey: "price",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];