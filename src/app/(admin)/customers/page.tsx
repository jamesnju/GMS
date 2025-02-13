import React from 'react';
import PageView from './pagev';
import { getAllUser } from '@/actions/Auth';
export const dynamic = "force-dynamic"

const page = async () => {
  let Users = [];
  try {
    Users = await getAllUser();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return (
    <div>
      <PageView Users={Users}/>
    </div>
  );
};

export default page;