// import firebase from "../config/firebase-config";
// const auth = (provider) => {
//     return firebase.auth().signInWithPopup(provider).then((res) => {
//         return res.user;
//     }).catch(err => {
//         return err;
//     })
// }

// export default auth;

import firebase from "../config/firebase-config";
export const auth = firebase.auth();

