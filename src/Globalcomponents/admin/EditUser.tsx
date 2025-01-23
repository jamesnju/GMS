'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the User interface
interface User {
  name: string;
  email: string;
  description: string;
  price: string;
  categoryId: string;
}

// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  description: z.string().nonempty("Description is required"),
  price: z.string().refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
    message: "Please provide a valid price",
  }),
  categoryId: z.string().nonempty("Please select a category"),
});

const EditUser = ({ userData }: { userData: User }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  const onSubmit = (data: User) => {
    // Here you would typically send this data to your backend
    console.log("User data submitted:", data);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className='text-Text'>Edit User</CardTitle>
        <CardDescription>Update the details of the user.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-name">Name</Label>
            <Input
              id="user-name"
              placeholder="Enter the user's name"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              placeholder="Enter the user's email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-description">Description</Label>
            <Input
              id="user-description"
              placeholder="Enter the user's description"
              {...register("description")}
            />
            {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-price">Price</Label>
            <Input
              id="user-price"
              placeholder="Enter the price"
              type="number"
              step="0.01"
              min="0"
              {...register("price")}
            />
            {errors.price && <p className="text-red-500">{String(errors.price.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-category">Category</Label>
            <Select onValueChange={(value) => {
              setValue("categoryId", value);
            }} defaultValue={userData.categoryId}>
              <SelectTrigger id="user-category">
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

          <Button type="submit" className="w-full">Update User</Button>
        </form>
      </CardContent>
      <CardFooter>
        {/* Additional footer content can go here */}
      </CardFooter>
    </Card>
  );
}

export default EditUser;