import React from "react";

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {SignIn} from "./pages/Signin.jsx";
import {SignUp} from "./pages/Signup.jsx";
import {Protected} from "./pages/Protected.jsx";
import {RequireAuth} from "./components/RequireAuth.jsx";

import {PocketProvider} from "./contexts/PocketContext.jsx";
import {Box, Header, Heading, Page, PageContent} from "grommet";
import {Code, Technology, Test} from "grommet-icons";
const AppBar = ({appIcon,appName}) =>(
    <Header pad={{left: "small", right: "small", vertical: "xxsmall"}}>
        <Box flex={false} direction="row" align="center" >
            {appIcon}
            <Heading level="3" margin={{left:"xsmall"}}>{appName}</Heading>
        </Box>
    </Header>
)
export const App = () => {
    return(
        <PocketProvider>
            <Page>
            <AppBar appName="JanusLabs" appIcon={<Test color="brand"/>}/>
            <PageContent>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/login"} element={<SignIn/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route element={<RequireAuth/>}>
                            <Route path={"/protected"} element={<Protected/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PageContent>
            </Page>
        </PocketProvider>
    );
};