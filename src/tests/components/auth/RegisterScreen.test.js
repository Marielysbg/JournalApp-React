import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);

const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen/>', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
    
    test('Debe hacer match con el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('Debe de mostrar la caja de alerta con el error', () => {
        
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        }
        
       const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store = {store}>
                <MemoryRouter>
                    <RegisterScreen/> 
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe('Email no es correcto');


    })
    
    

})
