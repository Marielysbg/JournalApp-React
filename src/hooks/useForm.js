import { useState } from 'react'

export const useForm = (initialState = {}) => {
   
    const [values, setvalues] = useState(initialState)

    const reset = ( newFormState = initialState ) => {

        setvalues(newFormState);

    }

    const handleInputChance = ({target}) => {

        setvalues({
            ...values,
         [target.name]: target.value
        });
     }
 
     return [values, handleInputChance, reset];

}
