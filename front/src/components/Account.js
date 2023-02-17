import React from 'react'
import Loader from './FrontEndUtils/Loader';
import { useState } from 'react';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';
import { useNavigate } from 'react-router-dom';
import AlertComp from './AlertComp';
function Account({ user, loading }) {
  
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [changePasswordToggle, setChangePasswordToggle] = useState(false);
  const navigate =   useNavigate();
  return (
    <>
      
      {openAlert && <AlertComp message={msg} msgType={"success"} openAlert={setOpenAlert}/>}
      {loading ? <Loader /> : <>
        {changePasswordToggle ? <div className='container'> <UpdatePassword open={setOpenAlert} alertmsg={setMsg} setTogg={setChangePasswordToggle}/> </div>:
          <div className="profileContianer container">
            <div className="profileAcc">
              <img src={user.avatar ? user.avatar.url : "/profile.jpg"} alt="no img" />
              <button className='editBtn' onClick={() => setEditToggle(!editToggle)} >{!editToggle ? "Edit Profile" : "Cancel Edit"}</button>
            </div>
            <div className="profileAccDetails">
              {editToggle ? <UpdateProfile userData={user ? user : {}}  setTogg={setEditToggle} open={setOpenAlert} alertmsg={setMsg}/> : <>
                <div className="profileDetail">
                  <h3>Full Name :</h3>
                  <h4>{user && user.name}</h4>
                </div>
                <div className="profileDetail">
                  <h3>Email:</h3>
                  <h4>{user && user.email}</h4>
                </div>
                <div className="profileDetail">
                  <h3>Joined At:</h3>
                  <h4>{user.createdAt && user.createdAt.substring(0, 10)}</h4>
                </div>
                <div className="profileDetail">
                  <button onClick={()=>navigate("/myorders")}>My Order's</button>
                </div>
                <div className="profileDetail">
                  <button onClick={()=>setChangePasswordToggle(!changePasswordToggle)}>Change Password</button>
                </div></>}
            </div>
          </div>
        }

      </>}
    </>
  )
}

export default Account