// const express = require('express') // old way
import express from "express" // new way (type: module)
import logger from "morgan"

const app = express();

app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/greet/:Bri', (req, res) => {
    res.send('Greetings, Bri!');
});

// 2. Rolling the Dice 

app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    const maxNumber = parseInt(number);

    if (isNaN(maxNumber)) {
        return res.send("You must specify a number");
    }

    const roll = Math.floor(Math.random() * (maxNumber + 1));
        
    res.send(`You rolled a ${roll}.`);
});

// 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send(`This item is not in stock. Check back soon`);   
    }
  
    const item = collectibles[index];
    res.send(`So you want the ${item.name}? The prices is ${item.price}`);
    });

//4. Filter Shoes by QP

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let { 'min-price': minPrice, 'max-price':maxPrice, type } = req.query;

    minPrice = minPrice ? parseFloat(minPrice) : null;
    maxPrice = maxPrice ? parseFloat(maxPrice) : null;

    let filteredShoes = shoes.filter(shoe => {
        return (
            (minPrice === null || shoe.price >= minPrice) &&
            (maxPrice === null || shoe.price <= maxPrice) &&
            (!type || shoe.type === type)
        );
    });
    res.json(filteredShoes);
});

app.listen(3000, () => {
    console.log("hello");
});