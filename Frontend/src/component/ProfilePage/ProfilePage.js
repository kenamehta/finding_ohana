import React, { useEffect, useState } from "react";
import { base } from "../../config/address";
import axios from "axios";
import { Col, Container, Row, Card } from "react-bootstrap";
import ProfilePhoto from "./ProfilePhoto";
import "./style.css";
import EditableData from "./EditableData";
import { stringFromValues } from "./util";

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
  //   const isSelf = false;
  const isSelf = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.uid === profileData._id
    : false;
  const interests = stringFromValues(profileData?.interest ?? []);
  const hobbies = stringFromValues(profileData?.hobby ?? []);
  return (
    <Container className="pt-5" align={isSelf ? "left" : "center"}>
      <Row>
        <Col sm={4}>
          <Card border="light" className="p-3 card-style">
            <ProfilePhoto
              isSelf={isSelf}
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <EditableData
              attribute="Name"
              data={profileData.name}
              isSelf={isSelf}
              blockSize="large-block"
            />
            <EditableData
              attribute="Age"
              data={profileData.age}
              isSelf={isSelf}
              blockSize="medium-block"
            />
            <EditableData
              attribute="Pronouns"
              data={profileData.pronoun}
              isSelf={isSelf}
              blockSize="medium-block"
            />
            <EditableData
              attribute="Hobbies"
              data={hobbies}
              isSelf={isSelf}
              blockSize="medium-block"
            />
            <EditableData
              attribute="Interests"
              data={interests}
              isSelf={isSelf}
              blockSize="medium-block"
            />
          </Card>
        </Col>
        <Col sm={8}></Col>
      </Row>
    </Container>
  );
}
