"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Car, CreditCard, User } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"
import { useSession } from "next-auth/react"
import { format } from "date-fns"

interface Vehicle {
  id: number;
  licensePlate: string;
  userId: number;
  make: string;
  model: string;
  year: number;
  createdAt: string;
}

interface Booking {
  id: number;
  userId: number;
  bookedDate: string;
  status: string;
}

interface BookingResponse {
  BookingsResponse: Booking[];
  Vehicle: Vehicle[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function CustomerDashboard({ BookingsResponse, Vehicle }: BookingResponse) {
  const { data: session } = useSession()

  // Filter bookings for the logged-in user
  const userBookings = BookingsResponse.filter(booking => booking.userId === session?.user?.id)

  // Aggregate appointments by month
  const aggregateAppointments = () => {
    const monthCounts: { [key: string]: number } = {}

    userBookings.forEach(booking => {
      const bookedMonth = format(new Date(booking.bookedDate), 'MMM')
      monthCounts[bookedMonth] = (monthCounts[bookedMonth] || 0) + 1
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    return months.map(month => ({
      month,
      appointments: monthCounts[month] || 0,
    }))
  }

  const appointmentData = aggregateAppointments()

  // Filter vehicles for the logged-in user
  const userVehicles = Vehicle.filter(v => v.userId === session?.user?.id)

  // Aggregate vehicle data by model
  const vehicleCount: { [key: string]: number } = {}

  userVehicles.forEach(v => {
    vehicleCount[v.model] = (vehicleCount[v.model] || 0) + 1
  })

  const vehicleData = Object.keys(vehicleCount).map((model, index) => ({
    name: model,
    value: vehicleCount[model],
    color: COLORS[index % COLORS.length]
  }))

  return (
    <div className="container mx-auto p-2 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Appointment History Chart */}
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

        {/* Vehicle Distribution Chart */}
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
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
                <Link href="/profile">
                  <Car className="mr-2 h-4 w-4" /> Vehicles
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/appointment">
                  <CalendarDays className="mr-2 h-4 w-4" /> Appointments
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/payment">
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
