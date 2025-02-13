"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { updateServiceCategory } from "@/actions/Services";

// Validation schema including id
const formSchema = z.object({
  id: z.number().int().positive("Invalid ID"),
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
});

// TypeScript interfaces
export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
}

// Infer FormData type from schema
type FormData = z.infer<typeof formSchema>;

export default function EditServiceCategory({
  initialData,
}: {
  initialData: ServiceCategory;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData, // Prefill form with existing data
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setValue("id", initialData.id);
      setValue("name", initialData.name);
      setValue("description", initialData.description);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await updateServiceCategory(data, data.id);
      if (!res.ok) {
        toast.success("Service updated successfully");
        window.location.reload();
      } else {
        toast.error("Error updating service");
      }
    } catch (error) {
      toast.error("Service update failed");
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
        <CardDescription>Modify the details of the service.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="hidden" {...register("id", { valueAsNumber: true })} />
          <div className="space-y-2">
            <Label htmlFor="service-name">Service Category</Label>
            <Input id="service-name" placeholder="Enter the service name" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Input id="service-description" placeholder="Enter the service description" {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin text-white" /> : <p>Update Service</p>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
