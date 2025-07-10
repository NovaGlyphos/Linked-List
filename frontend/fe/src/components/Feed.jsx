import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store)=>store.feed);   //accesing the feed slice from store : null
  const dispatch = useDispatch();  //redux store mai data update krne ke liye action bhej rha hai to the store inside dispatch
  // 1.useDispatch() se hame dispatch mila
  // 2.dispatch() se hamne redux store mai action bheja
  // 3.Redux reducer uss action ke according state badal deta hai
  // feed => null
  const getFeed = async () => {
    try {
      //If our feed is there dont make an api call
      if(feed) return 
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res?.data?.userData));   // feed = [{}.{}.{}.{}]
      console.log("Test 1")
      console.log("This is type of "+feed);
      console.log("Test 2")
    } 
    catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
  console.log("Updated feed:", feed);
}, [feed]);
  

// dont render until feed is not null
  return feed && (<div className="flex justify-center mt-6"> 
    <UserCard user={feed[0]} /> 
  </div>);
};

export default Feed;
