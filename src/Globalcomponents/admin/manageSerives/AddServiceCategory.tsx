"use client";
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
import { postServiceCategory } from "@/actions/Services";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
});

// Define TypeScript interfaces
export interface ServiceCategory {
  //   id: number;
  name: string;
  description: string;
  //   createdAt: string;
  //   updatedAt: string;
}

// Define the type for the form data based on the schema
type FormData = z.infer<typeof formSchema>;

export default function AddServiceCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Map the form data to the Service type
    const serviceData: ServiceCategory = {
      //   id: 0, // Assuming you're generating the id server-side or after the response
      name: data.name,
      description: data.description,
      //   createdAt: new Date().toISOString(), // Set the createdAt timestamp
      //   updatedAt: new Date().toISOString(), // Set the updatedAt timestamp
    };

    try {
      const res = await postServiceCategory(serviceData);
      if (!res.ok) {
        toast.success("Service added successfully");
      } else {
        toast.error("Error submitting service");
      }
    } catch (error) {
      toast.error("Service Exists");
      console.error("Error submitting service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-Text">Add a Service</CardTitle>
        <CardDescription>
          Provide the details of the service you want to add.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-name">Service Category</Label>
            <Input
              id="service-name"
              placeholder="Enter the service name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Input
              id="service-description"
              placeholder="Enter the service description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader className="animate-spin text-white" />
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
