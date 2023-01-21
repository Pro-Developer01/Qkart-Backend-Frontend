import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [formDataLogin, setFormDataLogin] = useState({
    username: "",
    password: "",
  });
  const [apiData, setApiData] = useState(null);
  const history = useHistory();

  useEffect(() => {

    if(apiData)
    {
      persistLogin(apiData?.token, apiData?.username, apiData?.balance);
    }
   
  }, [apiData])
  
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formDataLogin
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async () => {
    setLoadingLogin(true);
    if (validateInput(formDataLogin)) {
      axios
        .post(`${config.endpoint}/auth/login`, {
          username: formDataLogin.username,
          password: formDataLogin.password,
        })
        .then((res) => {
          if (res.data.success) {
            enqueueSnackbar("Logged in successfully", { variant: "success" });
            setApiData(res.data);
            console.log("apiData", apiData);
            setLoadingLogin(false);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);

          if (err.response?.status === 400) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
              { variant: "error" }
            );
          }
          setLoadingLogin(false);
        });
    } else {
      setLoadingLogin(false);
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if (!data.username.length) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    } else if (!data.password.length) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {

    localStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
     history.push('/');

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={formDataLogin.username}
            placeholder="Enter Username"
            fullWidth
            onChange={(e) =>
              setFormDataLogin({ ...formDataLogin, username: e.target.value })
            }
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            value={formDataLogin.password}
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) =>
              setFormDataLogin({ ...formDataLogin, password: e.target.value })
            }
          />
          {loadingLogin ? (
            <Button variant="outlined" sx={{ border: "1px solid #00a278" }}>
              <CircularProgress sx={{ color: "#00a278" }} />
            </Button>
          ) : (
            <Button className="button" variant="contained" onClick={login}>
              Login To QKart
            </Button>
          )}
          <p className="secondary-action">
            Don’t have an account?{" "}
            <Link className="link" to="/register">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
