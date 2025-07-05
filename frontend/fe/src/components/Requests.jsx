import React, { useEffect } from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';


const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store)=>store.request)
  const getRequest = async ()=>{
    try{
      const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
      dispatch(addRequest(res.data.connectionReceived));
    }
    catch(err){
      console.log(err.message);
    }
  }
  useEffect(()=>{
    getRequest();
  },[]);

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
            <li key={req.fromUserId._id} className="list-row">
              <div>
                <div>
                  {req.fromUserId.firstName +
                    " " +
                    req.fromUserId.lastName}
                </div>
              </div>
              {/* <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


export default Requests;
