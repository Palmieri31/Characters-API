const app = require('./app');
const db = require('./database/database');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`App listening on http://${host}:${port}`);
});