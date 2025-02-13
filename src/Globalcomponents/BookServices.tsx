"use client";

import React, { useState } from "react";
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
import { postBookService } from "@/actions/Services";
import Link from "next/link";
import { toast } from "react-toastify";

interface Service {
  id: number;
  name: string;
  description: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  userId: number;
}

interface ServiceBookingFormProps {
  services: Service[];
  categories: ServiceCategory[];
}

const formSchema = z.object({
  serviceId: z.number().int().positive("Please select a valid service."),
  description: z.string().nonempty("Please provide a description."),
  categoryId: z.number().int().positive("Please select a valid category."),
  userId: z.number().optional(),
  bookedDate: z.date({
    required_error: "Please select a date.",
  }),
});

const ServiceBookingForm = ({
  services,
  categories,
}: ServiceBookingFormProps) => {
  const { data: session } = useSession();
  const [isloading, setIsloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: undefined,
      description: "",
      categoryId: undefined,
      bookedDate: undefined,
      userId: session?.user.id,
    },
  });

  const userId = session?.user.id;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dataValues = {
      ...values,
      userId,
    };
    setIsloading(true)
    const res = await postBookService(dataValues);
    if (!res.ok) {
      // alert('Your service has been booked')
      toast.success("Your service has been booked");
      form.reset();
      setIsloading(false);
      return;
    }
    // alert('try again');
    toast.error("failed to Book try Again");
    setIsloading(false);

    //console.log("Form Data:", { ...values, userId })
  };

  return (
    <Card className="mx-auto h-screen">
      <CardHeader className="flex justify-end items-end w-full">
        <Link href="/servicesBooking">
          <Button className="w-12">Back</Button>
        </Link>
      </CardHeader>
      <CardHeader>
        <CardTitle>Service Booking</CardTitle>
        <CardDescription>Book your service appointment here.</CardDescription>
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
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          {service.name}
                        </SelectItem>
                      ))}
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
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
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
                          variant="outline"
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
            {isloading ? (
              <Button type="submit" className="w-full" disabled>
                  <Loader className="animate-spin text-white w-8 h-8" />{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full" >
                Book Service
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ServiceBookingForm;
