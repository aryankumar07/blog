import PostListItem from "./PostListItem"
import axios from "axios"
import { useInfiniteQuery } from "@tanstack/react-query"
import InfiniteScroll from "react-infinite-scroll-component"

const PostList = () => {

  const fetchPosts = async (pageParam: number) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: {
        page: pageParam,
        limit: 2
      }
    })
    return res.data
  }

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined
  })


  if (status === "pending") return "Loading ... "
  if (status === "error") return "Soemthing went Wrong"
  const allPosts = data?.pages.flatMap(page => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! All Post Loaded </b>
        </p>
      }>
      {
        allPosts.map((post) => {
          return (
            <PostListItem key={post._id} post={post} />
          )
        })
      }

    </InfiniteScroll>
  )
}

export default PostList
