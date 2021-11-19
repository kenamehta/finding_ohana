import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button } from "react-bootstrap";
import { Container, Form } from "react-bootstrap";
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import "../style.css";
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

const onShare = () => {
  axios.post(`${base}/post/${authUser.uid}`).then((response) => {
    if (response.status === 200) {
      const data = response.data.payload;
    }
  });
};

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Container className={classes.root} align="center">
      <Card border="light" className="mt-4 card-style">
        <Card.Header as="h5">What's on your mind</Card.Header>
        <Form className="mr-3 ml-3 mt-3">
          <Form.Group>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>
        </Form>
        <Button
          className="form-control mr-3 ml-3 mb-3"
          size="small"
          onClick={onShare}
        >
          Share
        </Button>
      </Card>

      <h3 className="m-4">Recent Posts</h3>
      <Card className="m-4 comment-out">
        <div className="d-flex">
          <div className="col-3">
            <CardMedia
              className={classes.media}
              image={"https://randomuser.me/api/portraits/men/32.jpg"}
            />
          </div>
          <div className="col-7">
            <CardHeader
              title="Volleball Game today!!!"
              subheader="We are a group of 5 looking for more people to join us on weekend volleball games."
              className="comment-name"
            />
          </div>
        </div>
      </Card>
    </Container>
  );
}
