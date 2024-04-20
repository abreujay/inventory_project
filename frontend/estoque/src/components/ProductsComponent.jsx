import React, { useState } from 'react';
import axios from 'axios';
import './ProductsComponent.css'
import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'

const ProductsComponent = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuant, setProductQuant] = useState('');
    const [message, setMessage] = useState('')


    const handleProductName = (e) => {
        setProductName(e.target.value);
    };

    const handleProductPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductQuant = (e) => {
        setProductQuant(e.target.value);
    };

    const submitData = async (e) => {
        e.preventDefault();
        setProductName('');
        setProductPrice('');
        setProductQuant('');
    
        try {
            const response = await axios.post("https://app-test2-d2068ae4b3f9.herokuapp.com/", {
                productName,
                productPrice,
                productQuant
            }).then((response) => {
                console.log('Dados enviados com sucesso!', response.data);
                if(response.status === 201){
                    setMessage('Produto inserido!');
                } else {
                    setMessage('Ocorreu um erro ao inserir o produto...');
                }
            });
        } catch (error) {
            console.error('Ocorreu um erro ao enviar dados para o servidor', error);
        }
    };
    

    return (
        <div className='createProduct'>
            <form>
                <div className="form-header">
                    <h3>Registrar produto</h3>
                </div>
                <div className="form-body">
                    <label htmlFor="productName">Produto:</label>
                    <input type="text" name='productName' value={productName} onChange={handleProductName} required />
                    <label htmlFor="productPrice">Preço:</label>
                    <input type="number" name='productPrice' id='price' value={productPrice} onChange={handleProductPrice} required />
                    <label htmlFor="productQuant">Quantidade:</label>
                    <input type="number" name='productQuant' id='quant' value={productQuant} onChange={handleProductQuant} required />
                    <button onClick={submitData}><FaPlus/> Add</button>
                    {message && <p>{message}</p>}
                </div>
                <div className="view-products">
                   <Link to={'/view-products'}><button>Visualizar produtos</button></Link>
                </div>
            </form>
        </div>
    );
};

export default ProductsComponent;
