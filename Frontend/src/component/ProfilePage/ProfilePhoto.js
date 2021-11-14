import React, { useState } from "react";
import { Row, Image, Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import ProfilePhotoUpdateModal from "./ProfilePhotoUpdateModal";
import "./style.css";

export default function ProfilePage({ profileData, setProfileData }) {
  console.log(profileData);
  const [showModal, setShowModal] = useState(false);
  const isSelf = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))?.uid === profileData._id
    : false;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <Row className="profile-photo-container">
      <ProfilePhotoUpdateModal
        showModal={showModal}
        handleHideModal={handleHideModal}
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <Image
        className="profile-photo"
        src={profileData.photo}
        roundedcircle="true"
      />
      {isSelf ? (
        <Button className="profile-photo-button" onClick={handleShowModal}>
          <Row>
            <FaCamera size={25} style={{ margin: "0 auto" }} />
          </Row>
          <Row>
            <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Change Photo</h5>
          </Row>
        </Button>
      ) : null}
    </Row>
  );
}
