import React from "react";

// stores
import DatabaseStore from "../Stores/DatabaseStore";

export default class DataScreen extends React.Component {
    constructor() {
        super();

        let id = "k" + Math.floor(Math.random() * 1000000) + "-" + Math.floor(Math.random() * 1000);
        
        this.canvasClass = "data-display " + id;

        this.ctx = null;
        this.width = 0;
        this.height = 0;

        this.updateResults = this.updateResults.bind(this);
    }

    componentDidMount() {
        let canvas = document.getElementsByClassName(this.canvasClass)[0];

        this.width = canvas.width = window.innerWidth;
        this.height = canvas.height = window.innerWidth;

        this.ctx = canvas.getContext("2d");

        DatabaseStore.on("ResultChange", this.updateResults);
        this.updateResults();
    }

    componentWillUnmount() {
        DatabaseStore.removeListener("ResultChange", this.updateResults);        
    }

    updateResults() {
        let results = DatabaseStore.getResults();

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#404040";

        let scaleY = this.height / 10 * 9 / 5;
        let scaleX = this.width / 10;

        for(var i = 1; i <= 10; i++) {
            this.ctx.fillText(i, (i -1) * scaleX - (this.width / 10 / 4), this.height / 10 * 9.5);
        }

        for(var i = 0; i <= 5; i++) {
            this.ctx.fillText(i, 0, this.height - (i) * scaleY - (this.height / 10 / 2 - 4));            
        }

        results.map((result) => {
            this.plot(result.orientation - 1, result.score - 1);
        });
    }

    plot(x, y) {
        if(this.ctx == null) {
            return;
        }

        this.ctx.fillStyle = "rgba(250, 50, 60, 0.2)";
        this.ctx.strokeStyle = "#404040";
        this.ctx.lineWidth = 1;

        let scaleY = this.height / 10 * 9 / 5;
        let scaleX = this.width / 10 * 9 / 10;

        
        this.ctx.save();
        this.ctx.translate(this.width / 10 / 2, this.height / 10 / 2);
        this.ctx.beginPath();
        this.ctx.arc(x * scaleX, y * scaleY, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    render() {
        return (
            <div>
                <canvas className={this.canvasClass}>

                </canvas>
                <div>
                    {DatabaseStore.getCurrentResult().orientation}
                </div>
            </div>
        );
    }
}