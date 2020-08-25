//Reducers
//@todo

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

const firebaseConfig = {
  apiKey: "AIzaSyBGMPqG5cq9qlPYbr4mbpxO1-P0PUHwC-w",
  authDomain: "react-client-panel-25453.firebaseapp.com",
  databaseURL: "https://react-client-panel-25453.firebaseio.com",
  projectId: "react-client-panel-25453",
  storageBucket: "react-client-panel-25453.appspot.com",
  messagingSenderId: "882292918947",
  appId: "1:882292918947:web:65946ded2be3e416914d16",
  measurementId: "G-Z47VGSL4Z3",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
//end

export default store;
