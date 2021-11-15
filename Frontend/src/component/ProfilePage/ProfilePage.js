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

  const updateDetails = (fieldName, value) => {
    let data = {};
    if (fieldName === "hobby" || fieldName === "interest") {
      data[fieldName] = value.split(",");
    } else {
      data[fieldName] = value;
    }
    axios
      .post(base + `/profile/updateDetails/${profileData._id}`, data)
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.payload);
        }
      });
  };
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
          <Card border="light" className="card-style pt-3 pb-3">
            <ProfilePhoto
              isSelf={isSelf}
              profileData={profileData}
              setProfileData={setProfileData}
            />
            <Row align="center">
              <Col className="large-block">{profileData.name}</Col>
            </Row>
            <EditableData
              fieldName="age"
              updateDetails={updateDetails}
              attribute="Age"
              data={profileData.age}
              isSelf={isSelf}
            />
            <EditableData
              fieldName="pronoun"
              updateDetails={updateDetails}
              attribute="Pronouns"
              data={profileData.pronoun}
              isSelf={isSelf}
            />
            <EditableData
              fieldName="hobby"
              updateDetails={updateDetails}
              attribute="Hobbies"
              data={hobbies}
              isSelf={isSelf}
            />
            <EditableData
              fieldName="interest"
              updateDetails={updateDetails}
              attribute="Interests"
              data={interests}
              isSelf={isSelf}
            />
          </Card>
        </Col>
        <Col sm={8} className="scrollable-column">
          <Card border="light" className="p-3 card-style">
            <Row>
              <EditableData
                fieldName="bio"
                updateDetails={updateDetails}
                attribute="About me"
                data={profileData.bio}
                isSelf={isSelf}
              />
            </Row>
            <Row>
              {profileData.post?.map((post) => (
                <></>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
