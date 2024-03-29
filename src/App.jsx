import React from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/Signin.jsx';
import { SignUp } from './pages/Signup.jsx';
import { Protected } from './pages/Protected.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';

import { PocketProvider } from './contexts/PocketContext.jsx';
import AppBar from './components/layout/AppBar.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Create } from './pages/Create.jsx';
import { JanusProvider } from './contexts/JanusContext.jsx';
import { Queue } from './pages/Queue.jsx';

export const App = () => {
  return (
    <ChakraProvider>
      <PocketProvider>
        <JanusProvider>
          <BrowserRouter>
            <AppBar appName={'JanusLabs'} />
            <Routes>
              <Route path={'/'} element={<SignIn />} />
              <Route path={'/signup'} element={<SignUp />} />
              <Route element={<RequireAuth />}>
                <Route path={'/dashboard'} element={<Dashboard />} />
                <Route path={'/create'} element={<Create />} />
                <Route path={'/queue'} element={<Queue />} />
                <Route path={'/protected'} element={<Protected />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </JanusProvider>
      </PocketProvider>
    </ChakraProvider>
  );
};
