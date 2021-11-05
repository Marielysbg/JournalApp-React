/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginWithEmailAndPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

let store = mockStore(initState);


describe('Pruebas con la acciones de auth.js', () => {

    beforeEach(() => {

        store = mockStore(initState);

    })

    test('Login y logout deben de crear la acción respectiva  ', () => {

        const uid = 'ABC123';
        const displayName = 'Marielys';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect ( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        })

        expect( logoutAction ).toEqual({ type: types.logout});
    
    });

    test('Debe de realizar el logout', async() => {
        
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })
    })

    test('Debe de iniciar el startLoginWithEmailAndPassword', async() => {

        await store.dispatch(startLoginWithEmailAndPassword('test@testing.com', '123456'));

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'NJ9GcwXN18hnNsc3giTJXgeZoUa2',
                displayName: null
            }
        })
        
    })
    
    
})
