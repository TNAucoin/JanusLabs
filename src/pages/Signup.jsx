import React, {useCallback, useRef} from "react";
import {useNavigate, Link} from "react-router-dom";

import {usePocket} from "../contexts/PocketContext.jsx";
import {Button} from "grommet";

export const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {register} = usePocket();
    const navigate = useNavigate();

    const handleOnSubmit = useCallback(async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await register(email, password);
        navigate('/login');
    }, [register]);

    return (
        <section>
            <h1>Sign Up</h1>
            <form onSubmit={handleOnSubmit}>
                <input placeholder={"Email"} ref={emailRef}/>
                <input placeholder={"Password"} type="password" ref={passwordRef}/>
                <Button type="submit">Sign Up</Button>
                <Link to={"/login"}>Login</Link>
            </form>
        </section>
    );
}