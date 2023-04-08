import axios from 'axios';

type Options = {
  url: string,
  method: string,
  params?: {},
  data?: {},
  validateStatus: (status: number) => boolean
}
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//跨域请求是否需要凭证(带上cookie)
axios.defaults.withCredentials = true;

export default function request(url: string, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const option: Options = {
      url,
      method: type,
      //当状态码不符合区间时，返回false会reject直接进入catch
      validateStatus: (status) => (status >= 200 && status < 300) || status === 400,
    };
    if (type.toLowerCase() === 'get') {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option).then(result => {
      if (result.status === 200) {
        resolve(result.data);
      } else {
        console.error(result.data);
        reject(result.data);
      }
    }).catch(() => {
      console.error({msg: '网络异常'});
      reject({msg: '网络异常'});
    });
  });
}