import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Pruebas en ui.js', () => {
    
    test('todas las acciones deben funcionar', () => {
        
        const err = 'error';
        const action = setError( err );

        expect( action ).toEqual({
            type: types.uiSetError,
            payload: err
        });

        const removeErrorAction = removeError();
        expect( removeErrorAction ).toEqual({type: types.uiRemoveError});

        const startLoadingAction = startLoading();
        expect( startLoadingAction ).toEqual({type: types.uiStartLoading});

        const finishLoadingAction = finishLoading();    
        expect( finishLoadingAction ).toEqual({type: types.uiFinishLoading});

    })
    

})
