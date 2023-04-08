export default function friendlyDate(dateStr: string) {
  const time = new Date(dateStr).getTime();
  const now = new Date().getTime();
  const space = now - time;
  let str: string;
  switch (true) {
    case space < 60 * 1000:
      str = '刚刚';
      break;
    case space < 3600 * 1000:
      str = Math.floor(space / 60000) + '分钟前';
      break;
    case space < 3600 * 1000 * 24:
      str = Math.floor(space / (3600 * 1000)) + '小时前';
      break;
    case space < 3600 * 1000 * 24 * 30:
      str = Math.floor(space / (3600 * 1000 * 24)) + '天前';
      break;
    case space < 3600 * 1000 * 24 * 30 * 12:
      str = Math.floor(space / (3600 * 1000 * 24 * 30)) + '月前';
      break;
    default:
      str = Math.floor(space / (3600 * 1000 * 24 * 30 * 12)) + '年前';
  }
  return str;
}