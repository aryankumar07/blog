import { UserType } from "./constants"


export interface CommentType {
  _id: string,
  user: UserType,
  post: string,
  desc: string,
  createdAt: string,
}
