import Image from './image.tsx'
import { Link } from 'react-router-dom'
import { PostType } from '../utils/constants.ts'
import { format } from 'timeago.js'


interface PostListItemProps {
  post: PostType
}


const PostListItem: React.FC<PostListItemProps> = ({
  post
}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {
        post.img ?
          <div className="md:hidden  xl:block xl:w-1/3">
            <Image src={post.img} className='rounded-2xl object-cover w-160 h-60 ' />
          </div>
          :
          <div className="md:hidden  xl:block xl:w-1/3">
            <Image src='no-image.png' className='rounded-2xl object-cover w-160 h-60 ' />
          </div>
      }
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to="/test" className='text-4xl font-semibold' >{post.title}</Link>
        <div className='flex items-center gap-2 text-gray-500 text-sm'>
          <span>Written By :-</span>
          <Link to="/test" className='text-blue-800' >{post.user.username}</Link>
          <span>on</span>
          <Link to="/test" className='text-blue-800'>{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>
          {
            post.desc
          }
        </p>
        <Link to={`/${post.slug}`} className='underline text-blue-800 text-sm' >Read More</Link>
      </div>
    </div>
  )
}

export default PostListItem
