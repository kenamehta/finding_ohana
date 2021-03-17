import firebase from "./firebase-config";
export const authMethods = [firebase.auth.GoogleAuthProvider.PROVIDER_ID,
firebase.auth.FacebookAuthProvider.PROVIDER_ID,
firebase.auth.EmailAuthProvider.PROVIDER_ID,]
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const emailProvider = new firebase.auth.EmailAuthProvider();