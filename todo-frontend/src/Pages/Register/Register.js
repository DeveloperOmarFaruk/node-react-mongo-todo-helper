import React from "react";
import { useNavigate } from "react-router";
import useFirebase from "../../Hooks/useFirebase";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegisterChange, handleRegister } = useFirebase();
  return (
    <>
      <div style={{ margin: "6rem 0rem" }} className="text-center ">
        <div className="text-center mb-4">
          <img
            style={{ width: "100px", borderRadius: "50%" }}
            src="https://static.vecteezy.com/system/resources/thumbnails/003/529/153/small/business-to-do-list-flat-icon-modern-style-free-vector.jpg"
            alt="User_Photo"
          />
        </div>

        <h3 className="text-white">Register Form</h3>

        <div style={{ margin: "3rem 0rem" }}>
          <div className="row ps-4" style={{ width: "100%" }}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <form onSubmit={handleRegister}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-dark"
                    id="floatingInput"
                    placeholder="Name"
                    required
                    name="name"
                    onChange={handleRegisterChange}
                  />
                  <label for="floatingInput">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control text-dark"
                    id="floatingInput"
                    placeholder="Email"
                    name="email"
                    onChange={handleRegisterChange}
                  />
                  <label for="floatingInput">Email</label>
                </div>

                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control text-dark"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    name="password"
                    onChange={handleRegisterChange}
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <div style={{ marginTop: "2rem" }} className="text-start">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ padding: "0.5rem 3rem" }}
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="text-start mt-3 text-white">
                <p>
                  Already have an acount?
                  <span
                    style={{ paddingLeft: "10px", cursor: "pointer" }}
                    onClick={() => navigate(`/login`)}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;