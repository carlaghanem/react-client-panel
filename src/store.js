import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

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
// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore(); // <- needed if using firestore
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

//Add react-redux firebase enhancer when making creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

//Check for settings in local Storage
if (localStorage.getItem("settings") == null) {
  //Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };
  //Set to local Storage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

//Create initial State
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store with reducers and initial state
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance, // <- needed if using firestore
// };
//end

export default store;
