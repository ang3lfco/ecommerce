import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({ _id, title:existingTitle, description:existingDescription, price:existingPrice, images}){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    
    //fetch o axios
    async function createProduct(ev){
        ev.preventDefault();
        const data = {title, description, price};
        if(_id){
            await axios.put('/api/products', {...data, _id}); //update
        }
        else{
            await axios.post('/api/products', data); //create
        }
        setGoToProducts(true);
    }
    if(goToProducts){
        router.push('/Products');
    }
    async function uploadImages(ev){
        console.log(ev);
        const files = ev.target?.files;
        if(files?.length > 0){
            /* en ves de un json como de costumbre guardamos todo en un FormData
            sera mas facil el parse en el lado del back end
            */
            const data = new FormData();
            for(const file of files){
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log(res.data);
        }
    }
    return(
        <form onSubmit={createProduct}>
            <h1>New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}></input>
            <label>Photos</label>
            <div className="mb-2">
                <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>Upload</div>
                    <input type="file" onChange={uploadImages} className="hidden"></input>
                </label>{!images?.lenght && (<div>No photos in this product</div>)}
            </div>
            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price (in usd)</label>
            <input type="text" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}></input>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}