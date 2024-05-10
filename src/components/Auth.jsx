import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./Auth.css";
import { useFormik } from "formik";
import axios from "axios";

export default function Auth(props) {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("social_auth_type", "normal");
      console.log(formData);
      const response = await axios.post(
        "https://sandbox.practical.me/api/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("message ===", response.data.message);
      console.log("message ===", response.data.data);
      props.user(response.data.data);
      alert(response.data.message);
    },
  });

  return (
    <div className="auth-page">
      <div>
        {showLogin ? (
          <div className="sign-up">
            <h2>Sign Up</h2>
          </div>
        ) : (
          <div className="log-in">
            <h2>Log In Here</h2>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.email}
                label="email"
                name="email"
                variant="outlined"
              />
              <TextField
                onChange={formik.handleChange}
                value={formik.values.password}
                label="password"
                name="password"
                type="password"
                variant="outlined"
              />
              <Button type="submit" variant="contained">
                Log In
              </Button>
            </form>
          </div>
        )}
      </div>
      {showLogin ? (
        <h3>
          Already Registered? <button onClick={handleShowLogin}>Login</button>
        </h3>
      ) : (
        <h3>
          New User? <button onClick={handleShowLogin}>Sign Up</button>
        </h3>
      )}
    </div>
  );
}
