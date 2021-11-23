import React, { Component } from "react";
import Talk from "talkjs";
import { pybase } from "../../config/address";
import axios from "axios";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { BsFillEnvelopeFill, BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

// BsFillEnvelopeFill
class MyNetwork extends Component {
  constructor(props) {
    super(props);
    let currentUser;
    const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    if (currentTalkjsUser) {
      currentUser = JSON.parse(currentTalkjsUser);
    }
    this.state = {
      currentUser,
      friends: [],
      incomingFriends: [],
    };
  }
  componentWillMount() {
    const currentTalkjsUser = JSON.parse(
      localStorage.getItem("currentTalkjsUser")
    );
    console.log(currentTalkjsUser.id);
    this.getFriends();
    this.getIncomingFriends();
  }
  getIncomingFriends() {
    //get incoming friends
    axios
      .get(`${pybase}getIncomingFriends?userID=${this.state.currentUser.id}`)
      .then((result) => {
        this.setState({ incomingFriends: result.data.payload.friends }, () => {
          console.log(this.state.incomingFriends);
        });
      });
  }
  getFriends() {
    //get friends
    axios
      .get(`${pybase}getFriends?userID=${this.state.currentUser.id}`)
      .then((result) => {
        this.setState({ friends: result.data.payload.friends }, () => {
          console.log(this.state.friends);
        });
      });
  }
  handleClick(userId) {
    console.log(this.state.friends);
    /* Retrieve the two users that will participate in the conversation */
    const { currentUser } = this.state;
    const user = this.state.friends.find((user) => user._id === userId);
    console.log(currentUser);
    console.log(user);
    user["id"] = user._id;
    user["role"] = "Member";
    /* Session initialization code */
    Talk.ready
      .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User(currentUser);
        const other = new Talk.User(user);

        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tAHcnYIL",
            me: me,
          });
        }

        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(
          conversationId
        );

        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  handleAcceptClick(incomingUserId) {
    //accept friend request
    axios
      .get(
        `${pybase}acceptRequest?userID=${this.state.currentUser.id}&friendID=${incomingUserId}`
      )
      .then((result) => {
        this.getFriends();
        this.getIncomingFriends();
      });
  }

  render() {
    return (
      //   <div className="users">
      //     <div className="current-user-container">
      //       {currentUser && (
      //         <div>
      //           <picture className="current-user-picture">
      //             <img alt={currentUser.name} src={currentUser.photoUrl} />
      //           </picture>
      //           <div className="current-user-info">
      //             <h3>{currentUser.name}</h3>
      //             <p>{currentUser.description}</p>
      //           </div>
      //         </div>
      //       )}
      //     </div>

      //     <div className="users-container">
      //       <ul>
      //         {this.state.friends.map((user) => (
      //           <li key={user.id} className="user">
      //               <img className ="post-photo"src={user.photo} alt={`${user.name}`} />
      //             <div className="user-info-container">
      //               <div className="user-info">
      //                 <h4>{user.name}</h4>
      //                 <p>{user.bio}</p>
      //               </div>
      //               <div className="user-action">
      //                 <button onClick={(userId) => this.handleClick(user._id)}>
      //                   Message
      //                 </button>
      //               </div>
      //             </div>
      //           </li>
      //         ))}
      //       </ul>

      //   </div>
      //   </div>
      <Container>
        <Row className="pt-3">
          <Col md={6}>
            <Row>
              <h1 align="center" className="large-block">
                My Friends
              </h1>
            </Row>
            {this.state.friends.map((user) => (
              <Row key={user._id}>
                <Card className="card-style mt-3 my-post-messagecard">
                  <Row className="py-2 px-3">
                    <Col md={3}>
                      <Image
                        className="post-photo-network"
                        src={user.photo}
                        roundedcircle="true"
                      />
                    </Col>
                    <Col md={7}>
                      <Row className="post-user-name large-block">
                        <Link to={"/profile/" + user._id}>{user.name}</Link>
                      </Row>
                      <Row className="x-small-block">
                        {user.bio?.length > 100
                          ? user.bio?.substring(0, 100) + "..."
                          : user.bio}
                      </Row>
                    </Col>
                    <Col md={2} align="right">
                      <BsFillEnvelopeFill
                        color="blue"
                        className="message-button"
                        onClick={(userId) => this.handleClick(user._id)}
                      />
                    </Col>
                  </Row>
                </Card>
              </Row>
            ))}
          </Col>
          <Col md={6}>
            <h1 className="large-block">Explore</h1>
            {this.state.incomingFriends.map((user) => (
              <Row key={user._id}>
                <Card className="card-style mt-3 my-post-messagecard">
                  <Row className="py-2 px-3">
                    <Col md={3}>
                      <Image
                        className="post-photo-network"
                        src={user.photo}
                        roundedcircle="true"
                      />
                    </Col>
                    <Col md={7}>
                      <Row className="post-user-name large-block">
                        <Link to={"/profile/" + user._id}>{user.name}</Link>
                      </Row>
                      <Row className="x-small-block">
                        {user.bio?.length > 100
                          ? user.bio?.substring(0, 100) + "..."
                          : user.bio}
                      </Row>
                    </Col>
                    <Col md={2} align="right">
                      {/* <Row align = "right"> */}
                      <BsCheckCircleFill
                        color="green"
                        className="message-button"
                        onClick={(userId) => this.handleAcceptClick(user._id)}
                      />
                      {/* </Row>
                      <Row> */}
                      <MdCancel
                        color="red"
                        className="message-button ml-1"
                        size={19}
                        onClick={(userId) => this.handleClick(user._id)}
                      />
                      {/* </Row> */}
                    </Col>
                  </Row>
                </Card>
              </Row>
            ))}
          </Col>
        </Row>
        <div className="chatbox-container" ref={(c) => (this.container = c)}>
          <div id="talkjs-container" style={{ height: "300px" }}>
            <i></i>
          </div>
        </div>
      </Container>
    );
  }
}
export default MyNetwork;
