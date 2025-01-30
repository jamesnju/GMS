import { getUserById } from "@/actions/User";
import EditUser from "@/Globalcomponents/admin/EditUser";
import React from "react";

// interface PageProps {
//   params: { id: string };
// }

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const  id = params;

  const userData = await getUserById(Number(id));

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