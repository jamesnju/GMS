import React from 'react'
import PageView from './pagev'
import { getAllServices, getAllServicesCategory,  } from "@/actions/Services";

export const dynamic = "force-dynamic"

const page = async() => {
    const services = await getAllServices() || [];
    const category = await getAllServicesCategory() || [];
  if(!services){
    return <div> No Data </div>
  }
  return (
    <div>
      <PageView services={services} category={category}/>
    </div>
  )
}

export default page