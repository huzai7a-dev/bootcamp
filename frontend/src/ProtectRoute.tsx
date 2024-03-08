import { Outlet, useNavigate } from "react-router-dom"
import { RootState } from "./App";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectRoute = ()=> {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    useEffect(()=> {
        if(isLoggedIn) {
            navigate('/')
        }else {
            navigate('/login')
        }
    },[isLoggedIn, navigate])
    return (
        <Outlet/>
    )    
};

export default ProtectRoute;