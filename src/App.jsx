import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/Signin.jsx';
import { SignUp } from './pages/Signup.jsx';
import { Protected } from './pages/Protected.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';

import { PocketProvider, usePocket } from './contexts/PocketContext.jsx';
import AppBar from './components/layout/AppBar.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Create } from './pages/Create.jsx';

export const App = () => {
  const { user } = usePocket();
  return (
    <ChakraProvider>
      <PocketProvider>
        <BrowserRouter>
          <AppBar appName={'JanusLabs'} />
          <Routes>
            <Route path={'/'} element={<SignIn />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route element={<RequireAuth />}>
              <Route path={'/dashboard'} element={<Dashboard />} />
              <Route path={'/create'} element={<Create />} />
              <Route path={'/protected'} element={<Protected />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PocketProvider>
    </ChakraProvider>
  );
};
