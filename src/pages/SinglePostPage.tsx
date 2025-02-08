import Image from '../components/image.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Twitter, Instagram } from 'lucide-react'
import PostMenuctions from '../components/PostMenuActions.tsx'
import Search from '../components/Search.tsx'
import Comments from '../components/comments.tsx'
import axios from 'axios'
import { toast } from 'react-toastify/unstyled'
import { useQuery } from '@tanstack/react-query'
import { PostType } from '../utils/constants.ts'
import { format } from 'timeago.js'
import ReactHtmlParser from 'react-html-parser';

const SinglePost = () => {
  const navigate = useNavigate()
  const { slug } = useParams()


  const fetchPost = async (slug: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
      return res.data as PostType
    } catch (e) {
      toast.error(`Failed to fetch the post! try again ${e}`)
      navigate('/')
    }
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => {
      if (slug) {
        return fetchPost(slug)
      }
    }
  })


  if (isPending) return "Loading .... "
  if (error) return "Something went wrong"
  if (!data) return "No data found"

  return (
    <div className='flex flex-col gap-8'>
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className='text-xl md:text-3xl xl:text-4xl font-semibold'>{data.title}</h1>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span>Written By</span>
            <Link to="/test">{data.user.username}</Link>
            <span>on</span>
            <Link to="/test">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className='text-gray-500 font-medium'>
            {data.desc}
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src={data.img ? data.img : 'no-image.png'} className='rounded-2xl' />
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='lg:text-lg w-full md:w-4/5 flex flex-col gap-6 text-justify'>
          {ReactHtmlParser(data.content)}
        </div>
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>
              {
                data.user.img ?
                  <img src={data.user.img} alt='image' className='rounded-full w-12 h-12 object-cover' />
                  :
                  <Image src={data.user.img ? data.user.img : 'userImg.jpeg'} className='w-12 h-12 rounded-full object-cover' />
              }
              <Link to="/test">{data.user.username}</Link>
            </div>
            <div className='flex gap-2'>
              <Link to=""><Twitter size={20} /></Link>
              <Link to=""><Instagram size={20} /></Link>
            </div>
          </div>
          <PostMenuctions />
          <h1 className='font-medium mt-4 mb-4'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link to="/" className='underline'>All</Link>
            <Link to="/" className='underline'>Web Design</Link>
            <Link to="/" className='underline'>Development</Link>
            <Link to="/" className='underline'>DataBase</Link>
            <Link to="/" className='underline'>Search Engine</Link>
            <Link to="/" className='underline'>Marketing</Link>
          </div>
          <h1 className='mt-8 mb-4 ext-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  )
}

export default SinglePost
