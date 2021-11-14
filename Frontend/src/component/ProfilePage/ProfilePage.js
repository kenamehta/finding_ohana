import React, { useEffect, useState } from "react";
import { base } from "../../config/address";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import ProfilePhoto from "./ProfilePhoto";
import "./style.css";

export default function ProfilePage(props) {
  const userID = props.match.params.userID;
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    axios.get(base + `/profile/${userID}`).then((response) => {
      if (response.status === 200) {
        if (
          response.data.payload.photo &&
          response.data.payload.photo.length > 0
        )
          setProfileData(response.data.payload);
        else
          setProfileData({
            ...response.data.payload,
            photo: `${base}/default.png`,
          });
      }
    });
  }, [userID]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <ProfilePhoto
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </Col>
        <Col sm={8}></Col>
      </Row>
    </Container>
  );
}
