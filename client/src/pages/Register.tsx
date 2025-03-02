import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

function Register() {
  return (
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Want to Explore 🚀 IOLIB?
    </h1>

    <p className="mt-4 text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
      ipsa culpa autem, at itaque nostrum!
    </p>
  </div>

  <form action="#" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
    <div>
      <label htmlFor="name" className="sr-only">Name</label>

      <Input
        type="text"
        className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
        placeholder="Enter Name"
      />
    </div>
    <div>
      <label htmlFor="email" className="sr-only">Name</label>

      <Input
        type="email"
        className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
        placeholder="Enter email"
      />
    </div>

    <div>
      <label htmlFor="password" className="sr-only">Password</label>

      <Input
        type="password"
        className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-xs border-0 py-6 px-4"
        placeholder="Enter password"
      />
    </div>

    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Already have an account? 
      <Link to={'/login'}>
        <span className="underline"> Sign up</span>
      </Link>
      </p>

      <Button>Register</Button>
    </div>
  </form>
</div>
  )
}

export default Register