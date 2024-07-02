import React from "react";
import useFirebase from "../../Hooks/useFirebase";

const UserProfile = () => {
  const { userInfo } = useFirebase();
  return (
    <>
      <div style={{ margin: "1rem 1rem 1rem 0rem" }}>
        <h3 className="text-white">Uesr Profile</h3>

        <div className="text-white text-center" style={{ margin: "8rem 0rem" }}>
          <div className="text-center mb-4">
            <img
              style={{ width: "150px", borderRadius: "50%" }}
              src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
              alt="User_Photo"
            />
          </div>
          <h3 style={{ color: "#20c997" }}>{userInfo.displayName}</h3>
          <h5 style={{ color: "#ccc" }}>{userInfo.email}</h5>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
