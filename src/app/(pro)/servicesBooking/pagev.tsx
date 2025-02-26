import React from "react";
import { columns } from "./column";
import { DataTable } from "@/shacdn/data-table";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { getAllServices } from "@/actions/Services";
import { getBookedServices } from "@/actions/Services";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Service {
  id: number;
  userId: number; // userId to associate the booking with the user
  serviceId: number;
  categoryId: number;
  description: string;
  bookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PageView = async () => {
  const session = await getServerSession(options);
  const userId = session?.user?.id; // Get the logged-in user's ID
  const userRole = session?.user?.role; // Get user role

  const userServices = await getBookedServices() || [];

  // Filter services to show only those with status 'Pending'
  const services = userRole === "Admin" 
    ? userServices.filter((service: Service) => service.status === "Pending")
    : userServices.filter((service: Service) => service.userId === userId && service.status === "Pending");

  console.log(services, "booked services");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage booking</CardTitle>
        <CardDescription className="texxt-Text">
          manage booking by booking and viewing.
        </CardDescription>
      </CardHeader>
      <div className="flex w-full flex-end justify-end mr-28 -mx-5">
        <Link href="/book">
          <Button className="flex-end font-bold text-white px-6 py-3 rounded-md">
            Book
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={services} />
    </Card>
  );
};

export default PageView;
