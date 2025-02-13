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



const PageView = async () => {
  const services = await getBookedServices() || [];
  //   const editdata = useSelector((state: RootState) => state.property.editdata)
  console.log(services, "booked services")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Manage booking</CardTitle>
        <CardDescription className="texxt-Text">
          manage booking bybooking and viewing.
        </CardDescription>
      </CardHeader>
      <div className="flex w-full flex-end justify-end mr-28 -mx-5">
        <Link href="/book">
          <Button className="flex-end  font-bold  text white px-6 py-3 rounded-md  text-white">
            Book
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={services} />

    </Card>
  );
};

export default PageView;
