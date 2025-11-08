    const express = require('express');
    const mongoose = require('mongoose');

    const app = express();
    app.use(express.json());

    mongoose.connect("mongodb+srv://krisharora99100_db_user:6Mip7BCIowioZ3VV@cluster0.gec3yib.mongodb.net/?appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("Connection failed:", err));




    // --- Define Product Schema & Model ---
    const productSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true }
    });
    const Product = mongoose.model('Product', productSchema);

    // --- Create a Product ---
    app.post('/products', async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // --- Read All Products ---
    app.get('/products', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- Update Product by ID ---
    app.put('/products/:id', async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // --- Delete Product by ID ---
    app.delete('/products/:id', async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json({ message: 'Product deleted', product });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // --- Start server ---
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
