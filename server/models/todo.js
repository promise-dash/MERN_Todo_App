import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const TodoModel = mongoose.model('todos', todoSchema);

export default TodoModel;
