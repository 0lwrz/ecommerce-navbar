import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

const UserContextProvider = ({children}) =>{
 const [userToken , setUserToken] = useState(localStorage.getItem('userToken'));
 const [userName , setUserName] = useState(null);
 const [auth , setAuth] = useState({})
 const getUserData = ()=>{
  if (userToken!=null){
   const decoded = jwtDecode(userToken);
   setUserName(decoded.userName);
  }
 }
 const getAllData = () =>{
   if (userToken!=null){
      const decoded = jwtDecode(userToken);
      setAuth(decoded);
   }
 }

 useEffect(()=>{
  getUserData();
 },[userToken]);
 useEffect( ()=>{
  getAllData();
 },[userToken] )

 return <UserContext.Provider value={{setUserToken , userName ,setUserName ,auth ,setAuth}}>
    {children}
 </UserContext.Provider>
}
export default UserContextProvider;