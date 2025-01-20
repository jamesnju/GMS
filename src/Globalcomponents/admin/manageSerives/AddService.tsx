'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, } from 'lucide-react'
import { format } from "date-fns"

export default function AddService() {
  const [date, setDate] = useState<Date>()
  const [serviceType, setServiceType] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Booking submitted:", { serviceType, date, time, vehicleDetails })
    // You could also add some feedback for the user here
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className='text-Text'>Book a Service Appointment</CardTitle>
        <CardDescription>Schedule your vehicle service with us</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select onValueChange={setServiceType} required>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oil-change">Oil Change</SelectItem>
                <SelectItem value="tire-replacement">Tire Replacement</SelectItem>
                <SelectItem value="brake-service">Brake Service</SelectItem>
                <SelectItem value="general-inspection">General Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Appointment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointment-time">Appointment Time</Label>
              <Select onValueChange={setTime} required>
                <SelectTrigger id="appointment-time">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="13:00">01:00 PM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vehicle Details</Label>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input 
                placeholder="Make" 
                value={vehicleDetails.make}
                onChange={(e) => setVehicleDetails(prev => ({ ...prev, make: e.target.value }))}
                required
              />
              <Input 
                placeholder="Model" 
                value={vehicleDetails.model}
                onChange={(e) => setVehicleDetails(prev => ({ ...prev, model: e.target.value }))}
                required
              />
              <Input 
                placeholder="Year" 
                type="number" 
                min="1900" 
                max={new Date().getFullYear() + 1}
                value={vehicleDetails.year}
                onChange={(e) => setVehicleDetails(prev => ({ ...prev, year: e.target.value }))}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  )
}

