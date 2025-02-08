import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Comment from '../components/comment.tsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { CommentType } from '../utils/commetsTypes.ts'
import { useAuthId } from '../hooks/useAuthId.ts'

interface commentsProps {
  postId: string
}


const Comments: React.FC<commentsProps> = ({
  postId
}) => {

  const queryClient = useQueryClient()


  const [comment, setComment] = useState("")

  const { getToken } = useAuth()


  const { isUserPending, iserror, UserId } = useAuthId()

  const getComments = async (postId: string) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
      return res.data
    } catch (e) {
      toast.error(`cannot find comments ,${e}`)
    }
  }

  const { isPending: isCommentPending, error: iscommenterror, data: commnetData } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId)
  })



  const mutation = useMutation({
    mutationFn: async (data: string) => {
      const jwtToken = await getToken()
      console.log(jwtToken)
      await axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, {
        desc: data,
      },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken} `
          }
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("comment added")
      setComment('')
    }
  })




  if (isCommentPending) return "Loading ... "
  if (iscommenterror) return "Something went Wrong"
  if (!commnetData) return "comments not found"


  if (isUserPending) return "Loading.."
  if (iserror) return "Please refresh"
  if (!UserId) return "please refresh"


  const handleSubmit = () => {
    mutation.mutate(comment)
  }



  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write a comment ..."
          className="w-full p-4 rounded-xl" />
        <button
          onClick={handleSubmit}
          className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl" >Send</button>
      </div>
      {
        commnetData.map((value: CommentType) => <Comment key={value._id} comment={value} canDelete={value.user._id === UserId} postId={postId} />)
      }
    </div>
  )
}

export default Comments;
