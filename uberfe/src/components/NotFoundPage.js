import React from "react";
import { Component } from "react";

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  async componentDidMount() {
    console.log("I am in component did mount");
  }

  render() {
    return (
      <div className="notfound">
        <br></br>
        <br></br>
        <h1>SORRY</h1>
        <h1>The page you are looking for does not exist</h1>
        <div>
          <a href="/">
            <b>Go back to Home Page</b>
          </a>
        </div>
        <img src={require("../image/dog4.png")} />
      </div>
    );
  }
}
