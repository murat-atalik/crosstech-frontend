import 'react-toastify/dist/ReactToastify.css';
import 'style/index.scss';

import SignIn from 'pages/SignIn/SignIn';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from 'routes/routes';

const App = function () {
  const signIn = useSelector((state) => state.signIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              signIn.isSignedIn ? (
                <route.component />
              ) : (
                <Navigate to="/" state={{ from: route.path }} />
              )
            }
          />
        ))}
      </Routes>
      <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
