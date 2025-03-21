// const express = require('express') // old way
import express from "express" // new way (type: module)
import logger from "morgan"

const app = express();

app.use(logger("dev"));

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.listen(3000, () => {
    console.log('sure')
});

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

app.get('/greet/:Bri', (req, res) => {
    res.send('Greetings, Bri!');
});




  