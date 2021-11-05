import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

jest.setTimeout(10000)


describe('Pruebas en fileUpload', () => {

    cloudinary.config({ 
        cloud_name: 'dpsmlc6em', 
        api_key: '236846759953654', 
        api_secret: 'gMyyn-miAFbw3FjO6g1VMBmpF54',
        secure: true
      });
    
    test('Debe de cargar un archivo y retornar el URL', async () => {
        
        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        //Borrar imagén
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace(".png", '');

        await cloudinary.v2.api.delete_resources(imageId);

    })
    
    test('Debe de retornar un error', async () => {
        

        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect(url).toBe(null);
    })

})
