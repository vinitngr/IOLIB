import { useState } from "react";
import { useAuthStore } from "../stores/auth"; // Import Zustand Store
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function Register() {
  const { register } = useAuthStore(); // Get the register function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Register button clicked!");
  register(name, email, password); // Pass name to Zustand store
};

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Want to Explore 🚀 IOLIB?</h1>
        <p className="mt-4 text-gray-500">
          Join us and experience something amazing!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <Input
            type="text"
            className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <Input
            type="email"
            className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <Input
            type="password"
            className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Already have an account? 
            <Link to={'/login'}>
              <span className="underline"> Sign In</span>
            </Link>
          </p>

          <Button type="submit" className="hover:bg-gray-500 cursor-pointer">Register</Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
