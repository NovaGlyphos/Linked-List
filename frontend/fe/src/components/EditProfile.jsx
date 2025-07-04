import React, { useState } from "react";
import UserContext from "../utils/UserContext";
import Preview from "./Preview";
import axios from "axios"
import {BASE_URL} from "../utils/constants"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
  const dispatch = useDispatch();
  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName);
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
  const [age,setAge] = useState(user.age);
  const [gender,setGender] = useState(user.gender);
  const [about,setAbout] = useState(user.about);
  const [error,setError] = useState("")

  const saveProfile = async () => {
    try{
      const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials:true});
      dispatch(addUser(res.data))
    }
    catch(err){
      setError(err.message)
      console.log(err)
    }
  }

  return (
    <UserContext.Provider value={{
      firstName,
      lastName,
      photoUrl,
      age,
      about,
      gender,
      setFirstName,
      setLastName,
      setPhotoUrl,
      setGender,
      setAge,
      setAbout
    }}>

    <div className="  mb-10">
      <div className="card card-border bg-black w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            Edit Profile
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">First Name</legend>
            <input type="text" className="input card-border" value={firstName} onChange={(e)=>{
              setFirstName(e.target.value);
            }}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Last Name</legend>
            <input type="text" className="input card-border" value={lastName} onChange={(e)=>{
              setLastName(e.target.value);
            }}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Photo Url</legend>
            <input type="text" className="input card-border" value={photoUrl} onChange={(e)=>{
              setPhotoUrl(e.target.value);
            }}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Age</legend>
            <input type="number" className="input card-border" value={age} onChange={(e)=>{
              setAge(e.target.value);
            }}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Gender</legend>
            <input type="text" className="input card-border" value={gender} onChange={(e)=>{
              setGender(e.target.value);
            }}/>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">About</legend>
            <input type="text" className="input card-border" value={about} onChange={(e)=>{
              setAbout(e.target.value);
            }}/>
          </fieldset>
          <p className="text-red-700">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-black card-border" onClick={()=>{
              saveProfile();
            }}>Edit</button>
          </div>
        </div>
      </div>
    </div>
    
      <Preview/>
    </UserContext.Provider>
  );
};

export default EditProfile;
