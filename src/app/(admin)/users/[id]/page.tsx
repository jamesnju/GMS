import { getUserById } from '@/actions/User';
import EditUser from '@/Globalcomponents/admin/EditUser';
import React from 'react'

interface PageProps {
    params: Promise<{ id: string; }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const userId = parseInt(id, 10); // Ensure the id is a number

  const userData = await getUserById(userId);

  return (
      <div>
          {userData ? (
              <EditUser userData={userData} />
          ) : (
              <div>Error fetching user data. Please try again.</div>
          )}
      </div>
  );
};

export default Page;