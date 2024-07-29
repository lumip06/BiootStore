const express = require('express');
const path = require('path'); // Add path module to work with file paths
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main-page.html')); // Send the HTML file
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});