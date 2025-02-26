import React from 'react';
import { columns } from './column';
import { DataTable } from '@/shacdn/data-table';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookedServices } from '@/actions/Services';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

// Define the interface for the nested service object
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

export const dynamic = "force-dynamic";

const PageView = async () => {
  const session = await getServerSession(options);
  const userId = session?.user?.id; // Get logged-in user's ID
  const userRole = session?.user?.role; // Get user role

  if (!userId) {
    return <div>No session found</div>; // Handle case where userId is not found
  }

  const userBooking = (await getBookedServices()) || [];

  // Filter bookings to exclude "Pending" status
  const BookingsResponse = userRole === "Admin" 
    ? userBooking.filter((booking: Booking) => booking.status !== "Pending")
    : userBooking.filter((booking: Booking) => booking.userId === userId && booking.status !== "Pending");
console.log(BookingsResponse, "the appoint")
  // if (!BookingsResponse.length) {
  //   return <div>No Data</div>; // Return if no bookings are found
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage Appointments</CardTitle>
        <CardDescription className="texxt-Text">
          Manage appointments by updating, canceling, and viewing the history.
        </CardDescription>
      </CardHeader>

      <DataTable columns={columns} data={BookingsResponse} />
    </Card>
  );
};

export default PageView;
