import Image from './image.tsx'
import { CommentType } from '../utils/commetsTypes.ts'
import { format } from 'timeago.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'

interface CommentProps {
  comment: CommentType,
  canDelete: boolean,
  postId: string
}


const Comment: React.FC<CommentProps> = ({
  comment,
  canDelete,
  postId
}) => {

  const { getToken } = useAuth()


  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      const jwtToken = await getToken()
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/comments/delete/${postId}`, {
        cid: comment._id
      }, {
        headers: {
          "Authorization": jwtToken
        }
      })
      return res.data
    } catch (e) {
      console.log(`[delete comment] ${e}`)
    }
  }


  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.success("Comment deleted")
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    }
  })



  return (
    <div className="b-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center justify-between gap-4">
        <div className='flex items-center gap-4'>
          {
            comment.user.img ?
              <img src={comment.user.img} className='rounded-full h-10 w-10' />
              :
              <Image src='userImg.jpeg' className='rounded-full w-10 h-10' />
          }
          <span className='font-medium' >{comment.user.username}</span>
          <span className='text-sm text-gray-500'>{format(comment.createdAt)}</span>
        </div>
        <div
          onClick={() => {
            mutation.mutate()
          }}
          className={`${canDelete ? 'block' : 'hidden'} cursor-pointer`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
        </div>
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
