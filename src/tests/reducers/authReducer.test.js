import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('Pruebas en AuthReducer', () => {
    
    test('Debe de realizar el login', () => {

        const initialState = {};
        
        const action = {
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'Marielys'
            }
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual({
            uid: '123',
            name: 'Marielys'
        });

    });

    test('Debe de hacer logout', () => {

        const initialState = {  
            uid: '123',
            name: 'Marielys'
        };
        
        const action = {
            type: types.logout,
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual({});
  
    });

    test('Debe de hacer el return default', () => {
        
        const initialState = {  
            uid: '123',
            name: 'Marielys'
        };
        
        const action = {
            type: 'prueba',
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);

    })
    
    
    

})


