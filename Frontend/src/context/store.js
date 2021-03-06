import React, { createContext, useReducer } from "react";

const initialState = {
  userID: null,
  userName: null,
  profilePhoto: null,
  bio: null,
  interest: [],
  hobby: [],
  post: [],
  tags: [],
};

const StoreContext = createContext(initialState);

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_INITIAL_PROFILE": {
        return {
          ...state,
          userID: action.value.userID,
          userName: action.value.userName,
          profilePhoto: action.value.profilePhoto,
        };
      }
      case "UPDATE_PROFILE_PHOTO": {
        return {
          ...state,
          profilePhoto: action.value.profilePhoto,
        };
      }
      default:
        console.log("Unhandled case");
    }
  }, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
