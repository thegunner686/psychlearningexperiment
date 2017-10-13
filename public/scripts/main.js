let app = document.getElementById("app");


import React from "react";
import ReactDOM from "react-dom";
import MainView from "./Components/MainView";

import firebase from "./Firebase";
import * as DatabaseActions from "./Actions/DatabaseActions";

firebase.auth().signInAnonymously().then((user) => {
    DatabaseActions.DatabaseLoaded();
}).catch((error) => {
    console.log(error);
});

ReactDOM.render(<MainView/>, app);