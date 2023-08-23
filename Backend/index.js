const mongoose = require("mongoose");
const cors = require('cors');
const app = require("./app")
require('dotenv').config();
const PORT = process.env.PORTNUMBER || 8082;

app.use(cors())
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => console.error("Error connecting to the database:", err));



