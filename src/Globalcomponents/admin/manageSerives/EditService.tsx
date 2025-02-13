"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateService } from "@/actions/Services";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.string().refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
    message: "Please provide a valid price",
  }),
  categoryId: z.string().nonempty("Please select a category"),
});

// Define TypeScript interfaces
// export interface Booking {
//   id: number;
//   userId: number;
//   serviceId: number;
//   categoryId: number;
//   description: string;
//   bookedDate: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   service: {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     categoryId: number;
//     createdAt: string;
//     updatedAt: string;
//   };
//   category: {
//     id: number;
//     name: string;
//     description: string;
//     createdAt: string;
//   };
//   user: {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//     createdAt: string;
//   };
// }
export interface Booking{

  id: number;
      name: string;
      description: string;
      price: number;
      categoryId: number;
      // createdAt: string;
      // updatedAt: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// Define the type for the form data based on the schema
type FormData = z.infer<typeof formSchema>;

export default function EditService({ booking, categories }: { booking: Booking; categories: Category[] }) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: booking?.name,
      description: booking?.description,
      price: String(booking?.price),
      categoryId: String(booking?.categoryId),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset form with service data when component mounts
    reset({
      name: booking?.name,
      description: booking?.description,
      price: String(booking?.price),
      categoryId: String(booking?.categoryId),
    });
  }, [booking, reset]);

  const onSubmit = async (data: FormData) => {
    // Map the form data to the Service type
    const serviceData = {
      id: booking?.id,
      name: data?.name,
      description: data.description,
      price: parseFloat(data.price), // Convert price from string to number
      categoryId: parseInt(data.categoryId, 10), // Convert categoryId to number
     
    };

    try {
      setIsLoading(true);
      const res = await updateService(serviceData, booking.id);
      if (!res.ok) {
        toast.success("Service updated successfully");
        window.location.reload();
      } else {
        toast.error("Error updating service");
      }
    } catch (error) {
      toast.error("Error updating service");
      console.error("Error updating service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
      <Link href="/serviceManagement">
          <Button>Back</Button>
        </Link>
        <CardTitle className="text-Text">Edit Service</CardTitle>
        <CardDescription>Update the details of the service.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-name">Service Name</Label>
            <Input id="service-name" placeholder="Enter the service name" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Input id="service-description" placeholder="Enter the service description" {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-price">Price</Label>
            <Input id="service-price" placeholder="Enter the service price" type="number" step="0.01" min="0" {...register("price")} />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-category">Category</Label>
            <Select onValueChange={(value) => setValue("categoryId", value)} defaultValue={String(booking?.categoryId)}>
              <SelectTrigger id="service-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories && categories.length > 0 ? (
                  categories.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <p className="text-gray-500 text-center p-2">No categories available</p>
                )}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate animate-spin text-white" />
            ) : (
              <p>Update Service</p>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}