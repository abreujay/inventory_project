const { app, Product } = require('./server');

// rotas
app.post('/product', async (req, res) => {

    try {

        const { productName, productQuant, productPrice } = req.body;

        const newProduct = await Product.create({
            productName: productName,
            productPrice: productPrice,
            productQuant: productQuant,
        });

        res.status(201).json({ message: "Produto Registrado!" });

    } catch (error) {

        res.status(500).json({ message: "Ocorreu um erro ao enviar dados ao servidor..." });

    }


});
