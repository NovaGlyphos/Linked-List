import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("ayush@gmail.com");
  const [password, setPassword] = useState("Test@12345");
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center mt-24">
      <div className="card card-border bg-slate-900 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Email</legend>
            <input
              type="email"
              className="input card-border"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
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
              }}
            />
          </fieldset>
          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-black card-border"
              onClick={async () => {
                //onclick of login button make an API call to /login
                try {
                  const res = await axios.post("http://localhost:3000/login", {
                    emailId: emailId,
                    password: password,
                  },{withCredentials:true});
                  console.log(res.data)
                  dispatch(addUser(res.data))
                } catch (err) {
                  console.log(err.message);
                }
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
