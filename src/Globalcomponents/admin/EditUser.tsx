"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateUser } from "@/actions/User";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

// Define the User interface
interface User {
  id: number; // Add the id field to the User interface
  name: string;
  email: string;
  password: string;
}

// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const EditUser = ({ userData }: { userData: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  const onSubmit = async (data: Partial<User>) => {
    // Only update the fields that are provided
    const updatedData = {
      id: userData.id, // Include the id field
      name: data.name || userData.name,
      email: data.email || userData.email,
      password: data.password || userData.password,
    };

    // Call the updateUser function with id and updatedData
    try {
      const res = await updateUser(userData.id, updatedData); // Pass the id and updatedData
      console.log("User data submitted:", updatedData);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("something went wrong");
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-Text">Edit User</CardTitle>
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
            {errors.name && (
              <p className="text-red-500">{String(errors.name.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              placeholder="Enter the user's email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{String(errors.email.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-password">Password</Label>
            <Input
              id="user-password"
              type="password"
              placeholder="Enter the user's password"
              {...register("password")}
              readOnly
            />
            {errors.password && (
              <p className="text-red-500">{String(errors.password.message)}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate animate-spin text-white" />
            ) : (
              <p>Update User</p>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>{/* Additional footer content can go here */}</CardFooter>
    </Card>
  );
};

export default EditUser;
