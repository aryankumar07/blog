import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Search = () => {

  const loaction = useLocation()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const handelKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("pressed")
      const query = (event.target as HTMLInputElement).value
      const pathname = loaction.pathname
      if (pathname === '/posts') {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/posts/?search=${query}`)
      }
    }
  }



  return (
    <div className="p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input type="text" placeholder="Search for posts ..." onKeyDown={handelKeyDown} />
    </div>
  )
}


export default Search
