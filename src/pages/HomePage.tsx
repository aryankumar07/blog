import { Link } from "react-router-dom"
import MainCategories from "../components/MainCategories"
import FeaturedPost from "../components/FeaturedPost"
import PostList from "../components/PostList"
// import { useAuth } from "@clerk/clerk-react"
// import { useEffect } from "react"
//
const HomePage = () => {
  //
  // const { getToken } = useAuth()
  //
  //
  // useEffect(() => {
  //
  //   const fetch = async () => {
  //     const token = await getToken()
  //     console.log(token)
  //   }
  //
  //   fetch()
  // }, [getToken])
  //


  return (
    <div className="mt-4 flex flex-col gap-4">

      <div className="flex gap-4">
        <Link to='/'>Home</Link>
        <span>*</span>
        <span className="text-blue-500" >Blogs And Article</span>
      </div>


      <div className="flex items-center justify-center">
        <div>
          <h1 className="text-gray-800 text-xl md:text-2xl lg:text-4xl font-bold">Share your story with the world—create, connect, and inspire through our simple and intuitive blogging platform</h1>
          <p className="mt-8 text-md md:text-xl">Our web application is designed for writers, thinkers, and creators to effortlessly publish their ideas. With a clean interface, customizable themes, and seamless sharing options, it’s the perfect space to grow your audience and express yourself. Start your blogging journey today!</p>
        </div>
        <Link to="/write" className="relative hidden md:block">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100,100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%" >Write Your Story</textPath>
              <textPath href="#circlePath" startOffset="50%" >Share Your Idea</textPath>
            </text>
          </svg>
          <button className="absolute top-0 bottom-0 left-0 right-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      <MainCategories />


      <FeaturedPost />

      <div className="">
        <h1 className="my-8 text-2xl text-gray-500" >Recent Post</h1>
        <PostList />
      </div>

    </div>
  )
}

export default HomePage
