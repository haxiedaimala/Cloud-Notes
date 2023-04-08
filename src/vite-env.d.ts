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

interface NotebookItem {
  'id': number,
  'title': string,
  'userId': number,
  'createdAt': string,
  'updatedAt': string,
  'noteCounts': number
}

interface NotebookList {
  data: NotebookItem[];
}

interface CreateNotebook {
  msg: string;
  data?: {
    'id': number,
    'title': string,
    'userId': number,
    'createdAt': string,
    'updatedAt': string,
  };
}

interface DeleteNotebook {
  msg: string;
}

interface UpdateNotebook {
  msg: string;
}