
import axios,{AxiosError,AxiosRequestConfig,AxiosResponse} from 'axios';
import {Modal,Message} from '@arco-design/web-react';
const service=axios.create({
  timeout:5000
});
//请求拦截器
service.interceptors.request.use(
  (config:AxiosRequestConfig)=>{
    const token=localStorage.getItem('token');
    if (token) {
     config.headers.Authorization = `Bearer${token}`;


    }
        return config
  },
  (error:AxiosError)=>{
    console.log(error);
     return Promise.reject(error);
  }
);
// response interceptor  响应拦截器
service.interceptors.response.use(
  // 正常请求直接返回
  (response: AxiosResponse) => response.data,
  // 错误请求返回错误原因代码code
  (error: AxiosError) => {
    console.log('err' + error); // for debug
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = error.response?.data?.message || 'token失效，请重新登录';
        // 这里可以触发退出的 action
        Modal.confirm({
          title: '没有权限',
          content: message,
          okText: '去登录',
          cancelText: '取消',
          onOk: () => {
            // 清除过期令牌
            localStorage.removeItem('token');
            localStorage.removeItem('userStatus');
            // 去登录页面
            window.location.href = '/login';
          },
        });
        break;
      case 403:
        message = error.response?.data?.message || '拒绝访问';
        break;
      case 404:
        message = error.response?.data?.message || '请求地址错误';
        break;
      case 500:
        message = error.response?.data?.message || '服务器故障';
        break;
      default:
        message = error.response?.data?.message || '网络连接故障';
    }
    Message.error(message);
    return Promise.reject(error);
  }
);

export default service;


