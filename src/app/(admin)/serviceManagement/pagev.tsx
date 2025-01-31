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
import { getAllServices,  } from "@/actions/Services";
export const dynamic = "force-dynamic"



const PageView = async () => {
   const services = await getAllServices() || [];
  //   const editdata = useSelector((state: RootState) => state.property.editdata)
if(!services){
  return <div> No Data </div>
}
  return (
    <Card>
      {/* <div className='overflow-hidden mx-28 rounded-md shadow-lg '> */}
      <CardHeader>
        <CardTitle className="text-Text">Admin Service Management</CardTitle>
        <CardDescription className="texxt-Text">
          manage Services by Adding, deleting and viewing available Services.
        </CardDescription>
      </CardHeader>
      <div className="flex w-full flex-end justify-end mr-28 -mx-5">
        <Link href="/addService">
          <Button className="flex-end  font-bold  text white px-6 py-3 rounded-md  text-white">
            New service
          </Button>
        </Link>
        <Link href="/addServiceCategory">
          <Button className="flex-end  font-bold  text white px-6 py-3 rounded-md  text-white">
            service Category
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={services} />

      {/* </div> */}
    </Card>
  );
};

export default PageView;
