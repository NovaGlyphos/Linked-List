import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios"
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  // useSelector hook is used to subscribe to the store
  const user = useSelector((store)=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);
  return (
    <div>
      <div className="navbar bg-black shadow-sm h-20">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">TechTribe</Link>
        </div>
        {user && (<div className="flex gap-2 mr-5">
          <div className="dropdown dropdown-end flex items-center gap-6">
            <p>Welcome back {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex"
            >
              
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={async ()=>{
                  try{
                    await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
                    // console.log(res);
                    dispatch(removeUser())
                    navigate('/login') //navigate back to /login
                  }
                  catch(err){
                    console.error(err.message);
                  }
                }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>)}
      </div> 
    </div>
  );
};

export default NavBar;
