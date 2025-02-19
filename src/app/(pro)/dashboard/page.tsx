import { getAllUser } from '@/actions/Auth';
import { getBookedServices } from '@/actions/Services';
import { getVehicles } from '@/actions/Vehicle';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { CustomerDashboard } from '@/components/CustomerDashboard'
import AdminDashboard from '@/Globalcomponents/admin/AdminDashboard';
import { getServerSession } from 'next-auth';
export const dynamic = "force-dynamic";

const page = async() => {
    const BookingsResponse = await getBookedServices() || [];
    const Users = await getAllUser() || [];
    const Vehicle = await getVehicles() || [];
    //console.log(Users, "users")
    //console.log(BookingsResponse, "bookings")

  const session = await getServerSession( options );
  return (
    <div>
      {session?.user.role == "Admin" ? (
        <AdminDashboard Users={Users} BookingsResponse={BookingsResponse} Vehicle={Vehicle}/>
      ): (

      <CustomerDashboard BookingsResponse={BookingsResponse} Vehicle={Vehicle}/>
      )}
    </div>
  )
}

export default page