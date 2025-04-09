const http = require('http');
const path = require('path');
const getDate = require('./server-files/getDate.js');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    const timestamp = getDate()

    if (req.url !== '/') {
        console.log(`${timestamp} --- Klient wysłał zapytanie o plik ${req.url}`);
    }

    // Zadanie 1.17
    switch (req.url){
        case "/strona1":

            break;
    }
});

// Запуск сервера
server.listen(PORT, () => {
    const timestamp = getDate()
    console.log(`${timestamp} === Serwer zostaje uruchomiony na porcie ${PORT}.`);
});
