const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin JWT token
const serviceAccount = require("./todo-helper-5100d-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      req.decodedEmail = decodedUser.email;
    } catch {}
  }
  next();
}

// MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@crud-mongodb.bkqhhcm.mongodb.net/?appName=crud-mongodb`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to the "shampooShopDB" database and access its collections
    const database = client.db("todoHelperDB");
    const usersCollection = database.collection("users");
    const todosCollection = database.collection("todos");
    const completesCollection = database.collection("completes");

    // ==========================
    // Users GET API Method
    // ==========================

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // =====================================
    // Users GET API by ID Method
    // =====================================
    // app.get("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await usersCollection.findOne(query);
    //   res.send(result);
    // });

    // ========================
    // User POST API method
    // ========================

    app.post("/users", async (req, res) => {
      const addUsers = req.body;
      const result = await usersCollection.insertOne(addUsers);
      res.json(result);
    });

    // ==========================
    // Users Admin GET API Method
    // ==========================

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let adminEmail = "";
      if (user?.role === "admin") {
        adminEmail = email;
      }
      res.json({ adminEmail: adminEmail });
    });

    // ==========================
    // Users Admin PUT API Method
    // ==========================
    app.put("/users/admin", verifyToken, async (req, res) => {
      const user = req.body;
      const requester = req.decodedEmail;
      if (requester) {
        const requesterAcount = await usersCollection.findOne({
          email: requester,
        });
        if (requesterAcount.role === "admin") {
          const filter = { email: user.email };
          const updateDoc = {
            $set: {
              role: `${user.role}`,
            },
          };

          const result = await usersCollection.updateOne(filter, updateDoc);
          res.json(result);
        }
      } else {
        res
          .status(403)
          .json({ message: "You do not have access to make Admin" });
      }
    });

    // ==========================
    // Todo-List POST API method
    // ===========================

    app.post("/todo-list", async (req, res) => {
      const addTodos = req.body;
      const result = await todosCollection.insertOne(addTodos);
      res.json(result);
    });

    // ==========================
    // Todo-List GET API Method
    // ============================

    app.get("/todo-list", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = todosCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // =====================================
    // Todo-List GET API by ID Method
    // =====================================
    app.get("/todo-list/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await todosCollection.findOne(query);
      res.send(result);
    });

    // ==========================
    // Todo-List PUT API Method
    // ==========================
    app.put("/todo-list/:id", async (req, res) => {
      const id = req.params.id;
      const updateTodoData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          date: updateTodoData.date,
          email: updateTodoData.email,
          title: updateTodoData.title,
          details: updateTodoData.details,
        },
      };

      const result = await todosCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // ===============================
    // Todo List DELETE API method
    // ===============================

    app.delete("/todo-list/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await todosCollection.deleteOne(query);
      res.json(result);
    });

    // ===============================
    // Todo-Complete POST API method
    // ===============================

    app.post("/todo-complete", async (req, res) => {
      const addTodos = req.body;
      const result = await completesCollection.insertOne(addTodos);
      res.json(result);
    });

    // =============================
    // Todo-Complete GET API Method
    // =============================

    app.get("/todo-complete", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = completesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // ===================================
    // Todo-Complete GET API by ID Method
    // ===================================
    app.get("/todo-complete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await completesCollection.findOne(query);
      res.send(result);
    });

    // ===============================
    // Todo List DELETE API method
    // ===============================

    app.delete("/todo-complete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await completesCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(
    "Hello, I'm a Node server. Now I'm working... Please don't disturbe me."
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
