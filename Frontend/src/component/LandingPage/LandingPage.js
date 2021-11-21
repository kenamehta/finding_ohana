import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import "./style.css";
import axios from "axios";
import { base } from "../../config/address";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
});
const authUser = JSON.parse(localStorage.getItem("user"));
if (authUser) {
  let currentTalkjsUser = {
    name: authUser.displayName,
    email: authUser.email,
    photoUrl: authUser.photoURL,
    id: authUser.uid,
  };
  localStorage.setItem("currentTalkjsUser", JSON.stringify(currentTalkjsUser));
}

export default function MediaCard() {
  const [newPostContent, setNewPostContent] = useState("");
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const classes = useStyles();

  const onShare = (e) => {
    e.preventDefault();
    setIsPosting(true);
    axios
      .post(`${base}/post/${authUser.uid}`, { newPostContent })
      .then((response) => {
        if (response.status === 200) {
          const recommendedPosts = response.data.payload.recommendedPosts;
          setRecommendedPosts(recommendedPosts);
          setNewPostContent("");
          setIsPosting(false);
        }
      });
  };

  const onChangeNewPostContent = (e) => {
    setNewPostContent(e.target.value);
  };

  return (
    <Container className={classes.root}>
      <Card border="light" className="mt-4 card-style">
        <Card.Header as="h5" className="card-header-style large-block">
          What's on your mind?
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={2}
                value={newPostContent}
                onChange={onChangeNewPostContent}
              />
            </Form.Group>
          </Form>
          <Button
            className={
              "form-control share-button large-block" +
              (isPosting ? " disabled-button" : "")
            }
            size="small"
            onClick={onShare}
            disabled={isPosting}
          >
            Share
          </Button>
        </Card.Body>
      </Card>

      <h3 className="mt-4 large-block">Posts you might be interested in...</h3>
      {recommendedPosts.map((post) => null)}
      <Card className="card-style mt-3">
        <Row className="py-3 px-4">
          <Col md={2}>
            <Image
              className="post-photo"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              roundedcircle="true"
            />
          </Col>
          <Col md={10}>
            <Row className="large-block">John Doe</Row>
            <Row className="small-block">Volleyball at SJSU court anyone?</Row>
          </Col>
        </Row>
      </Card>
      <Card className="card-style mt-3">
        <Row className="py-3 px-4">
          <Col md={2}>
            <Image
              className="post-photo"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              roundedcircle="true"
            />
          </Col>
          <Col md={10}>
            <Row className="large-block">John Doe</Row>
            <Row className="small-block">Volleyball at SJSU court anyone?</Row>
          </Col>
        </Row>
      </Card>
      <Card className="card-style mt-3">
        <Row className="py-3 px-4">
          <Col md={2}>
            <Image
              className="post-photo"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              roundedcircle="true"
            />
          </Col>
          <Col md={10}>
            <Row className="large-block">John Doe</Row>
            <Row className="small-block">Volleyball at SJSU court anyone?</Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
