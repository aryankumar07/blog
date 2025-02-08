import Image from './image.tsx'
import { CommentType } from '../utils/commetsTypes.ts'
import { format } from 'timeago.js'

interface CommentProps {
  comment: CommentType
}


const Comment: React.FC<CommentProps> = ({
  comment
}) => {


  return (
    <div className="b-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {
          comment.user.img ?
            <img src={comment.user.img} className='rounded-full h-10 w-10' />
            :
            <Image src='userImg.jpeg' className='rounded-full w-10 h-10' />
        }
        <span className='font-medium' >{comment.user.username}</span>
        <span className='text-sm text-gray-500'>{format(comment.createdAt)}</span>
      </div>
      <div className='mt-4 p-4'>
        <p>
          {
            comment.desc
          }
        </p>
      </div>
    </div>
  )
}

export default Comment
