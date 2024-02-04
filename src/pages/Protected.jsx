import React from "react";

import {usePocket} from "../contexts/PocketContext";
import {Button} from "grommet";

export const Protected = () => {
    const {user, logout} = usePocket();

    return (
        <div>
            <h1>Protected</h1>
            <p>Welcome {user.email}</p>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}