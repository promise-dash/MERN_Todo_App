import React, { useEffect, useState } from 'react'

const Home = () => {

  const [todo, setTodo] = useState("");
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  // const [updatedTodo, setUpdatedTodo] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3001/api/read-todos",{
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    };

    getTodos();
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/api/create-todo", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.error("Error creating todo:", response.status);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  
    setTodo("");
  };

  const handleEdit = async (todoId) => {
    const updatedTodo = prompt("Update your todo");

    const response = await fetch(`http://localhost:3001/api/update-todo/${todoId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({updatedTodo}),
    });

    const data = await response.json();
    alert(data.message);
  }

  const handleDelete = async (todoId) => {
    const response = await fetch(`http://localhost:3001/api/delete-todo/${todoId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data.message);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  
  return (
    <section>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    <br />
    {todos.map((todo) => {
      return (
        <div key={todo._id}>
        {todo.todo}
        <button onClick={() => handleEdit(todo._id)}>Edit</button>
        <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </div>
      )
    })}
    <br />
    <button onClick={handleLogout}>Logout</button>
    </section>
  );
}  

export default Home;