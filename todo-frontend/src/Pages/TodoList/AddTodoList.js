import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../../Redux/action/todoSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useFirebase from "../../Hooks/useFirebase";

const AddTodoList = () => {
  const [addTodo, setAddTodo] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const { userInfo } = useFirebase();
  const URL = `${process.env.REACT_APP_URL}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================================
  // Get the current date in YYYY-MM-DD format
  // ============================================
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  // ============================
  // Todo List add functionality
  // ============================

  const handleAddTodoChange = (e) => {
    setAddTodo({ ...addTodo, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const addTodoData = {
      date: currentDate,
      email: userInfo.email,
      title: addTodo.title,
      details: addTodo.details,
    };

    const res = await axios.post(`${URL}/todo-list`, addTodoData);
    try {
      const result = await res.data;
      dispatch(addTodos(result));
    } catch (error) {
      console.log(error);
    }
    toast.success("Todo Add Successful");
    navigate(`/todo-list`);
  };

  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white text-center">Todo Add Form</h3>

        <div className="row" style={{ margin: "4rem 0rem" }}>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xm-12"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xm-12">
            <form onSubmit={handleAddTodo}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  required
                  disabled
                  name="email"
                  value={userInfo.email}
                  style={{ border: "1px solid #20c997" }}
                />
                <label for="floatingInput">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Date"
                  required
                  name="date"
                  value={currentDate}
                  onChange={handleDateChange}
                  style={{ border: "1px solid #20c997" }}
                />
                <label for="floatingInput">Date</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Title"
                  required
                  name="title"
                  onChange={handleAddTodoChange}
                  style={{ border: "1px solid #20c997" }}
                />
                <label for="floatingInput">Title</label>
              </div>

              <div className="form-floating mb-3 ">
                <textarea
                  className="form-control"
                  placeholder="Details"
                  id="floatingTextarea"
                  required
                  name="details"
                  wrap="hard"
                  onChange={handleAddTodoChange}
                  style={{ border: "1px solid #20c997", height: "300px" }}
                ></textarea>
                <label for="floatingTextarea">Details</label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn "
                  style={{ backgroundColor: "#20c997" }}
                >
                  Todo Add
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 col-xm-12"></div>
        </div>
      </div>
    </>
  );
};

export default AddTodoList;
