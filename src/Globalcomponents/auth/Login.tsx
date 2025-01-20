"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
// import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { useRouter } from "next/navigation";
import Signup from "./Signup";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Authenticate using next-auth credentials provider
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email,
      password,
    });

    console.log(email, password, "the submit");
    console.log(result, "------");

    setLoading(false);

    if (result?.error) {
      // Show error toast if authentication fails
      //toast.error("Invalid email or password. Please try again.");
      alert("failed")
      router.push("/auth");

    } else {
      // Show success toast and redirect to dashboard on successful login
      //toast.success("Login successful!");
      router.push("/dashboard");
      alert("success");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-Background">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Card className="flex-1 p-6 lg:p-10 items-center mt-20">
        <Tabs
          value={isLogin ? "login" : "signup"}
          className="w-full max-w-md mx-auto"
        >
          <TabsList className="flex  w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setIsLogin(true)} className="mx-18">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" onClick={() => setIsLogin(false)} className="mx-8">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
      </Card>
     
    </div>
  );
}