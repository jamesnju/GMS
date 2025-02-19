"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { postVehicle } from "@/actions/Vehicle";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: number;
  licensePlate: string;
  userId: number;
  make: string;
  model: string;
  year: number;
  createdAt: string;
}

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
});

const vehicleSchema = z.object({
  make: z.string().min(1, { message: "Make is required." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year." }).transform((val) => Number((val))).refine((val) => val >= 1900),
  licensePlate: z.string().min(1, { message: "License plate is required." }),
  userId: z.number().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function Profile({ vehicles: initialVehicles = [] }: { vehicles: Vehicle[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const [vehicles, setVehicles] = useState<Vehicle[]>(Array.isArray(initialVehicles) ? initialVehicles : []);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
  });

  const vehicleForm = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: "",
      model: "",
      year: 2020,
      licensePlate: "",
      userId: session?.user.id,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit() {
    // toast({
    //   title: "Profile updated",
    //   description: "Your profile information has been updated successfully.",
    // });
  }

  const userId = session?.user?.id;

  async function onVehicleSubmit(values: z.infer<typeof vehicleSchema>) {
    if (isEditing && selectedVehicle) {
      const updatedVehicles = vehicles.map((vehicle) => (vehicle.licensePlate === selectedVehicle.licensePlate ? { ...vehicle, ...values } : vehicle));
      setVehicles(updatedVehicles);
      updateVehicle(updatedVehicles);
      setIsEditing(false);
      setSelectedVehicle(null);
    } else {
      const newVehicle: Vehicle = {
        id: vehicles.length + 1, // Generate a new ID for the vehicle
        licensePlate: values.licensePlate,
        userId: userId!,
        make: values.make,
        model: values.model,
        year: values.year,
        createdAt: new Date().toISOString(),
      };
      const newVehicles = [...vehicles, newVehicle];
      setVehicles(newVehicles);
      updateVehicle(newVehicles);
    }

    const cardetails = {
      ...values,
      userId,
    };

    try {
      setIsLoading(true);
      const res = await postVehicle(cardetails);
      if (res.ok) {
        toast.error("Something went wrong!");
        setIsLoading(false);
      }
      setIsLoading(false);
      toast.success("Vehicle added");
      vehicleForm.reset();
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  function onPasswordSubmit() {
    // toast({
    //   title: "Password changed",
    //   description: "Your password has been changed successfully.",
    // });
  }

  function handleEdit(vehicle: Vehicle) {
    setIsEditing(true);
    setSelectedVehicle(vehicle);
    vehicleForm.setValue("make", vehicle.make);
    vehicleForm.setValue("model", vehicle.model);
    vehicleForm.setValue("year", vehicle.year);
    vehicleForm.setValue("licensePlate", vehicle.licensePlate);
  }

  function handleDelete(vehicle: Vehicle) {
    const updatedVehicles = vehicles.filter((v) => v.licensePlate !== vehicle.licensePlate);
    setVehicles(updatedVehicles);
    deleteVehicle(updatedVehicles);
  }

  function handleVehicleClick(vehicle: Vehicle) {
    setSelectedVehicle(vehicle);
  }

  function updateVehicle(updatedVehicles: Vehicle[]) {
    // Implement the update vehicle logic
    console.log("Updated vehicles:", updatedVehicles);
  }

  function deleteVehicle(updatedVehicles: Vehicle[]) {
    // Implement the delete vehicle logic
    console.log("Deleted vehicles:", updatedVehicles);
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John " {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} value={session?.user?.email} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="customer" {...field} value={session?.user?.role} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="vehicles">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium">Saved Vehicles</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                      <Badge key={index} onClick={() => handleVehicleClick(vehicle)} className="cursor-pointer">
                        {vehicle.make} {vehicle.model}
                      </Badge>
                    ))
                  ) : (
                    <p>No vehicles yet.</p>
                  )}
                </div>
                {selectedVehicle && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-medium">Vehicle Details</h3>
                    <p>
                      <strong>Make:</strong> {selectedVehicle.make}
                    </p>
                    <p>
                      <strong>Model:</strong> {selectedVehicle.model}
                    </p>
                    <p>
                      <strong>Year:</strong> {selectedVehicle.year}
                    </p>
                    <p>
                      <strong>License Plate:</strong> {selectedVehicle.licensePlate}
                    </p>
                    <Button onClick={() => handleEdit(selectedVehicle)}>Edit</Button>
                    <Button onClick={() => handleDelete(selectedVehicle)}>Delete</Button>
                  </div>
                )}
              </div>
              <Form {...vehicleForm}>
                <form onSubmit={vehicleForm.handleSubmit(onVehicleSubmit)} className="space-y-8">
                  <FormField
                    control={vehicleForm.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={vehicleForm.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={vehicleForm.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={vehicleForm.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Plate</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    {isLoading ? <Loader className="text-white animate animate-spin" /> : isEditing ? "Update Vehicle" : "Add Vehicle"}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-8">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Change Password</Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}