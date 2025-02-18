import { getAllUser } from '@/actions/Auth';
import { getBookedServices } from '@/actions/Services';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { CustomerDashboard } from '@/components/CustomerDashboard'
import AdminDashboard from '@/Globalcomponents/admin/AdminDashboard';
import { getServerSession } from 'next-auth';

const page = async() => {
    const BookingsResponse = await getBookedServices() || [];
    const Users = await getAllUser() || [];
    console.log(Users, "users")
    console.log(BookingsResponse, "bookings")

  const session = await getServerSession( options );
  return (
    <div>
      {session?.user.role == "Admin" ? (
        <AdminDashboard Users={Users} BookingsResponse={BookingsResponse}/>
      ): (

      <CustomerDashboard BookingsResponse={BookingsResponse}/>
      )}
    </div>
  )
}

export default page