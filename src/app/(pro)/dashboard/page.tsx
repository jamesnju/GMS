import { getBookedServices } from '@/actions/Services';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { CustomerDashboard } from '@/components/CustomerDashboard'
import AdminDashboard from '@/Globalcomponents/admin/AdminDashboard';
import { getServerSession } from 'next-auth';

const page = async() => {
    const BookingsResponse = await getBookedServices() || [];

  const session = await getServerSession( options );
  return (
    <div>
      {session?.user.role == "Admin" ? (
        <AdminDashboard/>
      ): (

      <CustomerDashboard BookingsResponse={BookingsResponse}/>
      )}
    </div>
  )
}

export default page