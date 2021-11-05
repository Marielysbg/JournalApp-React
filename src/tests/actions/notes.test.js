/**
 * @jest-environment node
 */

import { deleteDoc, doc, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: () => {
        return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    }
}))

jest.useRealTimers();
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'vuGrjFroGH1P6KZoHnPS',
            title: 'hola',
            body: 'mundo'
        }
    }
}

let store = mockStore(initState);

global.scrollTo = jest.fn(); 

describe('Pruebas en notes.js', () => {  

    beforeEach(() => {

        store = mockStore(initState);

    })
    
    test('Debe de crear una nueva nota StartNewNote', async() => {
        
       await store.dispatch(startNewNote());

       const actions = store.getActions();

       expect( actions[0] ).toEqual({
        type: types.notesActive,
        payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        }
       });

       expect( actions[1] ).toEqual({
        type: types.notesAddNew,
        payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        }
       });

       const docId = actions[0].payload.id;

       await deleteDoc(doc(db, `TESTING`, `journal/notes/${docId}`));

    });

    test('startLoadingNotes debe cargar las notas', async() => {

        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    })

    test('StartSaveNote debe actualizar la nota', async() => {
        
        const note = {
            id: 'vuGrjFroGH1P6KZoHnPS',
            title: 'title',
            body: 'body',
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated)

    
    })
    
    test('startUploading debe actualizar el url del entry', async() => {
        
         const file = [];
         await store.dispatch(startUploading( file ));

         const docRef = doc(db, `TESTING`, `journal/notes/vuGrjFroGH1P6KZoHnPS`);
         const docSnap = await getDoc(docRef);

         expect(docSnap.data().url).toBe('https://hola-mundo.com/cosa.jpg');

    })
    

})
