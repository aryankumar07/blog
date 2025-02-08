import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


export const useAuthId = () => {
  const { getToken } = useAuth()
  const getUserId = async () => {
    try {
      const jwtToken = await getToken()
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/userId`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  const { isPending: isUserPending, error: iserror, data: UserId } = useQuery({
    queryKey: ["userId"],
    queryFn: () => getUserId()
  })



  return {
    isUserPending,
    iserror,
    UserId
  }
}
