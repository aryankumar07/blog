import { useState } from "react";
import PostList from "../components/PostList";
import Sidemenu from "../components/sidemenu";
import { useSearchParams } from "react-router-dom";

const PostListPage = () => {

  const [open, setOpen] = useState(false)

  const [searchParmas] = useSearchParams()

  const ParamsObj = Object.fromEntries(searchParmas.entries())

  let Type = 'All'

  if (ParamsObj.cat) {
    Type = ParamsObj.cat
  }

  return (
    <div className="" >
      <h1 className="mb-8 text-2xl">{Type} Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-white px-4 y-2 rounded-2xl mb-4 md:hidden" >
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="flex-1" >
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <Sidemenu />
        </div>
      </div>
    </div>
  )
}

export default PostListPage;
