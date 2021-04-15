import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../UserContext";

import { useProfileVisual } from "../../hooks/useProfileVisual"
import CreateListingsBtn from "./CreateListingsBtn";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileInfoEditCard from "./ProfileInfoEditCard";
import ProfileImage from "./ProfileImage";

const SHOW = "SHOW";
const EDIT = "EDIT";


export default function ProfileView(props) {
  const {user, setUser} = useContext(UserContext)

  const { mode, transition, back } = useProfileVisual("SHOW");
  

  // const [currentUser, setCurrentUser] = useState({

  // })

  console.log(user);

  // useEffect(() => {

  // }, [currentUser])
  
  
  return (
    <>
      <ProfileImage user_id={user[0]} />
      { mode === SHOW && <ProfileInfoCard user={user} />}
      { mode === EDIT && <ProfileInfoEditCard user={user} />}
      <CreateListingsBtn />
    </>
  )
}