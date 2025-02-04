import React from "react";
import "../globals.css";
import { Login } from "@/Globalcomponents/auth/Login";
export const dynamic = "force-dynamic"



const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
