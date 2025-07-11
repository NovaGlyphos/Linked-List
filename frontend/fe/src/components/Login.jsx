import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate,Link} from "react-router-dom"
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("ayush@gmail.com");
  const [password, setPassword] = useState("Test@12345");
  const [error,setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center mt-20">
      <div className="card card-border bg-black w-96 h-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mt-3 mb-4">Login</h2>
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
          <p className="flex justify-center text-red-700 font-bold text-base mt-1">{error}</p>
          <div className="card-actions justify-center mb-1">
            <button
              className="btn btn-black card-border"
              onClick={async () => {
                //onclick of login button make an API call to /login
                try {
                  const res = await axios.post(BASE_URL+"/login", {
                    emailId,
                    password
                  },{withCredentials:true});
                  // console.log(res.data)
                  dispatch(addUser(res.data));
                  return navigate("/");
                } catch (err) {
                  // console.log(err)
                  setError(err?.response?.data || "Something went wrong")
                }
              }}
            >
              Login
            </button>
          </div>
          
            <p className="flex justify-center mt-3 font-medium">Not Registered ? <Link to='/signup'><span className="ml-1 text-green-600 cursor-pointer"> Create an account</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
