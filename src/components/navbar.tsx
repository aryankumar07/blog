import { useState } from "react";
import { Menu, X } from 'lucide-react'
import Image from './image.tsx'
import { Link } from "react-router-dom";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to='/'>
        <div className="flex items-center gap-4 text-2xl font-bold">
          <Image src="./blogger.png" className="w-8 h-8" />
          <span>Blogs</span>
        </div>
      </Link>

      {/* mobile menu */}
      <div className="md:hidden">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer text-4xl">
          {
            open ? <X /> : <Menu />
          }
        </div>
      </div>

      {/*Mobile link list*/}
      <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 ${open ? 'right-0' : '-right-[100%]'}`}>
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>


      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default Navbar;
