import React, { useState } from "react";
import { Row, Image, Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import ProfilePhotoUpdateModal from "./ProfilePhotoUpdateModal";
import "./style.css";

export default function ProfilePage({ isSelf, profileData, setProfileData }) {
  const [showModal, setShowModal] = useState(false);

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
        isSelf={isSelf}
      />
      <Image
        className="profile-photo"
        src={profileData.photo}
        roundedcircle="true"
      />

      <Button
        className={
          "profile-photo-button" +
          (isSelf ? " self-profile-photo" : " other-profile-photo")
        }
        onClick={handleShowModal}
      >
        {isSelf ? (
          <Row>
            <FaCamera size={25} style={{ margin: "0 auto" }} />
          </Row>
        ) : null}
        <Row>
          <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
            {isSelf ? "Change Photo" : "View Photo"}
          </h5>
        </Row>
      </Button>
    </Row>
  );
}
