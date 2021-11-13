import React, { useEffect } from "react";
import { base } from "../../config/address";
import axios from "axios";

export default function ProfilePage(props) {
  const userID = props.match.params.userID;
  useEffect(() => {
    axios.get(base + `/profile/${userID}`);
  }, [userID]);
  console.log(props.match.params.userID);
  return <div />;
}
