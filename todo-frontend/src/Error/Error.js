import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  return (
    <>
      <div style={{ margin: "6rem auto" }}>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 text-center">
            <img
              src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
              alt="error-image"
              style={{
                borderRadius: "10px",
                margin: "3rem auto",
                height: "400px",
              }}
            />{" "}
            <br />
            <button
              type="button"
              className="btn btn-info"
              onClick={handleDashboard}
            >
              Back Dashboard
            </button>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
        </div>
      </div>
    </>
  );
};

export default Error;
