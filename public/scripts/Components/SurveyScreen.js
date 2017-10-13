import React from "react";

//actions
import * as DatabaseActions from "../Actions/DatabaseActions";


// components
import QuestionComponent from "./QuestionComponent";
import SubmitButton from "./SubmitButton";

import firebase from "../Firebase";

export default class SurveyScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {},
        };

        this.updateForm = this.updateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    updateForm(data) {
        let fd = this.state.formData;
        fd[data.number] = data;
        this.setState({
            formData: fd,
        });
    }

    submitForm() {
        let numCorrect = 0;
        let db = firebase.database();

        let numAnswered = 0;

        Object.keys(this.state.formData).map((key) => {
            numAnswered++;
            if(this.state.formData[key].correct) {
                numCorrect++;
            }
        });

        if(numAnswered != 5) {
          alert("Answer all of the questions.");
          return;
        }

        let orientation = 0;

        do {
            orientation = parseInt(prompt("On a scale of 1 - 10, 1 being very conservative, 5 being moderate, and 10 being very liberal, where do you lie?"));
        } while(orientation <= 0 || orientation > 10);

        let result = {
            score: numCorrect,
            orientation,
        };

        db.ref("Responses").push().set(result);

        DatabaseActions.SurveySubmitted(result);
    }

    render() {
        return (
            <div className="survey-container">
                <QuestionComponent callback={this.updateForm} data={
                    {
                        question: "In 2013, there were approximately how many gun-related homicides?",
                        number: 1,
                        options: {
                            a: {
                                letter: "a",
                                content: "33,636",
                                correct: false,
                            },
                            b: {
                                 letter: "b",
                                 content: "About one-third of A.",
                                 correct: true,
                            },
                            c: {
                                letter: "c",
                                content: "About two-thirds of A.",
                                correct: false,
                            },
                            d: {
                                letter: "d",
                                content: "I don't know.",
                                correct: false,
                            }
                        }
                    }
                }/>

                <QuestionComponent callback={this.updateForm} data={
                    {
                        question: "Which of the following categories of firearm related deaths is the LEAST prevalent in the U.S.?",
                        number: 2,
                        options: {
                            a: {
                                letter: "a",
                                content: "Suicides",
                                correct: false,
                            },
                            b: {
                                 letter: "b",
                                 content: "Gang related shootings",
                                 correct: false,
                            },
                            c: {
                                letter: "c",
                                content: "Mass Shootings",
                                correct: true,
                            },
                            d: {
                                letter: "d",
                                content: "I don't know.",
                                correct: false,
                            }
                        }
                    }
                }/>

                <QuestionComponent callback={this.updateForm} data={
                    {
                        question: "Which firearm is responsible for most of the homicides in the U.S.?",
                        number: 3,
                        options: {
                            a: {
                                letter: "a",
                                content: "AR-15",
                                correct: false,
                            },
                            b: {
                                 letter: "b",
                                 content: "Handguns",
                                 correct: true,
                            },
                            c: {
                                letter: "c",
                                content: "Non-handgun semi-automatic weapons",
                                correct: false,
                            },
                            d: {
                                letter: "d",
                                content: "I don't know.",
                                correct: false,
                            }
                        }
                    }
                }/>

                <QuestionComponent callback={this.updateForm} data={
                    {
                        question: "Which of the following is most true?",
                        number: 4,
                        options: {
                            a: {
                                letter: "a",
                                content: "Every federally licensed gun-owner has gone through a background check.",
                                correct: true,
                            },
                            b: {
                                 letter: "b",
                                 content: "A person can legally obtain a firearm without a background check at a gun show.",
                                 correct: false,
                            },
                            c: {
                                letter: "c",
                                content: "There are very little or no background checks for gun owners",
                                correct: false,
                            },
                            d: {
                                letter: "d",
                                content: "I don't know.",
                                correct: false,
                            }
                        }
                    }
                }/>

                <QuestionComponent callback={this.updateForm} data={
                    {
                        question: "Which of the following regarding fully automatic firearms is most true?",
                        number: 5,
                        options: {
                            a: {
                                letter: "a",
                                content: "You only need a simple background check to obtain one.",
                                correct: false,
                            },
                            b: {
                                 letter: "b",
                                 content: "Almost anyone can obtain one without a background check.",
                                 correct: false,
                            },
                            c: {
                                letter: "c",
                                content: "There are extremely difficult to obtain",
                                correct: true,
                            },
                            d: {
                                letter: "d",
                                content: "I don't know.",
                                correct: false,
                            }
                        }
                    }
                }/>

                <SubmitButton submit={this.submitForm}/>
            </div>
        );
    }
}
