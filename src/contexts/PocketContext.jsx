import {createContext, useCallback, useContext, useEffect, useMemo, useState,} from "react";
import PocketBase from "pocketbase";
import {jwtDecode} from "jwt-decode";
import ms from "ms";
import {useInterval} from "usehooks-ts";

const BASE_URL = "http://127.0.0.1:8090";
const fiveMinutesInMS = ms("5 minutes");
const twoMinutesInMS = ms("2 minutes");

const PocketContext = createContext({});

export const PocketProvider = ({children}) => {
    const pb = useMemo(() => new PocketBase(BASE_URL), []);
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        })
    }, []);

    const register = useCallback(async (email, password) => {
        return await pb.collection('users').create({email, password, passwordConfirm: password});
    }, []);

    const login = useCallback(async (email, password) => {
        return await pb.collection('users').authWithPassword(email, password);
    }, []);

    const logout = useCallback(() => {
        pb.authStore.clear();
    }, []);

    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const expirationWithBuffer = (decoded.exp + fiveMinutesInMS) / 1000;
        if (tokenExpiration < expirationWithBuffer) {
            await pb.collection('users').authRefresh();
        }
    }, [token]);

    useInterval(refreshSession, token ? twoMinutesInMS : null);

    return (
        <PocketContext.Provider value={{pb, token, user, register, login, logout}}>
            {children}
        </PocketContext.Provider>
    )

};

export const usePocket = () => useContext(PocketContext);