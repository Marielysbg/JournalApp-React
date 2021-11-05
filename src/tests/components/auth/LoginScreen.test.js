
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startGoogleLogin, startLoginWithEmailAndPassword } from '../../../actions/auth';

const { mount } = require("enzyme");
const { Provider } = require("react-redux");
const { LoginScreen } = require("../../../components/auth/LoginScreen")

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginWithEmailAndPassword: jest.fn()
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen/>', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('Debe hacer match con el snapshot', () => {

        expect(wrapper).toMatchSnapshot();
        
    });
    
    test('Debe de disparar la acción de startGoogleLogin', () => {

        wrapper.find('.google-btn').prop('onClick')();  
        expect( startGoogleLogin ).toHaveBeenCalled();
        
    });

    test('Debe de disparar el startLogin con los respectivos argumentos', () => {
        
        wrapper.find('form').prop('onSubmit')(
            {preventDefault(){}}
        );  
        expect( startLoginWithEmailAndPassword ).toHaveBeenCalledWith('', '')
       
    })
    
    
    
})
