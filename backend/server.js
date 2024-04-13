const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
exports.app = app;

app.use(bodyParser.json());
app.use(cors());

let sequelize;

try {
    sequelize = new Sequelize('Estoque', 'root', '1234', {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    });
} catch (error) {
    console.error('Ocorreu um erro ao conectar-se com o banco de dados', error);
    process.exit(1); // Saia do processo se ocorrer um erro
}

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productQuant: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    omitNull: true
});

// Rotas
app.post("/", async (req, res) => {
    try {
        const { productName, productPrice, productQuant } = req.body;
        const newProduct = await Product.create({
            productName,
            productPrice,
            productQuant,
        });
        res.status(201).json({ message: 'Produto inserido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto...', details: error.message });
    }
});

app.get("/view-products", async (req, res) => {

    try {
        
        const products = await Product.findAll()
        res.status(200).json(products)

    } catch (error) {
        
        console.error('Ocorreu um erro ao listar produtos', error)
        res.status(500).json({message: "Erro ao listar produtos"})

    }

})

app.delete("/view-products/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
        console.error('Ocorreu um erro ao excluir o produto', error);
        res.status(500).json({ message: 'Erro ao excluir o produto', error: error.message });
    }
});


app.put("/view-products/:id", async (req, res) => {

    const productId = req.params.id;
    const { productName, productPrice, productQuant } = req.body;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        product.productName = productName;
        product.productPrice = productPrice;
        product.productQuant = productQuant;

        await product.save();

        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        console.error('Ocorreu um erro ao atualizar o produto', error);
        res.status(500).json({ message: 'Erro ao atualizar o produto', error: error.message });
    }
});


exports.Product = Product;
Product.tableName = 'productsTable';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
