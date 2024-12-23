import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password changed successfully");
        }
      });
  };

  return (
    <div>
      <h1>Change Your Password</h1>
      <form onSubmit={changePassword}>
        <input
          type="password"
          placeholder="Old Password..."
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="New Password..."
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;