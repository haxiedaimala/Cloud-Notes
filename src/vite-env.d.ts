/// <reference types="vite/client" />
interface UserInfo {
  isLogin: boolean,
  data?: {
    createdAt: string,
    id: number
    updatedAt: string
    username: string
  }
}
