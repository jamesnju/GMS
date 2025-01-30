"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Car, Wrench, DollarSign, Users, Calendar } from "lucide-react"

const data = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 5 },
  { name: "Fri", value: 2 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 8 },
]

export default function Dashboard() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Garage Management Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Vehicles", value: "124", icon: Car, color: "bg-purple-500" },
          { title: "Pending Services", value: "8", icon: Wrench, color: "bg-yellow-500" },
          { title: "Revenue (Monthly)", value: "$52,489", icon: DollarSign, color: "bg-green-500" },
          { title: "Active Customers", value: "89", icon: Users, color: "bg-red-500" },
        ].map((item, index) => (
          <Card key={index} className={`${item.color} text-white hover:shadow-lg transition-shadow duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-6 w-6 opacity-75" />
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
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
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
            <ul className="space-y-4">
              {[
                { action: "Oil change completed", vehicle: "Toyota Camry (ABC123)", time: "2 hours ago" },
                { action: "New appointment scheduled", vehicle: "Honda Civic (XYZ789)", time: "4 hours ago" },
                { action: "Brake inspection completed", vehicle: "Ford F-150 (DEF456)", time: "1 day ago" },
                { action: "Tire rotation", vehicle: "Chevrolet Malibu (GHI789)", time: "1 day ago" },
              ].map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.vehicle} - {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-700">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { customer: "John Doe", vehicle: "BMW X5", service: "Annual Maintenance", time: "Today, 2:00 PM" },
              { customer: "Jane Smith", vehicle: "Audi A4", service: "Oil Change", time: "Tomorrow, 10:00 AM" },
              {
                customer: "Bob Johnson",
                vehicle: "Tesla Model 3",
                service: "Tire Replacement",
                time: "Jul 15, 3:30 PM",
              },
            ].map((appointment, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">{appointment.time}</span>
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{appointment.customer}</h3>
                  <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                  <p className="text-sm text-gray-500">{appointment.service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

