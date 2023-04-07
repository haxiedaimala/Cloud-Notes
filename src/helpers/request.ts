import axios from 'axios';

type Options = {
  url: string,
  method: string,
  params?: {},
  data?: {},
}
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//跨域请求是否需要凭证(带上cookie)
axios.defaults.withCredentials = true;

export default function request(url: string, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const option: Options = {
      url,
      method: type
    };
    if (type.toLowerCase() === 'get') {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option).then(
      result => {
        if (result.status === 200) {
          resolve(result.data);
        }
      },
      error => {
        console.error(error.response.data);
        reject(error.response.data);
      }
    ).catch(() => {
      console.error({msg: '网络异常'});
      reject({msg: '网络异常'});
    });
  });
}