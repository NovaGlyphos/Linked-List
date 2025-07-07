import React from "react";
import axios from "axios"
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const loggedInUser = useSelector((store)=>store.user);
  console.log("Logged In user Id"+loggedInUser._id);

  console.log(user)
    const {_id,firstName,lastName,age,gender,about,photoUrl} = loggedInUser;
    console.log(_id);
    const dispatch = useDispatch();
    const handleSendRequest = async (status,userId) => {
      try{
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
        console.log(res.data);
        dispatch(removeUserFromFeed(userId))
      }
      catch(err){
        console.log(err.message)
      }
    }
    if(loggedInUser.length === 0) {
      return (
      <h1 className="text-2xl mt-3 text-bold flex justify-center gap-2 ">
        <div>
          <span className="text-lime-400">N</span>o{" "}
        </div>
        <div>
          <span className="text-teal-400">U</span>ser{" "}
        </div>
        <div>
          <span className="text-red-400">F</span>ound
        </div>
      </h1>
    );
    }
  // console.log(user);
  return (
    <div>
      <div className="card bg-black w-96 shadow-sm p-2">
        <figure>
          <img className="pt-3"
            src={photoUrl}
            alt="user-photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center">{firstName+" "+lastName}</h2>
          {age &&gender && <p className="flex justify-center">{age+","+gender}</p>}
          <p className="flex justify-center">{about}</p>
          <div className="card-actions justify-between mt-2">
            <button className="btn btn-primary ml-14" onClick={()=>{
              handleSendRequest("ignore",_id)
            }}>Ignore</button>
            <button className="btn btn-secondary mr-14" onClick={()=>{
              handleSendRequest("interested",_id);
            }}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
