const express = require('express');
const mongoose = require('mongoose');

app = express();

app.get('/', (req, res) => {
    res.json({ message: 'welcome to group wise!' })
})

app.all('*', (req, res, next) => {
    console.log('FALLBACK ERROR');
    next();
})

app.listen(8000, () => {
    console.log('serving on port 8000')
})