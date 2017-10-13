import React from "react";


//stores
import DatabaseStore from "../Stores/DatabaseStore";

//actions

//components
import LoadingComponent from "./LoadingComponent";
import ContentView from "./ContentView";

export default class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            loaded: false,
        };

        this.load = this.load.bind(this);
    }

    componentDidMount() {
        DatabaseStore.on("DatabaseLoaded", this.load);
    }

    componentWillUnmount() {
        DatabaseStore.removeListener("DatabaseLoade", this.load);
    }

    load() {
        this.setState({
            loaded: true,
        });
    }

    render() {
        return (
            <div>
                {this.state.loaded ? <ContentView/> : <LoadingComponent/>}
            </div>
        );
    }
}