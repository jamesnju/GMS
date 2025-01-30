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
import { ArrowUpDown, Loader, MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import baseUrl from "@/utils/constant";
import { toast } from "react-toastify";

// Define the validation schema for scheduling
const formSchema = z.object({
  bookedDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date({
    required_error: "Please select a date.",
  })),
  status: z.enum(["Pending", "Confirmed", "Cancelled"], {
    required_error: "Please select a status.",
  }),
});

// Define the data types
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

interface Booking {
  id: number;
  userId: number;
  serviceId: number;
  categoryId: number;
  description: string;
  bookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  service: Service;
  category: Category;
  user: User;
}

const ScheduleForm = ({ booking }: { booking: Booking }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookedDate: new Date(booking.bookedDate),
      status: booking.status as "Pending" | "Confirmed" | "Cancelled",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${baseUrl}${booking.id}/appointment`, {
        ...values,
        bookedDate: values.bookedDate.toISOString(), // Convert to ISO string format
      });
      console.log("Booking updated successfully:", response.data);
      toast.success("Booking updated successfully");
      setLoading(false);
      window.location.reload();
      // Handle success (e.g., show success message, refetch data)
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error("Failed to update booking, try again");
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="bookedDate">Booked Date</label>
        <input
          type="date"
          id="bookedDate"
          {...register("bookedDate", {
            valueAsDate: true, // Ensure the value is a Date object
          })}
          className="border p-2 rounded"
        />
        {errors.bookedDate && <p className="text-red-500">{errors.bookedDate.message}</p>}
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register("status")} className="border p-2 rounded">
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? (<Loader className="animate animate-spin text-white" />) : "Update Booking"}
      </Button>
    </form>
  );
};

const ScheduleCell = ({ booking }: { booking: Booking }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Close" : "Reschedule"}
      </Button>
      {isFormVisible && <ScheduleForm booking={booking} />}
    </div>
  );
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "service.price",
    header: () => <div className="text-right">Service Price</div>,
    cell: ({ row }) => {
      const amount = row.original.service.price;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: "Category Name",
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
    accessorKey: "bookedDate",
    header: "Appointment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("bookedDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "update",
    header: "Schedule",
    cell: ({ row }) => <ScheduleCell booking={row.original} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id.toString())}>
              Copy booking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View booking details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];