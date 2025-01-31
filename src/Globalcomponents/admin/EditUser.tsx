"use client"
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

interface User {
  id: number;  // Or string, depending on your backend
  name: string;
  email: string;
  password: string; // Password might be optional on the frontend
  // ... other properties of your user object
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



// Infer the form data type from the schema
type FormData = z.infer<typeof formSchema>;

const EditUser = ({ userData }: { userData: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset function
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { // Make sure default values match FormData
      name: userData.name,
      email: userData.email,
      password: userData.password , // provide default for password
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true); // Set loading *before* the API call
    try {
      const updatedData: User = { // Type the updatedData
        id: userData.id,
        name: data.name, // No need for || if defaultValues are set correctly
        email: data.email,
        password: data.password ?? "", // Ensure password is always a string
      };

      const res = await updateUser(userData.id, updatedData);
      if (!res.ok) {
        toast.success("User updated successfully");
        reset(); // Reset the form after successful update
      } else {
        //const errorData = await res.json(); // Get error details from the backend
        toast.error(`Failed to update user`); // Display error message from the backend
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false); // Always set loading to false, even if there's an error
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
