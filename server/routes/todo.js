import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import TodoModel from '../models/todo.js';

const router = express.Router();

router.post("/create-todo", verifyToken, async (req, res) => {
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
  

router.get("/read-todos", verifyToken, async (req, res) => {
    const userId = req.userId;
    
    try {
        const todos = await TodoModel.find({userId: userId});
        res.status(200).json({ message: "Todo retreived successfully", todos });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

router.patch("/update-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;
    const { updatedTodo } = req.body;

    try {
        await TodoModel.findByIdAndUpdate(todoId, { todo: updatedTodo });
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});


router.delete("/delete-todo/:id", verifyToken, async(req, res) => {
    const todoId = req.params.id;

    try {
        await TodoModel.findOneAndDelete({_id: todoId});
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});

export { router as todoRouter };
