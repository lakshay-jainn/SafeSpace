import {useContext} from 'react';
import { AuthContext } from './AuthContext';

export default function useGlobalAuth(){
    const { token, isLoggedIn, Login ,Logout,handleProtectedAction}=useContext(AuthContext)!;
    return { token, isLoggedIn, Login ,Logout,handleProtectedAction};
}
