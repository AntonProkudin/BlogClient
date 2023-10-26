import axios from "axios";
import {useAppSelector} from "../hook";


export const instance = axios.create({
    baseURL: 'https://localhost:5001',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
export const useAuthInstance = () => {
    const user = useAppSelector(state =>state.auth.user)

    const api = axios.create({
        baseURL: 'https://localhost:5001',
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${user.userToken}`,
        },
    });

    return api;
}