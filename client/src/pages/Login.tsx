import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useState } from "react";

function Login() {
  const { handleLogin } = useAuthStore(); // Fetch login function from Zustand store
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login button clicked!", { email, password });
    handleLogin({ email , password})
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">नमस्ते Back 🙏🏽 IOLIB</h1>
        <p className="mt-4 text-gray-500">
          Welcome back! Enter your credentials to log in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <Input
            type="email"
            className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <Link to={'/register'}>
              <span className="underline"> Sign up</span>
            </Link>
          </p>
          <Button type="submit" className="hover:bg-gray-500 cursor-pointer">Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
