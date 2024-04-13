import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProducts.css'

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); 
    const [editedData, setEditedData] = useState({}); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/view-products');
            setProducts(response.data);
            console.log('Lista de produtos atualizada', response.data);
        } catch (error) {
            console.error('Ocorreu um erro ao listar produtos...', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/view-products/${productId}`);
            await fetchProducts();
        } catch (error) {
            console.error('Ocorreu um erro ao excluir o produto', error);
        }
    };

    const editProduct = async (productId) => {
        try {
            const response = await axios.put(`http://localhost:3000/view-products/${productId}`, editedData);
            console.log(response.data);
            await fetchProducts();
            setEditingProduct(null); 
            setEditedData({});
        } catch (error) {
            console.error('Ocorreu um erro ao atualizar o produto', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData({ ...editedData, [name]: value }); 
    };

    return (
        <div className='products-list'>
            <h4>Estoque</h4>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.productName} - R${product.productPrice} - {product.productQuant} Unidades
                        {editingProduct === product.id ? (
                            <div>
                                <input type="text" name="productName" placeholder="Novo nome" onChange={handleInputChange} />
                                <input type="number" name="productPrice" placeholder="Novo preço" onChange={handleInputChange} />
                                <input type="number" name="productQuant" placeholder="Nova quantidade" onChange={handleInputChange} />
                                <button onClick={() => editProduct(product.id)}>Salvar</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingProduct(product.id)}>Editar</button>
                        )}
                        <button onClick={() => deleteProduct(product.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditProducts;
