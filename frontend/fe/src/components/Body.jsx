import axios from 'axios'
import Footer from './Footer'
import NavBar from './NavBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);
  // If the token is present I will try to get the profile of the user 
  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      // console.log(res.data);
      dispatch(addUser(res.data));
      
    }
    catch(err){
      //agar muje koi user nhi mila iska matlab hai ki token mai problem hai kuki
      //hamne backend ke code ko achi se sanitize kia hua hai
      if(err.status === 401){
        navigate("/login")
      }
      console.error(err.message);
    }
  }

  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
  },[]);

  return (
    <div>
        <NavBar/>
        <Outlet/>
        {/* <Footer/> */}
    </div>
  )
}

export default Body