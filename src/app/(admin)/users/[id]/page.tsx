import { getUserById } from "@/actions/User";
import EditUser from "@/Globalcomponents/admin/EditUser";
import React from "react";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const id = Number(params.id); // Convert string to number

  if (isNaN(id)) {
    return <div>Invalid User ID</div>;
  }

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
