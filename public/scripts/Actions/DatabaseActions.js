import dispatcher from "../Dispatcher.js";

export function DatabaseLoaded() {
    dispatcher.dispatch({
        type: "DatabaseLoaded",
    });
}

export function SurveySubmitted(result) {
    dispatcher.dispatch({
        type: "SurveySubmitted",
        result,
    });
}