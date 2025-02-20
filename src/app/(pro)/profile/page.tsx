import React from 'react'
import { Profile } from "@/components/Profile"
import { getVehicles } from '@/actions/Vehicle'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
export const dynamic = "force-dynamic"

interface Vehicle {
  id: number;
  licensePlate: string;
  userId: number;
  make: string;
  model: string;
  year: number;
  createdAt: string;
}

const page = async() => {
   const session = await getServerSession(options);
   const userId = session?.user?.id; // Get logged-in user's ID
   const userRole = session?.user?.role; // Get user role
   const Allvehicles = await getVehicles() || [];

    const vehicles = userRole === "Admin" ? Allvehicles : Allvehicles.filter((vehicle:Vehicle) => vehicle.userId === userId);

 
  return (
    <div>
      <Profile vehicles={vehicles}/>
    </div>
  )
}

export default page