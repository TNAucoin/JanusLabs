import React, {useRef, useCallback} from "react";
import {useNavigate, Link} from "react-router-dom";

import {usePocket} from "../contexts/PocketContext";
import {Button} from "grommet";

export const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = usePocket();
    const navigate = useNavigate();

    const handleOnSubmit = useCallback(async (e) => {
        e.preventDefault();
        await login(emailRef.current.value, passwordRef.current.value);
        navigate('/protected');
    }, [login]);

    return (
        <section>
            <h1>Sign In</h1>
            <form onSubmit={handleOnSubmit}>
                <input placeholder={"Email"} ref={emailRef}/>
                <input placeholder={"Password"} type="password" ref={passwordRef}/>
                <Button type="submit">Sign In</Button>
                <Link to={"/signup"}>Sign Up</Link>
            </form>
        </section>
    )
}