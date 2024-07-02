import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteTodos, getTodos } from "../../Redux/action/todoSlice";
import { addTodosComplete } from "../../Redux/action/todoCompleteSlice";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import useFirebase from "../../Hooks/useFirebase";

const TodoList = () => {
  const [todo, setTodo] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(7);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL = `${process.env.REACT_APP_URL}`;
  const todos = useSelector((state) => state.todoApp.todos);
  const { userInfo, authToken } = useFirebase();

  // =================================
  // Todo List Get Data Functionality
  // =================================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`${URL}/todo-list?email=${userInfo.email}`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      try {
        const result = await res.data;
        dispatch(getTodos(result));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, URL, authToken, userInfo.email]);

  // =======================
  // Todo data find by id
  // =======================
  const handleTodoGet = async (id) => {
    const findData = todos.find((item) => item.id === id);
    setTodo(findData);
  };

  // ======================================
  // Todo Details Line Break functionality
  // ======================================
  const convertToBreakLines = (text) => {
    if (!text) {
      return null;
    }
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // ============================================
  // Get the current date in YYYY-MM-DD format
  // ============================================
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  // =================================
  // Todo List Delete Functionality
  // =================================

  const handleTodoDelete = async (id) => {
    const res = await axios.delete(`${URL}/todo-list/${id}`);
    try {
      if (res) {
        dispatch(deleteTodos({ id }));
      }
    } catch (error) {
      console.log(error);
    }
    toast.success("Todo Delete Successful");
  };

  // =================================
  // Todo List Complete Functionality
  // =================================

  const handleTodoComplete = async (id) => {
    const findData = todos.find((item) => item.id === id);
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    const addCompeleteData = {
      date: formattedDate,
      email: findData.email,
      title: findData.title,
      details: findData.details,
    };
    const res = await axios.post(`${URL}/todo-complete`, addCompeleteData);
    try {
      const result = await res.data;
      dispatch(addTodosComplete(result));
    } catch (error) {
      console.log(error);
    }
    toast.success("Todo Complete Successful");
    handleTodoDelete(id);
  };

  // =================================
  // Pagination Functionality
  // =================================
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filterDateData = todos.filter((item) => item.date === currentDate);

  // =================================
  // Date Stringfy Convert Functionality
  // =================================
  const handleDateStringfy = (date) => {
    const converDate = new Date(date).toDateString();
    return <>{converDate}</>;
  };

  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white">Todo List</h3>

        <div className="d-flex flex-wrap justify-content-start align-items-center">
          <div className="mt-4 me-4">
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#025de4" }}
              onClick={() => navigate(`/add-todo`)}
            >
              Add Todo <i className="fa-solid fa-plus ms-2"></i>
            </button>
          </div>

          <div className="mt-4 me-4">
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#28a745" }}
              onClick={() => navigate(`/todo-complete`)}
            >
              Todo Complete <i className="fa-solid fa-check ms-2"></i>
            </button>
          </div>

          <div className="mt-4 me-4">
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#dc3545" }}
              onClick={() => navigate(`/todo-incomplete`)}
            >
              Todo Incomplete <i class="fa-solid fa-spinner ms-2"></i>
            </button>
          </div>

          <div className="mt-4 me-4">
            <input
              className="form-control "
              type="date"
              placeholder="Date"
              aria-label="Date"
              value={currentDate}
              onChange={handleDateChange}
              style={{ border: "1px solid #0dcaf0" }}
            />
          </div>

          <div className="mt-4">
            <input
              className="form-control "
              type="search"
              placeholder="Search Title"
              aria-label="Search"
              onChange={(e) => setSearchTitle(e.target.value)}
              style={{ border: "1px solid #0dcaf0" }}
            />
          </div>
        </div>

        <div style={{ margin: "2rem 0rem" }}>
          {todos.length === 0 ? (
            <>
              <h5 className="text-center text-white">No Data</h5>
            </>
          ) : (
            <>
              {loading ? (
                <div style={{ marginTop: "10rem" }}>
                  <Loading />
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <th>S.No.</th>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Action</th>
                  </thead>

                  <tbody>
                    {todos &&
                      todos

                        .filter((item) => {
                          if (currentDate) {
                            return item.date === currentDate;
                          } else return item;
                        })

                        .slice(indexOfFirstPost, indexOfLastPost)
                        .filter((item) => {
                          if (searchTitle === "") {
                            return item;
                          } else {
                            return item.title
                              .toLowerCase()
                              .includes(searchTitle.toLowerCase());
                          }
                        })
                        .map((item, index) => (
                          <tr className="align-middle" key={item.id}>
                            <td data-label="S. No.">{index + 1}</td>
                            <td data-label="Date">
                              {handleDateStringfy(item.date)}
                            </td>
                            <td data-label="Title">{item.title}</td>
                            <td data-label="Details">
                              <button
                                type="button"
                                className="btn text-white pt-1 pb-1"
                                onClick={() => handleTodoGet(item.id)}
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                style={{ backgroundColor: "#0badce" }}
                              >
                                View
                              </button>
                            </td>

                            <td data-label="Action" className="text-center">
                              <i
                                className="fa-solid fa-pen-to-square"
                                onClick={() =>
                                  navigate(`/update-todo/${item.id}`)
                                }
                                style={{
                                  color: "#20c997",
                                  cursor: "pointer",
                                  fontSize: "20px",
                                  margin: "10px 20px",
                                }}
                              ></i>

                              <i
                                className="fa-solid fa-trash"
                                onClick={() => handleTodoDelete(item.id)}
                                style={{
                                  color: "#1c2833",
                                  cursor: "pointer",
                                  margin: "10px 20px",
                                  fontSize: "20px",
                                }}
                              ></i>

                              <i
                                className="fa-regular fa-square-check"
                                onClick={() => handleTodoComplete(item.id)}
                                style={{
                                  color: "#0dcaf0",
                                  cursor: "pointer",
                                  margin: "10px 20px",
                                  fontSize: "20px",
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}

              {filterDateData.length > 7 && (
                <Pagination
                  pageCount={Math.ceil(filterDateData.length / postsPerPage)}
                  handlePageClick={handlePageClick}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* ============================================== */}
      {/* =========== Todo View Modal =============== */}
      {/* ============================================== */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ backgroundColor: "#213c54" }}>
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="staticBackdropLabel"
                style={{ color: "#0badce" }}
              >
                Todo Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-start align-items-start text-white">
                <div className="col-3">
                  <p style={{ color: "#0badce" }}>Date:</p>
                </div>
                <div className="col-9">
                  <p>{todo.date}</p>
                </div>
              </div>

              <div className="d-flex justify-content-start align-items-start text-white">
                <div className="col-3">
                  <p style={{ color: "#0badce" }}>Title:</p>
                </div>
                <div className="col-9">
                  <p>{todo.title}</p>
                </div>
              </div>

              <div className="d-flex justify-content-start align-items-start text-white">
                <div className="col-3">
                  <p style={{ color: "#0badce" }}>Details:</p>
                </div>
                <div className="col-9">
                  <p>{convertToBreakLines(todo.details)}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn text-white pt-1 pb-1"
                style={{ backgroundColor: "#0badce" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
