/* eslint-disable eqeqeq */
import Axios, { CancelToken } from 'axios';
import { getAuth, resetAuth } from '../utils/CookieUtil';
import { APP_MODE, BASE_URL } from '../config/constants';
import toast from 'react-hot-toast';
// import router from "next/router";

// create an Axios instance
const service = Axios.create({
   baseURL: BASE_URL, // url = base url + request url
   // withCredentials: true, // send cookies when cross-domain requests
   timeout: 5000, // request timeout
});

const source = CancelToken.source();

// request interceptor
service.interceptors.request.use(
   config => {
      // console.log("config",config);
      let auth = getAuth();
      // if (validateAuth(auth)) {
      config.headers['Authorization'] = `Bearer ${auth.token}`;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.cancelToken = source.token;
      // }

      return config;
   },
   error => {
      if (APP_MODE === 'dev') {
         console.log(error); // for debug
      }
      return Promise.reject(error);
   }
);

// response interceptor
service.interceptors.response.use(
   /**
    * If you want to get http information such as headers or status
    * Please return  response => response
    */

   /**
    * Determine the request status by custom code
    * Here is just an example
    * You can also judge the status by HTTP Status Code
    */
   response => {
      const res = response.data;
      // console.log("RESPONSE ", response); // debug
      if (res) {
         if (res.message && APP_MODE === 'dev') {
            toast.success(res.message);
         }
         return res.data;
      }
   },
   error => {
      if (error.response) {
         let { data, status /* message */ } = error.response; // for debug
         if (status >= 500) {
            toast.error(data.message || 'SEVER ERROR');
            // console.log(data);
            return Promise.reject(new Error(data.message || 'Error'));
         } else if (status >= 400) {
            if (status === 401 || status === 403) {
               if (APP_MODE === 'prod') {
                  resetAuth();
                  // router.push("/login");
               }
            }
            try {
               toast.error(data.message);
            } catch (err) {
               toast.error(error.message);
            }
            return Promise.reject(new Error(data.message || 'Error'));
         } else if (status >= 300) {
            return Promise.reject(new Error(data.message || 'Error'));
         } else {
            toast.error(data.message);
         }
      } else {
         toast.error(error.message);
      }

      return Promise.reject(error);
   }
);

export default service;
