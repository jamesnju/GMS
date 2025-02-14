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
export const dynamic = "force-dynamic";

const PageView = async () => {
  const BookingsResponse = (await getBookedServices()) || [];

  if (!BookingsResponse) {
    return <div> No Data </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage Appointments</CardTitle>
        <CardDescription className="texxt-Text">
          manage Appointments by updating, canceling and viewing history of
          Appointments.
        </CardDescription>
      </CardHeader>

      <DataTable columns={columns} data={BookingsResponse} />
    </Card>
  );
};

export default PageView;
