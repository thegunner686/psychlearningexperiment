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

        Object.keys(this.state.formData).map((key) => {
            if(this.state.formData[key].correct) {
                numCorrect++;
            }
        });

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
                        question: "In 2013, there were approximately how many gun-related homicides?",
                        number: 2,
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
                        question: "In 2013, there were approximately how many gun-related homicides?",
                        number: 3,
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
                        question: "In 2013, there were approximately how many gun-related homicides?",
                        number: 4,
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
                        question: "In 2013, there were approximately how many gun-related homicides?",
                        number: 5,
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

                <SubmitButton submit={this.submitForm}/>
            </div>
        );
    }
}