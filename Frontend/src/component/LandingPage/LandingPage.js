import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, Container, Form } from "react-bootstrap";
import CardMedia from "@material-ui/core/CardMedia";
import "./style.css";
import axios from "axios";
import { base } from "../../config/address";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 140,
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
  const classes = useStyles();
  const onShare = (e) => {
    e.preventDefault();
    axios
      .post(`${base}/post/${authUser.uid}`, { newPostContent })
      .then((response) => {
        if (response.status === 200) {
          const recommendedPosts = response.data.payload;
          setNewPostContent("");
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
            className="form-control share-button"
            size="small"
            onClick={onShare}
          >
            Share
          </Button>
        </Card.Body>
      </Card>

      <h3 className="mt-4 large-block">Posts you might be interested in...</h3>
      <Card className="card-style mt-3">
        <div className="d-flex">
          <div className="col-3">
            <CardMedia
              className={classes.media}
              image={"https://randomuser.me/api/portraits/men/32.jpg"}
            />
          </div>
          <div className="col-7">
            {/* <CardHeader
              title="Volleball Game today!!!"
              subheader="We are a group of 5 looking for more people to join us on weekend volleball games."
              className="comment-name"
            /> */}
          </div>
        </div>
      </Card>
    </Container>
  );
}
