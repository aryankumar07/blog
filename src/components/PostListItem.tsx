import Image from './image.tsx'
import { Link } from 'react-router-dom'

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden  xl:block xl:w-1/3">
        <Image src='featured1.jpeg' className='rounded-2xl object-cover w-160 h-60 ' />
      </div>
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to="/test" className='text-4xl font-semibold' >Description for the blof is given here</Link>
        <div className='flex items-center gap-2 text-gray-500 text-sm'>
          <span>Written By :-</span>
          <Link to="/test" className='text-blue-800' >John Doe</Link>
          <span>on</span>
          <Link to="test" className='text-blue-800'>web Design</Link>
          <span>@ days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Link to="test" className='underline text-blue-800 text-sm' >Read More</Link>
      </div>
    </div>
  )
}

export default PostListItem
