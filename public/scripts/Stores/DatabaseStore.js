import { EventEmitter } from "events";
import dispatcher from "../Dispatcher";

import firebase from "../Firebase";

class DatabaseStore extends EventEmitter {
    constructor() {
        super();

        this.results = [];
        this.currentResult = null;
    }

    loadResults() {
        firebase.database().ref("Responses").on("value", (snapshot) => {
            if(snapshot.val() == null) {
              return;
            }
            this.addResponses(snapshot.val());
        }, (error) => {
            console.log(error);
        });
    }

    addResponses(rawData) {
        this.results = [];
        Object.keys(rawData).map((key) => {
            this.results.push(rawData[key]);
        });

        setTimeout(() => {
            this.emit("ResultChange");
        }, 0);
    }

    getResults() {
        return this.results;
    }

    getCurrentResult() {
        return this.currentResult;
    }

    handleActions(action) {
        switch(action.type) {
            case "DatabaseLoaded":
                setTimeout(() => {
                    this.emit("DatabaseLoaded");
                }, 0);
            break;
            case "SurveySubmitted":
                this.currentResult = action.result;
                this.loadResults();
                console.log("loading");
                setTimeout(() => {
                    this.emit("SurveySubmitted");
                });
            break;
        }
    }
}

const store = new DatabaseStore;
dispatcher.register(store.handleActions.bind(store));
export default store;
