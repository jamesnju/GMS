import { getAllServicesCategory, getServiceById } from '@/actions/Services';
import EditService from '@/Globalcomponents/admin/manageSerives/EditService'
import React from 'react'

const page = async({params} : {params:Promise<{id:number}>}) => {
  const {id} = await params;
  const service = await getServiceById(id) || [];
      const category = await getAllServicesCategory() || [];
      console.log(service, "services appo")
  
  return (
    <div><EditService booking={service} categories={category}/></div>
  )
}

export default page