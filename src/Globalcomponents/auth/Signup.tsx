"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/actions/Auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const Data = {
      password,
      name,
      email,
    };
    setLoading(true);
    try {
      const res = await registerUser(Data);
      if (!res.data) {
        const result = await res;
        // alert("Success");
        toast.success("Registration successful!");
        router.push("/auth");
        return result.data;
      }
      throw new Error("Network error");
      toast.error("Registration failed. Please try again.");
    } catch (error) {
      console.log(error, "Error occurred");
      // alert("Error");
      // toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="userName">User Name</Label>
        <Input
          id="userName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="userEmail">Email</Label>
        <Input
          id="userEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="userPassword">Password</Label>
        <Input
          id="userPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="xxxxxxxxxxxxxxxx"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
