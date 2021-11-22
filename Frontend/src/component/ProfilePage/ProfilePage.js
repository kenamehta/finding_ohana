import React, { useEffect, useState } from "react";
import { base } from "../../config/address";
import axios from "axios";
import { Col, Container, Row, Card, Image } from "react-bootstrap";
import ProfilePhoto from "./ProfilePhoto";
import "./style.css";
import EditableData from "./EditableData";
import { stringFromValues, getPostDate } from "./util";
import { AiFillDelete, AiOutlineRead } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProfilePage(props) {
  const userID = props.match.params.userID;
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    axios.get(base + `/profile/${userID}`).then((response) => {
      if (response.status === 200) {
        if (
          response.data.payload.photo &&
          response.data.payload.photo.length > 0
        ) {
          setProfileData(response.data.payload);
        } else {
          setProfileData({
            ...response.data.payload,
            photo: `${base}/default.png`,
          });
        }
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
          setProfileData(profileData);
        }
      });
  };
  //   const isSelf = false;
  const isSelf = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.uid === profileData._id
    : false;
  const interests = stringFromValues(profileData?.interest ?? []);
  const hobbies = stringFromValues(profileData?.hobby ?? []);

  const onDeletePost = (postID) => {
    axios
      .post(`${base}/profile/deletePost/${profileData._id}`, { postID })
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.payload);
        }
      });
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col md={4}>
          <Row>
            <Card
              border="light"
              className="profile-photo-card card-style pt-3 pb-3"
            >
              <ProfilePhoto
                isSelf={isSelf}
                profileData={profileData}
                setProfileData={setProfileData}
              />
              <Row align="center">
                <Col className="large-block">{profileData.name}</Col>
              </Row>
            </Card>
          </Row>
          <Row align="center" className="mt-3">
            <Col md={4}></Col>
            {isSelf ? null : (
              <Col md={4} className="x-small-block request-button">
                Send Request
              </Col>
            )}
          </Row>
          <Row>
            <Card
              border="light"
              className="details-card card-style pt-3 pb-3 mt-3"
            >
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
          </Row>
        </Col>
        <Col md={8} className="scrollable-column">
          <Row>
            <Card border="light" className="about-card  p-3 card-style">
              <EditableData
                fieldName="bio"
                updateDetails={updateDetails}
                attribute="About me"
                data={profileData.bio}
                isSelf={isSelf}
              />
            </Card>
          </Row>
          <Row className="large-block mt-3">My Posts</Row>
          {!profileData.myPosts || profileData.myPosts.length === 0 ? (
            <>
              <Row className="empty-state">
                <AiOutlineRead size={200} color="darkgrey" />
              </Row>
              <Row className="empty-state large-block">No posts to show!</Row>
              <Row className="empty-state">
                Go to timeline to create a new post
              </Row>
            </>
          ) : (
            profileData.myPosts?.map((post) => (
              <Row key={post._id}>
                <Card className="card-style mt-3 my-post-card">
                  <Row className="py-2 px-3">
                    <Col md={2}>
                      <Image
                        className="post-photo"
                        src={profileData.photo}
                        roundedcircle="true"
                      />
                    </Col>
                    <Col md={isSelf ? 9 : 10}>
                      <Row className="post-user-name large-block">
                        <Link to={"/profile/" + profileData._id}>
                          {profileData.name}
                        </Link>
                      </Row>
                      <Row className="small-block">{post.content}</Row>
                      <Row className="footer-block">
                        {getPostDate(post.createdAt)}
                      </Row>
                    </Col>
                    {isSelf ? (
                      <Col md={1}>
                        <AiFillDelete
                          className="delete-button"
                          onClick={() => onDeletePost(post._id)}
                        />
                      </Col>
                    ) : null}
                  </Row>
                </Card>
              </Row>
            ))
          )}
          {/* {profileData.myPosts?.map((post) => (
            <Row key={post._id}>
              <Card className="card-style mt-3 my-post-card">
                <Row className="py-2 px-3">
                  <Col md={2}>
                    <Image
                      className="post-photo"
                      src={profileData.photo}
                      roundedcircle="true"
                    />
                  </Col>
                  <Col md={isSelf ? 9 : 10}>
                    <Row className="post-user-name large-block">
                      <Link to={"/profile/" + profileData._id}>
                        {profileData.name}
                      </Link>
                    </Row>
                    <Row className="small-block">{post.content}</Row>
                    <Row className="footer-block">
                      {getPostDate(post.createdAt)}
                    </Row>
                  </Col>
                  {isSelf ? (
                    <Col md={1}>
                      <AiFillDelete
                        className="delete-button"
                        onClick={() =>
                          onDeletePost(profileData.userID, post._id)
                        }
                      />
                    </Col>
                  ) : null}
                </Row>
              </Card>
            </Row>
          ))} */}
        </Col>
      </Row>
    </Container>
  );
}
