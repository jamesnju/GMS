import { getUserById } from "@/actions/User";
import EditUser from "@/Globalcomponents/admin/EditUser";
import React from "react";
export const dynamic = "force-dynamic"

interface PageProps {
  params: { id: number };
}

const Page = async ({ params }: PageProps) => {
  const { id } =  params;

  const userData = await getUserById(id);

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <EditUser userData={userData} />
    </div>
  );
};

export default Page;