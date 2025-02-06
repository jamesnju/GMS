"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Car, CreditCard, User } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"

const appointmentData = [
  { month: "Jan", appointments: 4 },
  { month: "Feb", appointments: 3 },
  { month: "Mar", appointments: 5 },
  { month: "Apr", appointments: 2 },
  { month: "May", appointments: 6 },
  { month: "Jun", appointments: 4 },
]

const vehicleData = [
  { name: "Sedan", value: 2 },
  { name: "SUV", value: 1 },
  { name: "Truck", value: 1 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function CustomerDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Appointment History</CardTitle>
            <CardDescription>Your appointments over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={appointmentData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="appointments" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Distribution</CardTitle>
            <CardDescription>Types of vehicles you own</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={vehicleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="w-full">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/vehicles">
                  <Car className="mr-2 h-4 w-4" /> Vehicles
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/appointments">
                  <CalendarDays className="mr-2 h-4 w-4" /> Appointments
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/payments">
                  <CreditCard className="mr-2 h-4 w-4" /> Payments
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

