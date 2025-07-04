import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import Preview from './Preview'

const Profile = () => {
  const user = useSelector(store => store.user)
  return user && (
    <div className="flex justify-center gap-20 mt-5">
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile