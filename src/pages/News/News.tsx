    import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';


    const News: FC = () => {

        const [state, setstate] = useState<any>({
            name: '',
            description: '',
            price: '',
            info: '',
        });

        const ref = useRef<HTMLInputElement | null>(null);
        const ref2 = useRef<HTMLInputElement | null>(null);
        const isSale = false;

        const addProduct = async() => {


            const formData = new FormData();
            formData.append('name', 'vaza3');
            formData.append('description', 'sdfsdf');
            formData.append('price', '32.2');
            formData.append('type', 'worktop')
            formData.append('info', JSON.stringify([{ title: "sf", text: "sf" }]));

            formData.append('isSale', 'false');
            formData.append('salePrice', '30');
            formData.append('amount', '300');

            if (ref.current && ref.current.files && ref.current.files.length > 0) {
                formData.append('images', ref.current.files[0]);
            }
            if (ref2.current && ref2.current.files && ref2.current.files.length > 0) {
                formData.append('images', ref2.current.files[0]);
            }

            try {
                const response = await axios.post('http://localhost:5000/api/products', formData);
                console.log('Product added:', response.data);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
        
        
        useEffect(() => {

        }, []);
        return (
            <div style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
                <input ref={ref} type="file" name="" id="" />
                <input ref={ref2} type="file" name="" id="" />
                <button onClick = {addProduct}>Send</button>
            </div>
        )
    };

    export default News;