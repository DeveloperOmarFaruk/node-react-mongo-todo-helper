import React, { useState } from "react";
import useFirebase from "../../Hooks/useFirebase";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";

const Users = () => {
  const { users, loading, handleUserRoleCreate, handleFetchUser } =
    useFirebase();
  const [roleFilter, setRoleFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(7);

  // Get current posts
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Handle page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleNotify = () => toast.success("Refresh Successful");

  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white">Admin Dashboard Users</h3>

        <div className="d-flex flex-wrap justify-content-start align-items-center">
          <div className="mt-4 me-4">
            <select
              className="form-select"
              aria-label="Default select example"
              style={{ border: "1px solid #0dcaf0" }}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="mt-4 me-4">
            <input
              className="form-control "
              type="search"
              placeholder="Search Name"
              aria-label="Search"
              onChange={(e) => setSearchName(e.target.value)}
              style={{ border: "1px solid #0dcaf0" }}
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="btn text-white"
              style={{ backgroundColor: "#0badce" }}
              onClick={() => {
                handleFetchUser();
                handleNotify();
              }}
            >
              <i className="fa-solid fa-arrows-rotate"></i> Refresh{" "}
            </button>
          </div>

          <div className="mt-4 ms-4"></div>
        </div>

        <div style={{ margin: "2rem 0rem" }}>
          {loading ? (
            <div style={{ marginTop: "10rem" }}>
              <Loading />
            </div>
          ) : (
            <>
              <table className="table">
                <thead>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </thead>

                <tbody>
                  {users &&
                    users
                      .filter((item) => {
                        if (roleFilter === "user") {
                          return item.role === roleFilter;
                        } else if (roleFilter === "admin") {
                          return item.role === roleFilter;
                        } else return item;
                      })
                      .filter((item) => {
                        if (searchName === "") {
                          return item;
                        } else {
                          return item.displayName
                            .toLowerCase()
                            .includes(searchName.toLowerCase());
                        }
                      })
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((item, index) => (
                        <tr className="align-middle" key={item._id}>
                          <td data-label="S. No.">{index + 1}</td>
                          <td data-label="Name">{item.displayName}</td>
                          <td data-label="Email">{item.email}</td>
                          <td data-label="Role">{item.role}</td>
                          <td data-label="Action">
                            <select
                              className="form-select form-select-sm  "
                              aria-label="Small select example"
                              value={item.role}
                              onChange={(e) => {
                                handleUserRoleCreate(
                                  item.email,
                                  e.target.value
                                );
                              }}
                              style={{
                                backgroundColor: "#343a40",
                                color: "white",
                              }}
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {users.length >= 7 && (
                <Pagination
                  pageCount={Math.ceil(users.length / postsPerPage)}
                  handlePageClick={handlePageClick}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
