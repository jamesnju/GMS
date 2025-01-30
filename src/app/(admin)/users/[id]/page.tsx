import { getUserById } from "@/actions/User";
import EditUser from "@/Globalcomponents/admin/EditUser";
import React from "react";

interface PageProps {
  params: { id: string }; // Fixed to match the actual structure
}

// This is a server component by default
const Page = async ({ params }: PageProps) => {
  try {
    const userId =await  parseInt(params.id, 10); // Convert id to number
    if (isNaN(userId)) {
      throw new Error("Invalid user ID");
    }

    const userData = await getUserById(userId);

    return (
      <div>
        {userData ? (
          <EditUser userData={userData} />
        ) : (
          <div>No user data found. Please try again.</div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    return <div>Error loading user data. Please try again later.</div>;
  }
};

export default Page;
