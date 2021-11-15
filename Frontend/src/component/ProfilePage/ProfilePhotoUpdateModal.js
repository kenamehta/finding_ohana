import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal, Form, Button, Image, Col } from "react-bootstrap";
import { base } from "../../config/address";
import { StoreContext } from "../../context/store";

export default function ProfilePhotoUpdateModal({
  showModal,
  handleHideModal,
  profileData,
  setProfileData,
  isSelf,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const storeContext = useContext(StoreContext);
  const { dispatch } = storeContext;
  const fileUploadHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const onUpload = (e) => {
    e.preventDefault();
    if (selectedFile === null) {
      setErrorMessage("Please select a file");
    } else {
      const fd = new FormData();
      fd.append("id", localStorage.getItem("ID"));
      fd.append("emailId", localStorage.getItem("emailId"));
      fd.append("file", selectedFile);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(base + `/profile/updatePhoto/${profileData._id}`, fd, config)
        .then((response) => {
          if (response?.status === 200) {
            setProfileData({
              ...profileData,
              photo: response.data.payload.photo,
            });
            dispatch({
              type: "UPDATE_PROFILE_PHOTO",
              value: { profilePhoto: response.data.payload.photo },
            });
            handleHideModal();
          }
        });
    }
  };

  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isSelf ? "Upload Profile Picture" : "Profile Picture"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image className="new-profile-photo center" src={profileData.photo} />
        <p className="errormessage">{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        {isSelf ? (
          <Col>
            <Form.Control
              onChange={fileUploadHandler}
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept="image/*"
            />
          </Col>
        ) : null}
        <Button className="cancel" onClick={handleHideModal}>
          Close
        </Button>
        {isSelf ? (
          <Button className="save" onClick={onUpload}>
            Upload
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}
