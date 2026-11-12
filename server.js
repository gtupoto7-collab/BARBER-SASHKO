const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
    // Rutirane za snimki (na primery barber.jpg)
    if (req.url.endsWith('.jpg') || req.url.endsWith('.png')) {
        const imgPath = path.join(__dirname, req.url);
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Image not found');
            } else {
                const ext = path.extname(req.url);
                const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
        return;
    }

    // Obsluzhvane na index.html
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error: index.html missing');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🔥 RED-SOFTWARE-TEAM-BG barber server e zapalen na port ${PORT}!`);
});
