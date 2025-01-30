import { getAllServicesCategory } from '@/actions/Services'
import { Button } from '@/components/ui/button'
import AddService from '@/Globalcomponents/admin/manageSerives/AddService'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const serviceCategories = await getAllServicesCategory() || [];
  //console.log( serviceCategories, "the data service")
  return (
    <div>
        <div className="flex w-full flex-end justify-end mr-28 -mx-5">
        <Link href="/serviceManagement">
          <Button className="flex-end  font-bold  text white px-6 py-3 rounded-md  text-white">
            back to service
          </Button>
        </Link>
      </div>
        <AddService  serviceCategories={serviceCategories}/>
    </div>
  )
}

export default page