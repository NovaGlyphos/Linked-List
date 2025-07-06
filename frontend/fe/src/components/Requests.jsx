import React, { useEffect } from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const handleRequest = async (status,id) => {
    const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true});
    console.log(res.data);
  }
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.connectionReceived));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getRequest();
  }, []);

  if (!requests) return <div className="text-center mt-4">Loading...</div>;

  if (requests.length === 0)
    return (
      <h1 className="text-2xl mt-3 text-bold flex justify-center gap-2 ">
        <div>
          <span className="text-lime-400">N</span>o{" "}
        </div>
        <div>
          <span className="text-teal-400">R</span>equests{" "}
        </div>
        <div>
          <span className="text-red-400">F</span>ound
        </div>
      </h1>
    );

  return (
    <div>
      <h1 className="text-2xl mt-3 font-black flex justify-center gap-2 mb-4">
        <div>
          <span className="text-lime-400">M</span>y{" "}
        </div>
        <div>
          <span className="text-cyan-400">R</span>equests
        </div>
      </h1>
      <ul className="list bg-base-100 rounded-box shadow-md mx-96">
        {requests.map((req) => {
          return (
            <li key={req.fromUserId._id} className="list-row flex justify-around">
              <div>
                <div>
                  {req.fromUserId.firstName + " " + req.fromUserId.lastName}
                </div>
              </div>
              <div>
                <button className="btn btn-circle" onClick={()=>handleRequest("rejected",req._id)}>
                  ❌
                </button>
                <button className="btn btn-circle" onClick={()=>handleRequest("accepted",req._id)}>
                  ✔
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
