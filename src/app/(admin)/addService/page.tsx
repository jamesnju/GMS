import { getAllServicesCategory } from '@/actions/Services'
import AddService from '@/Globalcomponents/admin/manageSerives/AddService'
import React from 'react'
export const dynamic = "force-dynamic"


const page = async () => {
  const serviceCategories = await getAllServicesCategory() || [];
  if(!serviceCategories){
    return {
      notFound: true,
    }
  }
  //console.log( serviceCategories, "the data service")
  return (
    <div>
        
        <AddService  serviceCategories={serviceCategories}/>
    </div>
  )
}

export default page