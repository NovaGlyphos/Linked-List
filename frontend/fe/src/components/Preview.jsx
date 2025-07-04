import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Preview = () => {
    const user = useContext(UserContext);
    const {firstName,lastName,age,gender,photoUrl,about} = user;
  return (
    <div>
      <div className="card bg-black w-96 shadow-sm p-2">
        <figure>
          <img className="pt-2"
            src={photoUrl}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center">{firstName+" "+lastName}</h2>
          {age &&gender && <p className="flex justify-center">{age+","+gender}</p>}
          <p className="flex justify-center">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
