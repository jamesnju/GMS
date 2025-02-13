"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Signup from "./Signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Wrench, Key } from "lucide-react";
import Link from "next/link";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    setLoading(false);
  
    if (!res || !res.ok) {
      toast.error("Invalid email or password. Please try again.");
      router.push("/auth");
      return;
    }
  
    toast.success("Login successful!");
    router.push("/dashboard");
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-blue-700">
            Garage Management
          </CardTitle>
          <div className="flex justify-center space-x-2">
            <Wrench className="w-6 h-6 text-blue-500" />
            <Key className="w-6 h-6 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} className="w-full ">
            <TabsList className=" w-full grid-cols-2 mb-6 flex">
              <TabsTrigger
                value="login"
                onClick={() => setIsLogin(true)}
                className="text-sm font-semibold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                onClick={() => setIsLogin(false)}
                className="text-sm font-semibold"
              >
                Sign Up
              </TabsTrigger>
              <Link href={"/"}>
              <TabsTrigger
                value="signup"
                onClick={() => setIsLogin(false)}
                className="text-sm font-semibold"
              >
                Back Home
              </TabsTrigger>
              </Link>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
