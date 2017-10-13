import React from "react";

export default class SubmitButton extends React.Component {
    constructor() {
        super();

        let id = "k" + Math.floor(Math.random() * 1000000) + "-" + Math.floor(Math.random() * 1000);

        this.class = "submitbutton " + id;
    }

    componentDidMount() {
        let button = document.getElementsByClassName(this.class)[0];

        let { submit } = this.props;

        button.addEventListener("click", submit);
    }

    render() {
        return (
            <div className={this.class}>
                Submit
            </div>
        );
    }
}