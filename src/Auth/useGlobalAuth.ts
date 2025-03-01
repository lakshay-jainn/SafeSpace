import {useContext} from 'react';
import { AuthContext } from './AuthContext';

export default function useGlobalAuth(){
   
    return useContext(AuthContext)!
}
