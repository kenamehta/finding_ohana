import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Container, Form } from "react-bootstrap";
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  margin_card_top: {
    marginTop: 100,
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
  console.log(currentTalkjsUser);
  localStorage.setItem("currentTalkjsUser", JSON.stringify(currentTalkjsUser));
}

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Container className="justify-content-md-center" align="center">
      {/* <Row className="justify-content-md-center"> */}

      <Card
        className={(classes.root, classes.margin_card_top)}
        variant="outlined"
      >
        <CardHeader
          title="What's on your mind"
          subheader="Update your feed with recent activities"
        />
        <Form className="">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
        <CardActionArea>
          {/* <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent> */}
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>

      <h3 className="m-4">Recent Posts</h3>
      <Card className="m-4 comment-out">
        <div className="d-flex">
          <div className="col-3">
            <CardMedia
              className={classes.media}
              image={
                "https://randomuser.me/api/portraits/men/32.jpg"
              }
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
