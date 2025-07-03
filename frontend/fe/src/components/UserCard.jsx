import React from "react";

const UserCard = ({ user }) => {
    const {firstName,lastName,age,gender,about,photoUrl} = user;
  console.log(user);
  return (
    <div>
      <div className="card bg-black w-96 shadow-sm p-2">
        <figure>
          <img className="rounded-full"
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center">{firstName+" "+lastName}</h2>
          {age &&gender && <p className="flex justify-center">{age+","+gender}</p>}
          <p className="flex justify-center">{about}</p>
          <div className="card-actions justify-between mt-2">
            <button className="btn btn-primary ml-14">Ignore</button>
            <button className="btn btn-secondary mr-14">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
