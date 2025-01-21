import { getAllServices, getAllServicesCategory } from '@/actions/Services';
import BookServices from '@/Globalcomponents/BookServices'
import React from 'react'

const page = async() => {
  const services = await getAllServices() || [];
  const serviceCategories = await getAllServicesCategory() || [];
  console.log(services, "the service")
  return (
    <div className='h-screen"'>
      <BookServices services={services} categories={serviceCategories}/>
    </div>
  )
}

export default page