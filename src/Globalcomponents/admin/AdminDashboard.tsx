"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Car, Wrench, DollarSign } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

interface Booking {
  id: number;
  userId: number;
  serviceId: number;
  categoryId: number;
  description: string;
  bookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  service: Service;
  category: Category;
  user: User;
}

interface Vehicle {
  id: number;
  licensePlate: string;
  userId: number;
  make: string;
  model: string;
  year: number;
  createdAt: string;
}
interface BookingResponse {
  BookingsResponse: Booking[];
  Users: User[];
  Vehicle: Vehicle[];
}

export default function AdminDashboard({ BookingsResponse, Users,Vehicle }: BookingResponse) {
  const activeCustomers = new Set(Users.map((user) => user.id)).size;
  const revenue = BookingsResponse.reduce((acc, booking) => acc + booking.service.price, 0)
  const pendingServices = BookingsResponse.filter((booking) => booking.status === "Pending").length
  const vehicleCount = Vehicle.length
  const aggregateAppointments = () => {
    const monthCounts: { [key: string]: number } = {}

    BookingsResponse.forEach((booking) => {
      const bookedMonth = format(new Date(booking.bookedDate), 'MMM') // Extract the month (Jan, Feb, etc.)
      monthCounts[bookedMonth] = (monthCounts[bookedMonth] || 0) + 1
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    return months.map(month => ({
      month,
      appointments: monthCounts[month] || 0,
    }))
  }
  const appointmentData = aggregateAppointments()

  // Get the 3 most recent activities
  const recentActivities = [...BookingsResponse]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Garage Management Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Vehicles", value: vehicleCount, icon: Car, color: "bg-purple-500" },
          { title: "Pending Services", value: pendingServices, icon: Wrench, color: "bg-yellow-500" },
          { title: "Revenue (Monthly)", value: `$${revenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-500" },
          { title: "Active Customers", value: activeCustomers, icon: Users, color: "bg-red-500" },
        ].map((item, index) => (
          <Card key={index} className={`${item.color} text-white hover:shadow-lg transition-shadow duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Recent Activities in a two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-700">Weekly Service Appointments</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-700">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li
                    key={index}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <div>
                      <p className="font-medium text-gray-800">{activity.service.name} - {activity.status}</p>
                      <p className="text-sm text-gray-500">
                        {activity.user.name} - {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No activities available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
