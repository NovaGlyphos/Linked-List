import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store)=>store.feed)   //accesing the feed slice from store : null
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if(feed) return //If our feed is there dont make an api call
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.userData));
      console.log(feed);
    } 
    catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
// dont render until feed is not null
  return feed && (<div className="flex justify-center mt-6"> 
    <UserCard user={feed[2]} />
  </div>);
};

export default Feed;
