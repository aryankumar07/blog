import { useQuery } from '@tanstack/react-query'
import Image from './image.tsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PostType } from '../utils/constants.ts'
import { format } from 'timeago.js'

const FeaturedPost = () => {

  const { isPending, error, data } = useQuery<PostType[]>({
    queryKey: ["featurePost"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/featuredPost`)
      return res.data
    }
  })

  if (isPending) return "Loading ..."
  if (error) return "Error in fetching"
  if (!data) return "No data found"
  else console.log(data[0].img)





  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {data[0].img ?
          <Image src={`${data[0].img}`} className='rounded-3xl object-cover' />
          :
          <Image src='no-image.png' className='rounded-3xl object-cover' />
        }
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01</h1>
          <Link to={`/${data[0].slug}`} className="text-blue-800 lg:text-lg">{data[0].title}</Link>
          <span className='text-gray-500' >{format(data[0].createdAt)}</span>
        </div>
        <Link to={`/${data[0].slug}`} className='text-xl lg:text-3xl font-semibold lg:font-bold truncate overflow-hidden whitespace-nowrap' >{data[0].desc}</Link>
      </div>



      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {
          data.slice(1).map((post, index) => {
            return (
              <div key={post._id} className='h-1/3 flex justify-between gap-4'>
                {post.img ?
                  <Image src={`${post.img}`} className='rounded-3xl object-cover w-1/3 aspect-video' />
                  :
                  <Image src='no-image.png' className='rounded-3xl object-cover w-1/3 aspect-video' />
                }
                <div className='w-2/3'>
                  <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
                    <h1>0{index + 2}</h1>
                    <Link to={`/${post.slug}`} className='text-blue-300' >{post.title}</Link>
                    <span className='text-gray-500 text-sm'>{format(post.createdAt)}</span>
                  </div>
                  <Link to={`/${post.slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl line-clamp-2 overflow-hidden'>{post.desc}</Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FeaturedPost
