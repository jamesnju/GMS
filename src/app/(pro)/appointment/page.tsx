import React from 'react'
import { columns } from './column'
import { DataTable } from '@/shacdn/data-table';
// import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBookedServices } from '@/actions/Services';
// import { Button } from '@/components/ui/button';
export const dynamic = "force-dynamic"



const PageView = async() => {
  const BookingsResponse = await getBookedServices() || [];
//   const editdata = useSelector((state: RootState) => state.property.editdata)
//console.log(BookingsResponse, "BookingsResponse======================");
if(!BookingsResponse){
  return <div> No Data </div>
}

  return (
    <Card>
    {/* <div className='overflow-hidden mx-28 rounded-md shadow-lg '> */}
        <CardHeader>
        <CardTitle className='text-Text'>Manage Appointments</CardTitle>
        <CardDescription className='texxt-Text'>manage Appointments by updating, canceling and viewing history of Appointments.</CardDescription>
      </CardHeader>
      {/* <div className="flex w-full flex-end justify-end mr-20">
        <Link href='/book'>
      <Button className='flex-end font-bold text-white white px-6 py-3 rounded-md'>Book</Button>
        </Link>
      </div> */}
      <DataTable columns={columns} data={BookingsResponse} />

    {/* </div> */}
    </Card>
  )
}

export default PageView