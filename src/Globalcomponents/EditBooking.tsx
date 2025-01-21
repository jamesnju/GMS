"use client"
import React, { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"

// Define the Service type
interface Service {
  id: number
  name: string
  description: string
}

interface ServiceCategory {
  id: number
  name: string
}

interface ServiceBookingFormProps {
  services: Service[] // Services passed as a prop
  categories: ServiceCategory[] // Categories passed as a prop
  bookingData?: { // Optional booking data for editing
    serviceId: string
    description: string
    categoryId: string
    bookedDate: Date
    price: string
  }
}

const formSchema = z.object({
  serviceId: z.string().nonempty("Please select a service."),
  description: z.string().nonempty("Please provide a description."),
  categoryId: z.string().nonempty("Please select a category."),
  userId: z.number().optional(),
  bookedDate: z.date({
    required_error: "Please select a date.",
  }),
  price: z
    .string()
    .refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
      message: "Please provide a valid price.",
    }),
})

const EditServiceBookingForm = ({ services, categories, bookingData }: ServiceBookingFormProps) => {

  const { data: session } = useSession()
  const [initialData, setInitialData] = useState(bookingData || null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: initialData?.serviceId || "",
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || "",
      price: initialData?.price || "",
      bookedDate: initialData?.bookedDate || undefined,
      userId: session?.user?.id,
    },
  })

  // Optional: If bookingData changes, update the form data
  useEffect(() => {
    if (bookingData) {
      form.reset({
        serviceId: bookingData.serviceId,
        description: bookingData.description,
        categoryId: bookingData.categoryId,
        price: bookingData.price,
        bookedDate: bookingData.bookedDate,
      })
    }
  }, [bookingData, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values)

    // Proceed with the service booking logic, e.g., API call
    // Example: if you're updating a booking, you would make an API call to update it.
    // If it's a new booking, the logic would be similar but to create a new one.
    
    // Example API call for updating
    if (initialData) {
      // Call API to update the service booking with the new values
      console.log("Updating booking:", values)
    } else {
      // Call API to create a new service booking
      console.log("Creating new booking:", values)
    }

    form.reset()
  }

  return (
    <Card className="mx-auto bg-red-300 h-screen">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Service Booking" : "Service Booking"}</CardTitle>
        <CardDescription>{initialData ? "Update your service appointment details." : "Book your service appointment here."}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Dropdown */}
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a description for the service" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Category Dropdown */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Appointment Date */}
            <FormField
              control={form.control}
              name="bookedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || date > new Date("2100-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Input */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {initialData ? "Update Service" : "Book Service"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditServiceBookingForm