const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [{'email':'a@b.com','password':'123'}, {'email':'b@c.com','password':'123'}, {'email':'c@d.com','password':'123'}];
let products = [{'name':"coca-cola", 'description':'aaa', 'price':'12.5'}, {'name':"coca-lata", 'description':'aaa', 'price':'75.5'}];

// Rota para login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Rota para cadastro de usuários
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    users.push({ email, password });
    res.status(201).send('User registered');
});

// Rota para obter produtos
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Rota para adicionar produto
app.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    products.push({ name, description, price });
    res.status(201).send('Product added');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});