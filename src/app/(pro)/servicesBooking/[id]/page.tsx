import { getBookingById } from '@/actions/Services';
import EditServiceBookingForm from '@/Globalcomponents/EditBooking';
import React from 'react'
export const dynamic = "force-dynamic"

interface PageProps {
    params: Promise<{ id: string; }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const userId = parseInt(id, 10); // Ensure the id is a number

  const bookingData = await getBookingById(userId);
  //console.log(bookingData, "bookingData=====================")

  return (
      <div>
          {bookingData ? (
            //   <EditUser userData={userData} />
            <EditServiceBookingForm bookingData={bookingData} />
          ) : (
              <div>Error fetching user data. Please try again.</div>
          )}
      </div>
  );
};

export default Page;