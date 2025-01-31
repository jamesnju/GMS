'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postService } from "@/actions/Services";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

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
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}



// Define the type for the form data based on the schema
type FormData = z.infer<typeof formSchema>;

export default function AddService({ serviceCategories }: { serviceCategories: Category[]; }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    // Map the form data to the Service type
    const serviceData: Service = {
      id: 0, // Assuming you're generating the id server-side or after the response
      name: data.name,
      description: data.description,
      price: parseFloat(data.price), // Convert price from string to number
      categoryId: parseInt(data.categoryId, 10), // Convert categoryId to number
      createdAt: new Date().toISOString(), // Set the createdAt timestamp
      updatedAt: new Date().toISOString(), // Set the updatedAt timestamp
    };

    try {
      const res = await postService(serviceData);
      if(!res.ok){
        setIsLoading(true)
        toast.success("Service added successfully")
        //console.log("Service submitted:", res);
        setIsLoading(false)
      }else{
        setIsLoading(true)

        toast.error("Error submitting service");
        setIsLoading(false)

      }
    } catch (error) {
      toast.error("Error submitting service");

      console.error("Error submitting service:", error);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-Text">Add a Service</CardTitle>
        <CardDescription>Provide the details of the service you want to add.</CardDescription>
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
            <Select onValueChange={(value) => setValue("categoryId", value)} defaultValue="">
              <SelectTrigger id="service-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories && serviceCategories.length > 0 ? (
                  serviceCategories.map((item) => (
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
              <p>Add Service</p>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>{/* Additional footer content */}</CardFooter>
    </Card>
  );
}
