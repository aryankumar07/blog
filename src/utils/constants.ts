export interface UserType {
  _id: string,
  username: string,
  img?: string
}


export interface PostType {
  category: string,
  content: string,
  createdAt: string,
  isFeatured: boolean,
  slug: string,
  title: string,
  desc: string,
  updatedAt: string,
  user: UserType,
  visit: number
  _id: string
  img?: string
}
