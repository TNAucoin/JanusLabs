import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/Signin.jsx';
import { SignUp } from './pages/Signup.jsx';
import { Protected } from './pages/Protected.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';

import { PocketProvider } from './contexts/PocketContext.jsx';
import AppBar from './components/layout/AppBar.jsx';

export const App = () => {
  return (
    <PocketProvider>
      <AppBar appName="JanusLabs">
        <BrowserRouter>
          <Routes>
            <Route path={'/login'} element={<SignIn />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route element={<RequireAuth />}>
              <Route path={'/protected'} element={<Protected />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppBar>
    </PocketProvider>
  );
};
