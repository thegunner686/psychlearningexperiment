import React from "react";

import OptionComponent from "./OptionComponent";

export default class QuestionComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            options: [],
            answer: null,
            selected: null,
        };

        this.receiveAnswer = this.receiveAnswer.bind(this);
    }

    componentWillMount() {
        this.loadComponents();
    }

    loadComponents() {
      let meta = this.props.data.options;

      meta = Object.keys(meta).map((key) => {
          let data = meta[key];
          data.number = this.props.data.number;
          let isSelected = false
          if(this.state.selected != null) {
            if(data.letter == this.state.selected.letter) {
              isSelected = true;
            }
          }
          return <OptionComponent selected={isSelected} data={data} key={meta[key].letter} callback={this.receiveAnswer}/>
      });

      this.setState({
          options: meta,
      });
    }

    receiveAnswer(data) {
        let { callback } = this.props;
        this.setState({
          selected: data,
        });
        console.log(data);
        callback(data);

        setTimeout(() => {
          this.loadComponents();
        }, 200);
    }

    render() {
        return (
            <div className="question-container">
                <div className="question-title">
                    {this.props.data.question}
                </div>
                <div className="question-options">
                    {this.state.options.length > 0 ? this.state.options : ""}
                </div>
            </div>
        );
    }
}
