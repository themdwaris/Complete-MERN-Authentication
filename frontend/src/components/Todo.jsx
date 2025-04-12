import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiTodoFill } from "react-icons/ri";
import { FcEditImage } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { IoMdArrowBack } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";
import { useYourContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Todo = () => {
  axios.defaults.withCredentials = true;
  const { user, backendURL, loading, setLoading, navigate } =
    useYourContext();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (todoId) {
      updateTodo(todoId, title);
      return;
    } else {
      try {
        setLoading(true);
        const res = await axios.post(`${backendURL}/api/todo/add-todo`, {
          title,
        });
        if (res?.data?.success) {
          getAllTodo();
          setTitle("");
          setLoading(false);
          return;
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.message || error);
      }
    }
  };

  const getAllTodo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}/api/todo/todo-list`);
      if (res?.data?.success) {
        setTodos(res?.data?.todos);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || error);
    }
  };

  const updateTodo = async (todoId, title) => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/api/todo/update-todo`, {
        todoId,
        title,
      });
      if (res?.data?.success) {
        toast.success("Todo updated successfully");
        setTitle("");
        setTodoId("");
        setLoading(false);
        getAllTodo();
        return;
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/api/todo/delete-todo`, {
        todoId,
      });
      if (res?.data?.success) {
        toast.success("Todo deleted successfully");
        setLoading(false);
        getAllTodo();
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message || error);
    }
  };

  useEffect(() => {
    getAllTodo();
  }, []);

  useEffect(() => {
      const logged = JSON.parse(localStorage.getItem("isLogged"))
      if (!logged) {
        navigate("/");
      }
    }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <span
        onClick={() => navigate("/")}
        className="mr-auto p-1 rounded bg-gradient-to-r from-purple-600 to-indigo-400 cursor-pointer transition transform active:scale-90 mb-3 sm:mb-0"
        title="Go Back"
      >
        <IoMdArrowBack size={22} />
      </span>

      <h1 className="text-center pb-5 mb-8 text-2xl sm:text-3xl font-medium flex items-center gap-3">
        {user?.name && (
          <p className="bg-gradient-to-r from-purple-600 to-indigo-400 inline-block text-transparent bg-clip-text">
            {user?.name}
          </p>
        )}
        <span className="bg-gradient-to-r from-purple-600 to-indigo-400 rounded p-1">
          <RiTodoFill size={28} />
        </span>
        Todooos
      </h1>

      <form onSubmit={submitHandler} className="w-full max-w-[500px] mx-auto">
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            name="title"
            value={title}
            placeholder={`What to do Today?`}
            className="w-full p-3 bg-white/20 outline-none border-none rounded-lg text-white"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-400 text-white font-bold cursor-pointer transition transform active:scale-90 ${
              loading && "opacity-60"
            }`}
            title="Add Todo"
          >
            {loading ? (
              <Loader />
            ) : todoId ? (
              <RiEditBoxFill size={28} />
            ) : (
              <IoMdAdd size={28} />
            )}
          </button>
        </div>
      </form>
      <div className="mt-6 w-full max-w-[500px] mx-auto flex flex-col items-center max-h-[400px] overflow-y-auto gap-3 element pb-16">
        {todos?.length > 0 &&
          todos
            .map((t, i) => (
              <div
                key={t?._id}
                className="w-full px-3 py-2 rounded-lg bg-white/20 flex items-center justify-between"
              >
                <p className="text-slate-100 text-[16px] font-medium max-h-full overflow-x-auto element">
                  {t?.title}
                </p>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="cursor-pointer transition transform active:scale-90"
                      onClick={() => {
                        setTitle(t?.title);
                        setTodoId(t?._id);
                      }}
                      title="Edit"
                    >
                      <FcEditImage size={24} />
                    </span>
                    <span
                      className="cursor-pointer transition transform active:scale-90"
                      onClick={() => deleteTodo(t?._id)}
                      title="Delete"
                    >
                      <FcFullTrash size={24} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {new Date(t?.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            ))
            .reverse()}
      </div>
    </div>
  );
};

export default Todo;
