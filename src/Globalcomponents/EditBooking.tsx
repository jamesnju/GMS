"use client";

import React, { useState, useEffect } from "react";
import { CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { updateDate } from "@/actions/Services";
import Link from "next/link";
import { toast } from "react-toastify";

// Define the ServiceBookingFormProps interface
interface ServiceBookingFormProps {
  id: number;
  userId: number;
  serviceId: number;
  categoryId: number;
  description: string;
  bookedDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  service: {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
  };
}

// Define the validation schema with status field added
const formSchema = z.object({
  serviceId: z.number().min(1, "Please select a service."),
  description: z.string().nonempty("Please provide a description."),
  categoryId: z.number().min(1, "Please select a category."),
  userId: z.number().optional(),
  bookedDate: z.date({
    required_error: "Please select a date.",
  }),
  status: z.enum(["booked", "pending"], {
    required_error: "Please select a status.",
  }),
});

const EditServiceBookingForm = ({
  bookingData,
}: {
  bookingData: ServiceBookingFormProps;
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: bookingData.serviceId,
      description: bookingData.description,
      categoryId: bookingData.categoryId,
      bookedDate: new Date(bookingData.bookedDate),
      userId: session?.user?.id,
      status: bookingData.status as "booked" | "pending", // set default status value from bookingData
    },
  });
  useEffect(() => {
    if (bookingData) {
      form.reset({
        serviceId: bookingData.serviceId,
        description: bookingData.description,
        categoryId: bookingData.categoryId,
        bookedDate: new Date(bookingData.bookedDate),
        userId: session?.user?.id,
        status: bookingData.status as "booked" | "pending",
      });
    }
  }, [bookingData, form, session]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Form submitted:", values);
    // Explicitly cast the status field to ensure it matches the expected type.
    const typedValues: {
      serviceId: number;
      description: string;
      categoryId: number;
      bookedDate: Date;
      userId?: number;
      status: "booked" | "pending";
    } = {
      ...values,
      status: values.status as "booked" | "pending",
    };

    try {
      const res = await updateDate(typedValues, bookingData.id);
      if (!res.ok) {
        toast.success("Booking service updated successfully");
        window.location.reload();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update booking");
      console.error("Failed to update booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto h-screen">
      <CardHeader>
        <Link href="/servicesBooking">
          <Button>Back</Button>
        </Link>
        <CardTitle>
          {bookingData ? "Edit Service Booking" : "Service Booking"}
        </CardTitle>
        <CardDescription>
          {bookingData
            ? "Update your service appointment details."
            : "Book your service appointment here."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        key={bookingData.service.id}
                        value={bookingData.service.id.toString()}
                      >
                        {bookingData.service.name}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a description for the service"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        key={bookingData.category.id}
                        value={bookingData.category.id.toString()}
                      >
                        {bookingData.category.name}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date("2100-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="booked">book</SelectItem>
                      <SelectItem value="pending">pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLoading ? (
                <Loader className="animate-spin text-white mx-auto" />
              ) : (
                bookingData ? "Update Service" : "Book Service"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditServiceBookingForm;