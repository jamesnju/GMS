'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/actions/Auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { useSession } from "next-auth/react";

// Define the validation schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  //const {data: session} = useSession()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await registerUser(data);
      if (!res.data) {
        const result = await res;
      
        toast.success("Registration successful!");
        router.push("/auth");
        return result.data;
      }
      throw new Error("Network error");
    } catch (error) {
      console.log(error, "Error occurred");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="userName">User Name</Label>
        <Input
          id="userName"
          {...register("name")}
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="userEmail">Email</Label>
        <Input
          id="userEmail"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="userPassword">Password</Label>
        <Input
          id="userPassword"
          type="password"
          {...register("password")}
          placeholder="xxxxxxxxxxxxxxxx"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      
         <Button type="submit" className="w-full" disabled={loading}>

         {loading ? "Signing Up..." : "Sign Up"}
       </Button>
      
      
     
    </form>
  );
};

export default Signup;