import { mount } from "enzyme";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Marielys'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
}
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store}>
        <NoteScreen/>   
    </Provider>
);

describe('Pruebas en <NoteScreen/>', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('Debe de disparar el activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'hola de nuevo'
            }
        })

        expect(activeNote).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'hola de nuevo',
                id: 1234,
                date: 0
            }
        );

    })
    
    

})
