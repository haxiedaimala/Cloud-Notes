/// <reference types="vite/client" />
interface UserInfo {
  createdAt: string,
  id: number
  updatedAt: string
  username: string
}

interface LoginInfo {
  isLogin: boolean,
  data?: UserInfo
}

interface RegisterInfo {
  isLogin: boolean,
  data?: UserInfo
}

interface NotebookItem {
  'id': number,
  'title': string,
  'userId': number,
  'createdAt': string,
  'updatedAt': string,
  'noteCounts': number,
  'friendlyCreatedAt': string,
  'friendlyUpdateAt': string
}

interface NotebookList {
  data: NotebookItem[];
}

interface CreateNotebook {
  msg: string;
  data?: NotebookItem;
}

interface DeleteNotebook {
  msg: string;
}

interface UpdateNotebook {
  msg: string;
}

interface NoteItem {
  'id': number,
  'title': string,
  'content': string,
  'notebookId': number,
  'userId': number,
  'isDelete': false,
  'createdAt': string,
  'updatedAt': string
  'friendlyUpdatedAt': string,
  'friendlyCreateAt': string
}

interface NoteList {
  data: NoteItem[];
}

interface CreateNote {
  msg: string,
  data?: NoteItem
}

interface DeleteNote {
  msg: string;
}

interface TrashNoteList {
  data: NoteItem[];
}

interface DeleteTrashNote {
  msg: string;
}

interface RevertTrashNote {
  msg: string;
}