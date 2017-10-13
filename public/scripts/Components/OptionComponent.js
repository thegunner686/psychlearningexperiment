import React from "react";

export default class OptionComponent extends React.Component {
    constructor() {
        super();

        let optionID = "k" + Math.floor(Math.random() * 1000000) + "-" + Math.floor(Math.random() * 1000);
        this.optionClass = "option " + optionID;
    }

    componentWillMount() {
        this.data = this.props.data;
    }

    componentDidMount() {
        let option = document.getElementsByClassName(this.optionClass)[0];

        let { callback } = this.props;

        option.addEventListener("mousedown", (event) => {
            callback(this.data);
        });
    }

    render() {
        console.log(this.props.selected);
        return (
            <div className={this.optionClass}>
                <div className={this.props.selected ? "option-container-selected" : "option-container"}>
                    <div className="option-letter">
                        {this.data.letter}
                    </div>
                    <div className="option-content">
                        {this.data.content}
                    </div>
                </div>
            </div>
        );
    }
}
