const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// ================================
//       Connecting with Mongo
// ================================

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.25l91.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        await client.connect();

        // ==== Setting api for Services ====
        const serviceCollection = client
            .db("Assign-11-Electro-Vally")
            .collection("services");
        app.get("/services", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // ==== Setting api for Inventories ====
        const inventoriesCollection = client
            .db("Assign-11-Electro-Vally")
            .collection("inventories");
        app.get("/inventories", async (req, res) => {
            const query = {};
            const cursor = inventoriesCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        });
    } finally {
        // to close connection
    }
};
// calling
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("running server");
});

// running server ===
app.listen(port, () => {
    console.log(`listening: ${port}`);
});
