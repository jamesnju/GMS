import React from 'react'
import { columns, Payment } from './column'
import { DataTable } from '@/shacdn/data-table';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';



async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return[
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com"
    },
    {
      id: "a1b2c3d4",
      amount: 250,
      status: "processing",
      email: "jane.doe@example.com"
    },
    {
      id: "f5e6d7c8",
      amount: 75,
      status: "failed",
      email: "john.smith@example.com"
    },
    {
      id: "g8h9i0j1",
      amount: 120,
      status: "pending",
      email: "alex.brown@example.com"
    },
    {
      id: "k2l3m4n5",
      amount: 500,
      status: "processing",
      email: "lisa.green@example.com"
    },
    {
      id: "o6p7q8r9",
      amount: 300,
      status: "pending",
      email: "david.wilson@example.com"
    },
    {
      id: "s1t2u3v4",
      amount: 50,
      status: "failed",
      email: "emily.jones@example.com"
    },
    {
      id: "w5x6y7z8",
      amount: 400,
      status: "processing",
      email: "daniel.taylor@example.com"
    },
    {
      id: "a9b8c7d6",
      amount: 90,
      status: "pending",
      email: "sarah.thomas@example.com"
    },
    {
      id: "e5f4g3h2",
      amount: 150,
      status: "failed",
      email: "paul.white@example.com"
    }
  ]
  
}

const PageView = async() => {
  const data = await getData();
//   const editdata = useSelector((state: RootState) => state.property.editdata)

  return (
    <Card className='h-screen w-full bg-Background'>
    {/* <div className='overflow-hidden mx-28 rounded-md shadow-lg '> */}
        <CardHeader>
        <CardTitle className='text-Text'>Manage Payment</CardTitle>
        <CardDescription className='texxt-Text'>manage payments by clicking paying and viewing history of payments in the table below.</CardDescription>
      </CardHeader>
      <div className="flex w-full flex-end justify-end mr-28 -mx-5">
        <Link href='/payment'>
      <Button className='flex-end font-bold text-white white px-6 py-3 rounded-md'>Pay</Button>
        </Link>
      </div>
      <div className="h-">

      <DataTable columns={columns} data={data} />
      </div>

    {/* </div> */}
    </Card>
  )
}

export default PageView