import React from 'react'
import { Profile } from "@/components/Profile"
import { getVehicles } from '@/actions/Vehicle'

const page = async() => {
  const vehicles = await getVehicles() || [];
  console.log(vehicles, "vehicles")
  return (
    <div>
      <Profile vehicles={vehicles}/>
    </div>
  )
}

export default page