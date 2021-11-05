import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes)

    const handleSave = () => {

        dispatch(startSaveNote( active ))

    }

    const handlePicture = () => {
        
        document.querySelector('#fileSelector').click();

    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
        document.querySelector('#fileSelector').value = '';
    };

    return (
        <div className = "notes__appbar">

            <span>20 de agosto 2020</span>

            <input
                id = 'fileSelector'
                type = 'file'
                style = {{ display:'none' }}
                onChange = { handleFileChange }
                name = 'file'
            /> 
            
            <div>
                <button 
                    className = "btn"
                    onClick = { handlePicture }
                >
                    Picture
                </button>

                <button 
                    className = "btn"
                    onClick = { handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
