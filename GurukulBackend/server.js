const app = require('express')();
require('dotenv').config();
const port = process.env.PORT;
require("./config/db")();
const bodyParser = require('body-parser')
const path = require("path");
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200'
}))
app.get('/', (req, res) => {
    res.send('hello from server')
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/adminRoutes/adminRoute'));
app.use('/', require('./routes/userRoutes/userRoute'));
app.use('/', require('./routes/productRoutes/productRoute'));
app.use('/', require('./routes/cartRoutes/cartRoute'));

app.listen(port, () => {
    console.log("server is listening on port: ", port);
});