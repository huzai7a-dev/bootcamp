import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { RootState } from "./App";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectRoute = ()=> {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    useEffect(()=> {
        if(isLoggedIn && pathname === "/login") {
            navigate('/')
        } 
        if(!isLoggedIn && pathname !== "/login"){
            navigate('/login')
        }
    },[isLoggedIn, navigate, pathname])
    return (
        <Outlet/>
    )    
};

export default ProtectRoute;