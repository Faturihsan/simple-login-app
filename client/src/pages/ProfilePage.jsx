import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    fetch(`http://localhost:3000/profile/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Succesfully Deleted!")
          navigate("/signup"); 
        } else {
          console.error("Error deleting the account");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <main className="grid w-full h-[100vh] bg-[#1A1818] place-items-center">
        <div className="flex flex-col items-center justify-center gap-4 text-white">
          <p className="text-4xl font-semibold">User Profile</p>
          <div className="border border-white p-4 rounded-md">
            <p>
              <span className="font-semibold">Username:</span>{" "}
              {userData.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Password:</span>{" "}
              {userData.password}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {userData.gender}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              {userData.phoneNumber}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Link to="/edit-profile" className="text-[#9C9837] mt-4">
              Edit Profile
            </Link>
            <button className="text-[#9C9837] mt-4" onClick={handleDeleteAccount}>Delete</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
