import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { base } from "../../config/address";

export default function ProfilePhotoUpdateModal({
  showModal,
  handleHideModal,
  profileData,
  setProfileData,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
          }
        });
      handleHideModal();
    }
  };

  return (
    <Modal show={showModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          onChange={fileUploadHandler}
          type="file"
          name="profilePicture"
          id="profilePicture"
          accept="image/*"
        />
        <p className="errormessage">{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancel" onClick={handleHideModal}>
          Close
        </Button>
        <Button className="save" onClick={onUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
