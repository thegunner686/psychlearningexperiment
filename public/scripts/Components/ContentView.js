import React from "react";

// stores
import DatabaseStore from "../Stores/DatabaseStore";

// components
import DataScreen from "./DataScreen";
import SurveyScreen from "./SurveyScreen";

export default class ContentView extends React.Component {
    constructor() {
        super();

        this.state = {
            surveyDone: false,
        };

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        DatabaseStore.on("SurveySubmitted", this.update);
    }

    componentWillUnmount() {
        DatabaseStore.removeListener("SurveySubmitted", this.update);        
    }

    update() {
        this.setState({
            surveyDone: true,
        });

        console.log("triggered");
    }


    render() {
        return (
            <div>
                {this.state.surveyDone ? <DataScreen/> : <SurveyScreen/>}
            </div>
        )
    }
}