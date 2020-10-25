import React, { Component } from "react";
import axios from "axios";

class Mainpage extends Component {
    state = {
        lines: null,
        lineNumber: "",
        newLine: null,

        name: null,
    };

    //by default show lines
    async componentDidMount() {
        const data = await axios.get("/line");

        this.setState({ lines: data.data.data });
    }

    //taking input as number ,setting in state
    changeNumber = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({ lineNumber: e.target.value });
    };
    //submit number and call route
    submit = async (e) => {
        e.preventDefault();
        const no = this.state.lineNumber;
        const data = await axios.post(`/count-line/${no}`);
        console.log(data.data.data);
        this.setState({ lines: data.data.data });
    };
    //save editated text ,save to state
    changeData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        const id = e.target.id;
        console.log(id);
        this.state.lines[id] = value + "\r";
        console.log(this.state.lines);
    };
    //submit edited text by post route
    newdataSubmit = async (e) => {
        const data = this.state.lines;
        await axios.post("/changingData", data);
        alert("Response has sent");
        const newdata = await axios.get("/line");

        this.setState({ lines: newdata.data.data });
    };

    render() {
        return (
            <div>
                {this.state.lines !== null ? (
                    <div>
                        <h2>Node Js Application </h2>
                        <form onSubmit={this.submit}>
                            <h5>
                                Enter how many number of lines do you want from
                                last ??
                            </h5>
                            <input name="number" onChange={this.changeNumber} />
                            <button>Submit</button>
                        </form>
                        {this.state.lines.map((p, i) => (
                            <div>
                                <h6>{p}</h6>
                                <form onSubmit={this.newdataSubmit}>
                                    <p>Edit line</p>
                                    <input
                                        type="text"
                                        placeholder={p}
                                        name="box"
                                        id={i}
                                        onChange={this.changeData}
                                    />
                                    <button className="btn btn-primary" id={i}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        );
    }
}

export default Mainpage;
