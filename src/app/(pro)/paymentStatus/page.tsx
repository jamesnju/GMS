import React from "react";
import { columns } from "./column";
import { DataTable } from "@/shacdn/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getAllPayments } from "@/actions/payment";
export const dynamic = "force-dynamic";
interface Payment {
  id: number;
  userId: number;
  bookingServiceId: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  createdAt: string;
  transactionId: string | null;
  merchantRequestId: string | null;
  mpesaReceipt: string | null;
}

const PageView = async () => {
  const session = await getServerSession(options);
  const userId = session?.user?.id; // Get logged-in user's ID
  const userRole = session?.user?.role; // Get user role

  const Payments = await getAllPayments() || [];
//console.log(Payments, "payments----------sss--------")
  // If the user is an admin, show all bookings; otherwise, show only their own
  const paymentsResponse = userRole === "Admin" ? Payments : Payments.filter((pay: Payment) => pay.userId === userId);

  // if (!BookingsResponse.length) {
  //   return <div>No Data</div>;
  // }
  //console.log(paymentsResponse, "paymentsResponse----------paymentsResponse--------")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage Payments</CardTitle>
        <CardDescription className="texxt-Text">
          Manage Payments by verifying.
        </CardDescription>
      </CardHeader>

      <DataTable columns={columns} data={paymentsResponse} />
    </Card>
  );
};

export default PageView;

