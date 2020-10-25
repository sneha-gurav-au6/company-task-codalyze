import React, { Component } from "react";
import axios from "axios";

class Mainpage extends Component {
    state = {
        lines: null,
        lineNumber: "",
        newLine: null,
        name: null,
    };
    async componentDidMount() {
        const data = await axios.get("/line");

        this.setState({ lines: data.data.data });
        // this.changeData = this.changeData.bind(this);
    }
    // async componentDidMount() {
    //     const data = await axios.get("/line");
    //     console.log(data);
    //     this.setState({ lines: data.data.data });
    // }

    changeNumber = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        this.setState({ lineNumber: e.target.value });
    };

    submit = async (e) => {
        const no = this.state.lineNumber;
        const data = await axios.post(`/count-line/${no}`);
        console.log(data.data.data);
        this.setState({ lines: data.data.data });
    };

    changeData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        const id = e.target.id;
        console.log(id);
        this.state.lines[id] = value + "\r";
        console.log(this.state.lines);

        // this.setState({ name: value });
    };
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
                <form onSubmit={this.submit}>
                    <h5>
                        Enter how many number of lines do you want from last ??
                    </h5>
                    <input name="number" onChange={this.changeNumber} />
                    <button>Submit</button>
                </form>

                {/* <form onSubmit={this.newdataSubmit}>
                    <h4>chane data</h4>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.changeData}
                    />
                    <button type="submit">Submit</button>
                </form> */}
            </div>
        );
    }
}

export default Mainpage;
