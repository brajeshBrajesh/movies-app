import React, { Component } from "react";
// import { movies } from "./GetMovies";
import Poster from "./Poster.jpg";

import "./Css/Movies.css";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      allMovies: [],
      currPage: 1,
      pages: [1],
      disableNext: "disabled",
      favourites: [],
    };
  }
  async componentDidMount() {
    const url = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=83423d723df053a9053052eb3335ce26&language=en-US&page=${this.state.currPage}`
    );
    let data = url.data;
    // console.log(data);
    // let fav = [...this.state.favourites];
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    console.log(oldData);
    console.log("Old data inside CMD");
    const temp = oldData.map((movie) => movie.id);

    this.setState({
      allMovies: [...data.results],
      favourites: [...temp],
    });
    // console.log("I am called");
  }
  handleChange = async () => {
    const url = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=83423d723df053a9053052eb3335ce26&language=en-US&page=${this.state.currPage}`
    );
    let data = url.data;
    this.setState({
      allMovies: [...data.results],
    });
  };
  handleNext = async () => {
    console.log("NEXT pressed");

    let newPages = [...this.state.pages];
    newPages.push(this.state.currPage + 1);
    let disableNextbtn = "disabled";
    if (this.state.currPage > 1) disableNextbtn = "";
    this.setState(
      {
        currPage: this.state.currPage + 1,
        pages: newPages,
        disableNext: disableNextbtn,
      },
      this.handleChange
    );
  };

  handlePrev = async () => {
    console.log("Prev pressed");
    let newPages = [...this.state.pages];
    newPages.pop();

    this.setState(
      {
        currPage: this.state.currPage - 1,
        pages: newPages,
      },
      this.handleChange
    );
  };
  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    console.log(oldData);
    console.log("OLD DATA");
    this.handleFavouriteState();
  };

  handleFavouriteState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    console.log(oldData);
    console.log("Insisde handel facvouites");
    const temp = oldData.map((movie) => movie.id);
    console.log(temp);
    this.setState({
      favourites: [...temp],
    });
    console.log(this.state.favourites);
    console.log("Inside handle fav (above is favourits printed");
  };

  render() {
    // let allMovies = movies.results;
    // console.log(this.state.favourites);
    // console.log("inside render");
    return (
      <>
        {this.state.allMovies.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border "></div>
          </div>
        ) : (
          <div>
            <h2 className="text-center my-3 ">Trending</h2>
            <div className="row ">
              {this.state.allMovies.map((moviesObj) => (
                <div className=" col-lg-4 col-sm-6" key={moviesObj.id}>
                  <div
                    className="card movie-card my-4"
                    onMouseEnter={() => this.setState({ hover: moviesObj.id })}
                    onMouseLeave={() => this.setState({ hover: "" })}
                  >
                    <img
                      src={Poster}
                      src={`https://image.tmdb.org/t/p/w500${moviesObj.known_for[0].backdrop_path}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <h5 className="movie-card-heading">
                      {moviesObj.known_for[0].original_title
                        ? moviesObj.known_for[0].original_title
                        : moviesObj.known_for[0].original_name}
                    </h5>
                    {this.state.hover === moviesObj.id && (
                      <button
                        className="button-wrapper movie-card-button"
                        type="button"
                        onClick={() => this.handleFavourites(moviesObj)}
                      >
                        {this.state.favourites.includes(moviesObj.id)
                          ? "Remove"
                          : "Add"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${this.state.disableNext}`}>
                  <a
                    onClick={this.handlePrev}
                    style={{
                      cursor: "pointer",
                    }}
                    className="page-link"
                  >
                    Previous
                  </a>
                </li>

                {this.state.pages.map((pageObj) => (
                  <li className="page-item" key={pageObj}>
                    <a
                      style={{
                        cursor: "pointer",
                      }}
                      className="page-link"
                    >
                      {pageObj}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={this.handleNext}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </>
    );
  }
}
