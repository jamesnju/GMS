import React from "react";
import { columns } from "./column";
import { DataTable } from "@/shacdn/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookedServices } from "@/actions/Services";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

// Define the interface for the nested category object
interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// Define the interface for the nested user object
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

// Define the interface for the main Booking object
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
const PageView = async () => {
  const session = await getServerSession(options);
  const userId = session?.user?.id; // Get logged-in user's ID
  const userRole = session?.user?.role; // Get user role

  const userBooking = (await getBookedServices()) || [];

  // If the user is an admin, show all bookings; otherwise, show only their own
  const BookingsResponse = userRole === "Admin" ? userBooking : userBooking.filter((booking: Booking) => booking.userId === userId);

  // if (!BookingsResponse.length) {
  //   return <div>No Data</div>;
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage Appointments</CardTitle>
        <CardDescription className="texxt-Text">
          Manage appointments by updating, canceling, and viewing history.
        </CardDescription>
      </CardHeader>

      <DataTable columns={columns} data={BookingsResponse} />
    </Card>
  );
};

export default PageView;

