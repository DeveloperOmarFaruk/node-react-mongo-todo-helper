import React from "react";
import useFirebase from "../../Hooks/useFirebase";

const ForgotPassword = () => {
  const { handlePasswordReset, setResetEmail } = useFirebase();
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

        <h3 className="text-white">Forgot Password</h3>

        <div style={{ margin: "3rem 0rem" }}>
          <div className="row ps-4" style={{ width: "100%" }}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <form onSubmit={handlePasswordReset}>
                <div className="form-floating mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control text-dark"
                      id="floatingPassword"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <label for="floatingPassword">Email</label>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }} className="text-start">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{ padding: "0.5rem 3rem" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
