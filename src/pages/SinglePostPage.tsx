import Image from '../components/image.tsx'
import { Link } from 'react-router-dom'
import { Twitter, Instagram, } from 'lucide-react'
import PostMenuctions from '../components/PostMenuActions.tsx'
import Search from '../components/Search.tsx'

const SinglePost = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className='text-xl md:text-3xl xl:text-4xl font-semibold' >Description or Title of the blog</h1>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span>Written By</span>
            <Link to="/test">John doe</Link>
            <span>on</span>
            <Link to="/test">Web Design</Link>
            <span>@ days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui
            a consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src='featured1.jpeg' className='rounded-2xl' />
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='lg:text-lg w-full  md:w-4/5   flex flex-col gap-6 text-justify'>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui
            a consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempor
            a incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostru
            m exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qu
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui
            a consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempor
            a incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostru
            m exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qu
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
              sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed qui
              a consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempor
              a incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostru
              m exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qu
            </p>
          </p>
        </div>
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>
              <Image src='userImg.jpeg' className='w-12 h-12 rounded-full object-cover' />
              <Link to="/test">John doe</Link>
            </div>
            <div className='flex gap-2'>
              <Link to=""><Twitter size={20} /></Link>
              <Link to=""><Instagram size={20} /></Link>
            </div>
          </div>
          <PostMenuctions />
          <h1 className='font-medium mt-4 mb-4' >Categories</h1>
          <div className='flex flex-col gap-2 text-sm'>
            <Link to="/" className='underline' >All</Link>
            <Link to="/" className='underline' >Web Design</Link>
            <Link to="/" className='underline' >Development</Link>
            <Link to="/" className='underline' >DataBase</Link>
            <Link to="/" className='underline' >Search Engine</Link>
            <Link to="/" className='underline' >Marketing</Link>
          </div>
          <h1 className='mt-8 mb-4 ext-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default SinglePost;
