//@ts-nocheck
import React from "react";
import "./passwordstrength.css";


const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
class PasswordStrength extends React.Component {

    constructor() {
        super();
        this.state = {
            backgroundColor: "#4285F4"
        }
        this.analyze = this.analyze.bind(this);
    }

    analyze(event) {
        if(strongRegex.test(event.target.value)) {
            this.setState({ backgroundColor: "#0F9D58" });
        } else if(mediumRegex.test(event.target.value)) {
            this.setState({ backgroundColor: "#F4B400" });
        } else {
            this.setState({ backgroundColor: "#DB4437" });
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: this.state.backgroundColor }}>
                <p><label for="password">Password: </label></p>
                <p><input type="text" name="password" onChange={this.analyze} /></p>
            </div>
        );
    }

}

export default PasswordStrength;