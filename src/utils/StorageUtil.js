/* eslint-disable eqeqeq */
import { APP_NAME, SESSION_TIME } from '../config/constants';
import Cookies from 'js-cookie';

export function setAuth(auth, isRemeber) {
   Cookies.set(`${APP_NAME}_Authorization`, auth.Authorization, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_fName`, auth.fName, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_lName`, auth.lName, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_user_phone`, auth.phone, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_user_role`, auth.role_type, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_user_role_name`, auth.role_name, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_user_email`, auth.email, {
      expires: isRemeber ? SESSION_TIME : null,
   });
   Cookies.set(`${APP_NAME}_user_pic`, auth.image, {
      expires: isRemeber ? SESSION_TIME : null,
   });

   let userObject = {};
   userObject.token = auth.Authorization;
   userObject.name = auth.name;
   userObject.phone = auth.phone;
   userObject.role_name = auth.role_name;
   userObject.role = auth.role_type;
   userObject.pic = auth.image;
   userObject.email = auth.email;
   //  console.log('setted data:', userObject);
   return userObject;
}

export function getAuth() {
   let userObject = {};
   userObject.token = Cookies.get(`${APP_NAME}_Authorization`);
   userObject.fName = Cookies.get(`${APP_NAME}_fName`);
   userObject.lName = Cookies.get(`${APP_NAME}_lName`);
   userObject.email = Cookies.get(`${APP_NAME}_user_email`);
   userObject.phone = Cookies.get(`${APP_NAME}_user_phone`);
   userObject.role = Cookies.get(`${APP_NAME}_user_role`);
   userObject.role_name = Cookies.get(`${APP_NAME}_user_role_name`);
   userObject.pic = Cookies.get(`${APP_NAME}_user_pic`);
   return userObject;
}

export function resetAuth() {
   Cookies.remove(`${APP_NAME}_Authorization`);
   Cookies.remove(`${APP_NAME}_user_id`);
   Cookies.remove(`${APP_NAME}_user_name`);
   Cookies.remove(`${APP_NAME}_user_email`);
   Cookies.remove(`${APP_NAME}_user_phone`);
   Cookies.remove(`${APP_NAME}_user_role`);
   Cookies.remove(`${APP_NAME}_user_role_name`);
   Cookies.remove(`${APP_NAME}_user_pic`);

   let userObject = {};

   return userObject;
}

export function validateAuth(auth) {
   // console.log('data for Validation:', auth);
   let { token, name, email, phone, role, role_name, pic } = getAuth();

   if (
      token &&
      name &&
      role &&
      auth.token == token &&
      auth.name == name &&
      auth.email == email &&
      auth.phone == phone &&
      auth.pic == pic &&
      auth.role == role &&
      auth.role_name == role_name
   ) {
      return true;
   }

   return false;
}

export function setTheme(isLightTheme) {
   Cookies.set('theme_preference', isLightTheme, { expires: 365 });
   return isLightTheme === 'true';
}

export function getTheme() {
   const isLightTheme = Cookies.get('theme_preference');
   // console.log(isLightTheme);
   // if (isLightTheme === undefined) {
   // }
   if (isLightTheme === 'true') {
      return true;
   }
   if (isLightTheme === 'false') {
      return false;
   }
   return isLightTheme;
}
