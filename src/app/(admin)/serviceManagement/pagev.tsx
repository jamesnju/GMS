"use client"
import React, { useState } from "react";
import { columns } from "./column";
import { DataTable } from "@/shacdn/data-table";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columnCategory } from "./columnCategory";

const PageView = ({ services, category }: { services: any; category: any }) => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-Text">Admin Service Management</CardTitle>
        <CardDescription className="texxt-Text">
          Manage Services by Adding, deleting and viewing available Services.
        </CardDescription>
      </CardHeader>
      <div className="mt-4 px-5">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "services"
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button
            className={`py-2 px-4 ml-4 ${
              activeTab === "category"
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("category")}
          >
            Category
          </button>
        </div>
        <div className="flex w-full justify-end mt-4">
          {activeTab === "services" && (
            <Link href="/addService">
              <Button className="font-bold text-white px-6 py-3 rounded-md">
                New Service
              </Button>
            </Link>
          )}
          {activeTab === "category" && (
            <Link href="/addServiceCategory">
              <Button className="font-bold text-white px-6 py-3 rounded-md">
                Service Category
              </Button>
            </Link>
          )}
        </div>
        <div className="mt-4">
          {activeTab === "services" && <DataTable columns={columns} data={services} />}
          {activeTab === "category" && <DataTable columns={columnCategory} data={category} />}
        </div>
      </div>
    </Card>
  );
};

export default PageView;