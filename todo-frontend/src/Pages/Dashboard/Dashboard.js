import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosComplete } from "../../Redux/action/todoCompleteSlice";
import { getTodos } from "../../Redux/action/todoSlice";
import TodayTodoChart from "./TodayTodoChart";
import TotalTodoChart from "./TotalTodoChart";
import Loading from "../../Loading/Loading";
import useFirebase from "../../Hooks/useFirebase";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const URL = `${process.env.REACT_APP_URL}`;
  const todos = useSelector((state) => state.todoApp.todos);
  const todosComplete = useSelector(
    (state) => state.todoCompleteApp.todosComplete
  );
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

  const todosFilter = todos.filter((item) => item.date === currentDate);

  // =========================================
  // Todo Complete List Get Data Functionality
  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `${URL}/todo-complete?email=${userInfo.email}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      try {
        const result = await res.data;
        dispatch(getTodosComplete(result));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, URL, authToken, userInfo.email]);

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

  const todosCompleteFilter = todosComplete.filter(
    (item) => item.date === currentDate
  );

  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white">Dashboard</h3>

        <div className="d-flex flex-wrap justify-content-start align-items-center">
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
        </div>

        {loading ? (
          <div style={{ marginTop: "10rem" }}>
            <Loading />
          </div>
        ) : (
          <div>
            <div style={{ margin: "2rem 0rem 3rem 0rem" }}>
              <div className="row gx-3 gy-5">
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div
                    className="dashboard-info-card"
                    style={{ backgroundColor: "#A569BD" }}
                  >
                    <h4>{todosComplete.length}</h4>
                    <p className="pt-3">
                      Total
                      <br />
                      Todos Complete
                    </p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div
                    className="dashboard-info-card"
                    style={{ backgroundColor: "#2ECC71" }}
                  >
                    <h4>{todosFilter.length}</h4>
                    <p className="pt-3">
                      Today
                      <br />
                      Todo List
                    </p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div
                    className="dashboard-info-card"
                    style={{ backgroundColor: "#3498DB" }}
                  >
                    <h4>{todosCompleteFilter.length}</h4>
                    <p className="pt-3">
                      Today
                      <br />
                      Todo Complete
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <div
                    className="dashboard-info-card"
                    style={{ backgroundColor: "#EC7063 " }}
                  >
                    <h4>{todosFilter.length}</h4>
                    <p className="pt-3">
                      Today
                      <br />
                      Todo Incomplete
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ margin: "2rem 0rem 3rem 0rem" }}>
              <div className="row gy-5">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                  {/* <h3>Column Left</h3> */}
                  <div style={{ margin: "1.8rem 0rem" }}>
                    <TotalTodoChart
                      todos={todos}
                      todosComplete={todosComplete}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  {/* <h4 className="text-white mt-4 mb-4">Today's Todo Chart</h4> */}

                  <div style={{ margin: "1.8rem 0rem" }}>
                    <TodayTodoChart
                      todosCompleteFilter={todosCompleteFilter}
                      todosFilter={todosFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
