// import { DISTRIBUTOR, MERCHANT, SUPERVISOR } from "config/constants";
import Layout from '../components/Layouts/Layout';

// import ApiTestLayout from '../components/Layouts/ApiTestLayout';

// import { lazy } from 'react';
// import Event from '../views/api-test/Event';
import NotFound from '../views/NotFound';
import Login from '../views/Auth/Login';
// import SignUp from '../views/Auth/Signup';

//Icons
// const DashboardIcon = lazy(() => import('@material-ui/icons/Dashboard'));

// Icons
import Settings from '../views/Account/Settings';
import { Navigate } from 'react-router-dom';
import Authenticator from '../components/modules/Authenticator';
import Iconify from '../components/modules/Iconify';
import AuthPageWrapper from '../views/Auth/AuthPageWrapper';
import Recovery from '../views/Auth/Recovery';
import { ReactComponent as SVG_APP_1 } from '../assets/app_nav_item_1.svg';
import { ReactComponent as SVG_APP_2 } from '../assets/app_nav_item_2.svg';

import ApplicationsList from '../views/applications/ApplicationsList';
import UsersList from '../views/users/UsersList';
import EditApplicationWrapper from '../views/applications/EditApplicationWrapper';
import GeneralInfo from '../views/applications/tabs/GeneralInfo';
import Construction from '../views/applications/tabs/Construction';
import ExcelTemplateList from '../views/excel/ExcelTemplateList';
import ReferrerList from '../views/referrer/ReferrerList';
import Reset from '../views/Auth/Reset';

// const AdminDash = lazy(() => import('../views/admin/Applications'));

export const defaultRoutes = [
   {
      path: '/',
      element: <Authenticator />,
      enabled: true,
   },
   {
      path: '/auth',
      title: 'Login',
      truePath: '/auth',
      enabled: true,
      element: <AuthPageWrapper />,
      children: [
         {
            path: 'login',
            title: 'Login',
            truePath: '/auth/login',
            enabled: true,
            element: <Login />,
         },
         {
            path: 'recovery',
            title: 'Recover Password',
            truePath: '/auth/recovery',
            enabled: true,
            element: <Recovery />,
         },
         {
            path: 'reset',
            title: 'Recover Password',
            truePath: '/auth/reset',
            enabled: true,
            element: <Reset />,
         },
      ],
   },
   {
      path: '*',
      element: <NotFound />,
      enabled: true,
   },
];

// User Specific Routes
export const user1Routes = [
   {
      path: '/',
      element: <Authenticator />,
      enabled: true,
      truePath: null,
   },
   {
      path: '/admin',
      enabled: true,
      element: <Layout />,
      children: [
         { index: true, element: <Navigate to="/" replace />, enabled: true },
         {
            path: 'applications',
            title: 'Applications',
            truePath: '/admin/applications',
            enabled: true,
            element: <ApplicationsList />,
            icon: <SVG_APP_1 />,
         },
         {
            path: 'applications/:id',
            title: 'Applications',
            truePath: null,
            enabled: true,
            element: <EditApplicationWrapper />,
            icon: <SVG_APP_1 />,
            children: [
               { index: true, element: <Navigate to="general-info" replace />, enabled: true },
               {
                  path: 'general-info',
                  title: null,
                  truePath: null,
                  enabled: true,
                  element: <GeneralInfo />,
                  icon: null,
               },
               {
                  path: 'construction',
                  title: null,
                  truePath: null,
                  enabled: true,
                  element: <Construction />,
                  icon: null,
               },
               {
                  path: 'subsidence-flooding',
                  title: null,
                  truePath: null,
                  enabled: true,
                  element: <Construction />,
                  icon: null,
               },
            ],
         },
         {
            path: 'users',
            title: 'Users',
            truePath: '/admin/users',
            enabled: true,
            element: <UsersList />,
            icon: <SVG_APP_2 />,
         },
         {
            path: 'excel-versions',
            title: 'Excel Version Control',
            truePath: '/admin/excel-versions',
            enabled: true,
            element: <ExcelTemplateList />,
            icon: <SVG_APP_2 />,
         },
         {
            path: 'referrer',
            title: 'Referrer',
            truePath: '/admin/referrer',
            enabled: true,
            element: <ReferrerList />,
            icon: <SVG_APP_2 />,
         },
         {
            path: 'settings',
            title: 'Settings',
            truePath: null,
            enabled: true,
            icon: <Iconify icon="ic:outline-settings" width={22} height={22} />,
            element: <Settings />,
         },
         {
            path: '*',
            element: <NotFound />,
            enabled: true,
         },
      ],
   },
];

// export default genericRoutes.filter(route => route.enabled);

export function getRawRoutes(Arr) {
   let rawRoutes = [];
   (function iterator(Arr) {
      Arr.forEach(el => {
         if (el.children) {
            rawRoutes = iterator(el.children);
         } else {
            rawRoutes.push(el);
         }
      });
      return rawRoutes;
   })(Arr);

   // enable below code in case of Route Duplication

   //  rawRoutes.forEach((el, ind, array) => {
   //     if (array.indexOf(el) !== array.lastIndexOf(el)) {
   //        array.splice(ind, 1);
   //     }
   //  });

   return rawRoutes;
}
