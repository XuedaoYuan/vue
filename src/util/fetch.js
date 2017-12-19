import axios from 'axios';
import { Message } from 'element-ui';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,  // api的base_url
  timeout: 3000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  let context = {
    clientMac: "00-01-6C-06-A6-29",
    clientType: "WEB",
    // token: Cookies.get('Token') ? Cookies.get('Token') : '',
    timestamp: Date.parse(new Date())
  }
  // config.data.context = context;
  // config.data.sign = getSign();
  return config;
}, error => {
  // Message({
  //   message: error.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // });
  // Do something with request error

  console.log('请求错误', error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    
    //Token 过期了
    let data = response.data;
    if (data.status == 0) {
      Message({
        message: data.errorMsg || '请求错误',
        type: 'error',
        duration: 3 * 1000
      });
    }
    if (response.data.errorMsg === "MEMBER_NOT_LOGIN") {
      Message({
        message: "请重新登录",
        type: 'error',
        duration: 3 * 1000
      });
    } else {
      return response
    }
    // return response
  },
  error => {
    console.log('err' , error); // for debug
    Message({
      message: error.response.status + ' ' + error.response.statusText,
      type: 'error',
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
)

export default service
