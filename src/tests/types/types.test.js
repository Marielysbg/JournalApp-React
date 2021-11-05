import { types } from "../../types/types"

describe('Pruebas en types', () => {
    
    test('Los types deben ser iguales', () => {
        
        const objTypes = {
            login: '[auth] Login',
            logout: '[auth] Logout',
        
            uiSetError: '[UI] set error',
            uiRemoveError: '[UI] remove error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New notes',
            notesActive: '[Notes] set active note',
            notesLoad: '[Notes] Load Notes',
            notesUpdated: '[Notes] Update Note',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout cleaning',
        
        }

        expect(types).toEqual(objTypes);

    })
    

})
