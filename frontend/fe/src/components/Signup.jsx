import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center">
        <div className="card card-border bg-black w-96">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mt-3 mb-4">
              Sign Up
            </h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">First Name</legend>
              <input
                type="text"
                className="input card-border"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  console.log(typeof firstName);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">Last Name</legend>
              <input
                type="text"
                className="input card-border"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  console.log(typeof lastName);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">Email</legend>
              <input
                type="email"
                className="input card-border"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(typeof email);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base">Password</legend>
              <input
                type="password"
                className="input card-border"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(typeof password);
                }}
              />
            </fieldset>
            <p className="flex justify-center text-red-700 font-bold text-base mt-1">
              {error}
            </p>
            <div className="card-actions justify-center mb-1">
              <button
                className="btn btn-black card-border"
                onClick={async () => {
                  //onclick of login button make an API call to /login
                  try {
                    const res = await axios.post(
                      BASE_URL + "/signup",
                      {
                        firstName,
                        lastName,
                        emailId:email,
                        password,
                      },
                      { withCredentials: true }
                    );
                    // console.log(res.data)
                    dispatch(addUser(res.data.data));
                    return navigate("/profile");
                  } catch (err) {
                    // console.log(err)
                    setError(err?.response?.data || "Something went wrong");
                  }
                }}
              >
                Sign Up
              </button>
            </div>
            <p className="flex justify-center mt-3 font-medium">
              Already have an account ?{" "}
              <Link to="/login">
                <span className="ml-1 text-green-600 cursor-pointer">
                  {" "}
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
