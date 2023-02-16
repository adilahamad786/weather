const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    res.send("Home page!");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});