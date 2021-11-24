import React, { useEffect, useState, useContext } from "react";
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
import { base, pybase } from "../../config/address";
import { getPostDate } from "../ProfilePage/util";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/store";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
});

export default function MediaCard() {
  const [newPostContent, setNewPostContent] = useState("");
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const classes = useStyles();

  const authUser = JSON.parse(localStorage.getItem("user"));
  const storeContext = useContext(StoreContext);
  const { dispatch } = storeContext;

  useEffect(() => {
    axios
      .post(`${pybase}getRecommendedPosts`, { userID: authUser.uid })
      .then((response) => {
        if (response.status === 200) {
          setRecommendedPosts(response.data.recommendedPosts);
        }
      });
  }, [authUser.uid]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("You are in navbar");
      const user = JSON.parse(localStorage.getItem("user"));
      const userID = user.uid;
      const userName = user.displayName;
      const payload = { userID, userName, email: user.email, role: "Member" };
      axios.post(base + "/profile", payload).then((result) => {
        dispatch({
          type: "SET_INITIAL_PROFILE",
          value: {
            userID: result.data.payload._id,
            userName: result.data.payload.name,
            profilePhoto: result.data.payload.photo,
          },
        });
      });
    }
    // eslint-disable-next-line
  }, []);

  const onShare = (e) => {
    e.preventDefault();
    setIsPosting(true);
    axios
      .post(`${base}/post/${authUser.uid}`, { newPostContent })
      .then((response) => {
        if (response.status === 200) {
          const newPost = response.data.payload;
          setRecommendedPosts([newPost, ...recommendedPosts]);
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
      {recommendedPosts.map((post) => (
        <Row key={post._id.$oid}>
          {console.log(post)}
          <Card className="card-style mt-3 my-post-card">
            <Row className="py-2 px-3">
              <Col md={2}>
                <Image
                  className="post-photo"
                  src={post.userID.photo ?? `${base}/default.png`}
                  roundedcircle="true"
                />
              </Col>
              <Col md={10}>
                <Row className="post-user-name large-block">
                  <Link to={"/profile/" + post.userID._id}>
                    {post.userID.name}
                  </Link>
                </Row>
                <Row className="small-block">{post.content}</Row>
                <Row className="footer-block">
                  {getPostDate(post.createdAt.$date)}
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>
      ))}
    </Container>
  );
}
