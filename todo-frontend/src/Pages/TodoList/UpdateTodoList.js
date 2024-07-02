import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateTodos } from "../../Redux/action/todoSlice";
import { toast } from "react-toastify";

const UpdateTodoList = () => {
  const [updateTodoData, setUpdateTodoData] = useState({});
  const URL = `${process.env.REACT_APP_URL}`;
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =========================
  // Todo List data load by Id
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${URL}/todo-list/${id.id}`);
      try {
        const result = await res.data;
        setUpdateTodoData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [URL, id.id]);

  // ==============================
  // Todo List Update Functionality
  // ==============================

  const newTodoData = (e) => {
    setUpdateTodoData({ ...updateTodoData, [e.target.name]: e.target.value });
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    const res = await axios.put(`${URL}/todo-list/${id.id}`, updateTodoData);
    try {
      const result = await res.data;
      dispatch(updateTodos(result));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    toast.success("Todo Update Successful");
    navigate(`/todo-list`);
  };

  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white text-center">Todo Update Form</h3>

        <div className="row" style={{ margin: "4rem 0rem" }}>
          <div className="col-lg-3 col-md-3 col-sm-12 col-xm-12"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xm-12">
            <form onSubmit={handleUpdateTodo}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  required
                  disabled
                  name="email"
                  value={updateTodoData && updateTodoData.email}
                  onChange={newTodoData}
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
                  value={updateTodoData && updateTodoData.date}
                  onChange={newTodoData}
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
                  value={updateTodoData && updateTodoData.title}
                  onChange={newTodoData}
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
                  value={updateTodoData && updateTodoData.details}
                  onChange={newTodoData}
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
                  Todo Update
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

export default UpdateTodoList;
