import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TodoModel from './models/todo.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});



app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.findOne({username});
        if (user) {
            return res.status(400).json("Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json('User registered successfully');
    } catch (error) {
        res.status(500).json({ message: 'Registration Error', error });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json("No user exist with this email");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(400).json("Incorrect password");
        }
        const token =  jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.status(201).json({ token: token });
    } catch (error) {
         res.status(500).json({ message: 'Login Error', error });
    }
});


//Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


app.post("/api/create-todo", verifyToken, async (req, res) => {
    const { todo } = req.body;
    const userId = req.userId;

    try {
      const newTodo = new TodoModel({ todo, userId });
      await newTodo.save();
      res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating todo", error });
    }
});
  

app.get("/api/read-todos", verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
        const todos = await TodoModel.find({userId: userId});
        res.status(200).json({ message: "Todo retreived successfully", todos });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

app.patch("/api/update-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;
    const { updatedTodo } = req.body;

    try {
        await TodoModel.findByIdAndUpdate(todoId, { todo: updatedTodo });
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});


app.delete("/api/delete-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;

    try {
        await TodoModel.findOneAndDelete({_id: todoId});
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});



app.listen(3001, () => {
    console.log('Server is running!');
})