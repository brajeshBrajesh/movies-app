import React, { Component } from "react";
import Poster from "./Poster.jpg";
export default class Banner extends Component {
  render() {
    return (
      <>
        <div className="card banner text-center" >
          <img
            src={Poster}
            className="card-img-top"
            alt="..."
            style={{
              maxHeight: "70vh",
              borderRadius: "0px",
            }}
          />
          <div className="card-body banner_txt text-center">
            <h3 className="card-title">Movies</h3>
            <p className="card-text">Enjoy your favourite movies</p>
          </div>
        </div>
      </>
    );
  }
}
