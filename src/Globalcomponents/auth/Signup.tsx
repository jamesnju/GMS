"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerUser } from "@/actions/Auth";

interface UserData {
  password: string;
  username: string;
  email: string;
}
const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let Data = {
      password,
      name,
      email,
    };
    try {
      const res = await registerUser(Data);
      if(!res.data){
        const result = await res;
        alert("success");
        return result.data;
      }
      throw new Error("net")
    } catch (error) {
      console.log(error, "error occured")
      alert('error');
    }
  

  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input id="userId" placeholder="Enter your user ID" required />
      </div> */}
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
      {/* <div className="space-y-2">
        <Label htmlFor="userAddress">Address</Label>
        <Textarea id="userAddress" placeholder="Enter your address" required />
      </div> */}
      {/* <div className="space-y-2">
        <Label htmlFor="userRole">User Role</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resident">Resident</SelectItem>
            <SelectItem value="collector">Waste Collector</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
      {/* <div className="space-y-2">
        <Label htmlFor="userProfile">Profile Picture</Label>
        <Input
          id="userProfile"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className="flex items-center space-x-2">
          <Button type="button" onClick={handleUploadClick}>
            {selectedFile ? "Change Picture" : "Upload Picture"}
          </Button>
          {selectedFile && (
            <span className="text-sm text-gray-500">{selectedFile.name}</span>
          )}
        </div>
      </div> */}
      <Button type="submit" className="w-full" disabled={loading}>
         {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default Signup;
