import React from 'react';
import { Route, Routes, createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import About from '../pages/about/About';
import Media from '../pages/media/Media';
import Message from '../pages/Message/Message';
import PostDetails from '../pages/media/PostDetails';
import ProtectedRoute from './protectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      
      {
        path: '/register',
        element: <Signup/>     
      },
      {
        path: '/login',
        element: <Login/>     
      },
      {
        path: '/about',
        element: <ProtectedRoute><About/></ProtectedRoute>     
      },
      {
        path: '/media',
        element: <ProtectedRoute><Media/></ProtectedRoute>     
        // element: <Media/>     
      },
      {
        path: '/message',
        element: <Message/>     
      },
      {
        path: '/postDetails/:id',
        element: <ProtectedRoute><PostDetails/></ProtectedRoute>     
      },
      // {
      //   path: '/login/success',
      //   element: <LoginSuccess/>     
      // },
     
      
    ],
  },
 
]);
export default router;


// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Main from '../layout/Main';
// import Home from '../pages/home/Home';
// import Signup from '../pages/signup/Signup';
// import Login from '../pages/login/Login';
// import About from '../pages/about/About';
// import Media from '../pages/media/Media';
// import Message from '../pages/Message/Message';
// import PostDetails from '../pages/media/PostDetails';
// import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

// const router = (
//   <Routes>
//     <Route
//       path="/"
//       element={<ProtectedRoute />}> {/* Protect all routes including Home */}
//       <Route
//         index
//         element={<Home />}
//       />
//       <Route
//         path="register"
//         element={<Signup />}
//       />
//       <Route
//         path="login"
//         element={<Login />}
//       />
//       <Route
//         path="about"
//         element={<About />}
//       />
//       <Route
//         path="media"
//         element={<Media />}
//       >
//         <Route
//           index
//           element={<ProtectedRoute />}> {/* Protect all media-related routes */}
//           <Route
//             index
//             element={<Media />}
//           />
//           <Route
//             path="postDetails/:id"
//             element={<PostDetails />}
//           />
//         </Route>
//       </Route>
//       <Route
//         path="message"
//         element={<Message />}
//       />
//     </Route>
//   </Routes>
// );

// export default router;
