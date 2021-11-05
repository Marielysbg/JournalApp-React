import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
  import { Redirect } from 'react-router'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        
        const auth = getAuth();
        onAuthStateChanged( auth, async (user) => {

            if(user?.uid){
                dispatch( login ( user.uid, user.displayName ) );
                setisLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
               
            } else {
                setisLoggedIn(false);
            }
            
            setchecking(false);
        });

    }, [dispatch, setchecking, setisLoggedIn])

    if(checking){
        return (
            <h1>Espere...</h1>
        )
    };

    return (
        <Router>
            <div>           
                <Switch>

                    <PublicRoute
                        path = '/auth' 
                        component = { AuthRouter } 
                        isAuthenticated = { isLoggedIn }
                    />

                    <PrivateRoute 
                        exact   
                        isAuthenticated = {isLoggedIn} 
                        path = '/'
                        component = { JournalScreen }  
                    />

                <Redirect to = "/auth/login"/>

                </Switch>
            </div>
        </Router>
        
    )
}


