import todoModel from "../model/todoModel.js";

// add create or add todo
export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.body;

    if (!title.trim())
      return res.json({ message: "Please enter todo", success: false });
    const newTodo = new todoModel({ title, userId });
    await newTodo.save();
    return res.json({ todo: newTodo, success: true });
  } catch (error) {
    return res.json({ message: error?.message || error, success: false });
  }
};

// get all todo of loggedin user

export const getAllTodo = async (req, res) => {
  try {
    const { userId } = req.body;
    const todos = await todoModel.find({ userId: userId });
    if (todos.length === 0)
      return res.json({ todos:[] , success: false });
    return res.json({ todos: todos || [], success: true });
  } catch (error) {
    return res.json({ message: error?.message || error, success: false });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoId, title } = req.body;
    if (!todoId || !title.trim())
      return res.json({ message: "Missing todo or UserId", success: false });
    const todo = await todoModel.findById(todoId);

    if (!todo)
      return res.json({ message: "Todo is not found", success: false });

    await todoModel.findByIdAndUpdate(
      { _id: todo._id },
      {
        title: title,
      }
    );
    
    return res.json({ message: "Todo updated successfully", success: true });
  } catch (error) {
    return res.json({ message: error?.message, success: false });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;

    if (!todoId) {
      return res.json({ message: "Todo id is required", success: false });
    }
    const deletedTodo = await todoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.json({ message: "Todo not found", success: false });
    }

    return res.json({ message: "Todo deleted successfully", success: true });
  } catch (error) {
    return res.json({ message: error.message || error });
  }
};
