import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const userConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection",{
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    userConnection();
  }, []);

  if (!connections) return <div className="text-center mt-4">Loading...</div>;

  if (connections.length === 0)
    return (
      <h1 className="text-2xl mt-3 text-bold flex justify-center gap-2 ">
        <div>
          <span className="text-lime-400">N</span>o{" "}
        </div>
        <div>
          <span className="text-teal-400">C</span>onnections{" "}
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
          <span className="text-cyan-400">C</span>onnections
        </div>
      </h1>
      <ul  className="list bg-base-100 rounded-box shadow-md mx-56">
        {connections.map((connection) => {
          console.log(connection.fromUser.firstName);
          return (
            <li key={connection.fromUser._id} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={connection.fromUser.photoUrl}
                />
              </div>
              <div>
                <div>
                  {connection.fromUser.firstName +
                    " " +
                    connection.fromUser.lastName}
                </div>
              </div>
              <p className="list-col-wrap text-xs">
                {connection.fromUser.about}
              </p>
              <button className="btn btn-square btn-ghost">
                🚀
              </button>
              
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
