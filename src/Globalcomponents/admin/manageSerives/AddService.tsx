'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.string().refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
    message: "Please provide a valid price",
  }),
  categoryId: z.string().nonempty("Please select a category"),
});

export default function AddService() {
  const [categoryId, setCategoryId] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    // Here you would typically send this data to your backend
    console.log("Service submitted:", data);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className='text-Text'>Add a Service</CardTitle>
        <CardDescription>Provide the details of the service you want to add.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-name">Service Name</Label>
            <Input
              id="service-name"
              placeholder="Enter the service name"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Input
              id="service-description"
              placeholder="Enter the service description"
              {...register("description")}
            />
            {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-price">Price</Label>
            <Input
              id="service-price"
              placeholder="Enter the service price"
              type="number"
              step="0.01"
              min="0"
              {...register("price")}
            />
            {errors.price && <p className="text-red-500">{String(errors.price.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-category">Category</Label>
            <Select onValueChange={(value) => {
              setCategoryId(value);
              setValue("categoryId", value);
            }}>
              <SelectTrigger id="service-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Category 1</SelectItem>
                <SelectItem value="2">Category 2</SelectItem>
                <SelectItem value="3">Category 3</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500">{String(errors.categoryId.message)}</p>}
          </div>

          <Button type="submit" className="w-full">Add Service</Button>
        </form>
      </CardContent>
      <CardFooter>
        {/* Additional footer content can go here */}
      </CardFooter>
    </Card>
  );
}