import axios from "axios";
import React, { Component } from "react";
import "./Css/Favourites.css";
// import { movies } from "./GetMovies";
// import Poster from "./Poster.jpg";

export default class Favourites extends Component {
  constructor() {
    super();
    console.log("Construvotr called");
    this.state = {
      chosenGerns: [],
      currGern: "All Gernes",
      allGern: [],
      activeMovies: [],
      movies: [],
    };
  }
  async componentDidMount() {
    console.log("ComponentDidMount");
    const url = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=83423d723df053a9053052eb3335ce26&language=en-US"
    );

    const allGern = url.data.genres;
    let map = new Object();
    allGern.forEach((obj) => {
      map[obj.id] = obj.name;
    });
    let temp = [];

    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    oldData.forEach((val) => {
      if (!temp.includes(map[val.known_for[0].genre_ids[0]])) {
        if (map[val.known_for[0].genre_ids[0]] !== undefined) {
          temp.push(map[val.known_for[0].genre_ids[0]]);
        }
      }
    });
    temp.unshift("All Gernes");

    this.setState({
      chosenGerns: [...temp],
      movies: [...oldData],
      activeMovies: [...oldData],
      allGern: map,
    });
  }

  handleListClick = (gernType) => {
    console.log(gernType);

    if (gernType === "All Gernes") {
      this.setState({
        activeMovies: this.state.movies,
        currGern: gernType,
      });
    } else {
      let filterArray = [];
      if (gernType !== this.state.currGern) {
        console.log("Inside");
        filterArray = this.state.movies.filter((movieObj) => {
          // console.log(this.state.allGern[movieObj.known_for[0].genre_ids[0]]);
          console.log("HI");
          return (
            this.state.allGern[movieObj.known_for[0].genre_ids[0]] === gernType
          );
        });
        console.log(filterArray);
        this.setState({
          currGern: gernType,
          activeMovies: [...filterArray],
        });
      }
    }
  };
  sortPopularityAsc = () => {
    console.log("Sort on basis of popularity ASC");
    let temp = [...this.state.activeMovies];
    console.log(temp);
    temp.sort(function (obj1, obj2) {
      return obj1.popularity - obj2.popularity;
    });
    console.log(temp);
    this.setState({
      activeMovies: [...temp],
    });
  };

  sortPopularityDsc = () => {
    let temp = [...this.state.activeMovies];
    temp.sort(function (obj1, obj2) {
      return obj2.popularity - obj1.popularity;
    });

    this.setState({
      activeMovies: [...temp],
    });
  };
  sortRatingAsc = () => {
    let temp = [...this.state.activeMovies];
    temp.sort(function (obj1, obj2) {
      return obj1.known_for[0].vote_average - obj2.known_for[0].vote_average;
    });

    this.setState({
      activeMovies: [...temp],
    });
  };

  sortRatingDsc = () => {
    let temp = [...this.state.activeMovies];
    temp.sort(function (obj1, obj2) {
      return obj2.known_for[0].vote_average - obj1.known_for[0].vote_average;
    });

    this.setState({
      activeMovies: [...temp],
    });
  };
  handleDelete = (movie) => {
    console.log("Delete clicked");
    console.log(movie);
    let temp = this.state.activeMovies.filter((m) => m.id != movie.id);
    console.log(temp);
    localStorage.setItem("movies", JSON.stringify(temp));
    this.setState({
      activeMovies: [...temp],
    });
  };
  render() {
    // let gerns = [
    //   { id: 28, name: "Action" },
    //   { id: 12, name: "Adventure" },
    //   { id: 16, name: "Animation" },
    //   { id: 35, name: "Comedy" },
    //   { id: 80, name: "Crime" },
    //   { id: 99, name: "Documentary" },
    // ];
    // let movie = movies.results;
    console.log("render called");
    // console.log(typeof gerns + "hi");
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div className="container-fluid">
                <div className="list-group my-4">
                  {this.state.chosenGerns.map((gernObj) => (
                    <button
                      type="button"
                      className={`list-group-item list-group-item-action ${
                        this.state.currGern === gernObj ? "active" : ""
                      }`}
                      aria-current="true"
                      onClick={() => this.handleListClick(gernObj)}
                    >
                      {gernObj}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-8 ">
              <div className="container-fluid my-4">
                {/* <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Default input"
                      aria-label="default input example"
                    ></input>
                  </div>
                  <div className="col-6">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Default input"
                      aria-label="default input example"
                    ></input>
                  </div>
                </div> */}
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          className="fas fa-sort-up"
                          onClick={this.sortPopularityAsc}
                        ></i>
                        Popularity
                        <i
                          className="fas fa-sort-down"
                          onClick={this.sortPopularityDsc}
                        ></i>
                      </th>
                      <th scope="col">
                        <i
                          className="fas fa-sort-up"
                          onClick={this.sortRatingAsc}
                        ></i>
                        Rating
                        <i
                          className="fas fa-sort-down"
                          onClick={this.sortRatingDsc}
                        ></i>
                      </th>

                      <th>
                        <h1></h1>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.activeMovies.map((moviesObj) => (
                      <tr key={moviesObj.id}>
                        <th scope="row">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${moviesObj.known_for[0].backdrop_path}`}
                            style={{ width: "4rem", height: "3rem" }}
                            className="rounded float-start"
                            alt="..."
                          ></img>
                          {moviesObj.known_for[0].original_title
                            ? moviesObj.known_for[0].original_title
                            : moviesObj.known_for[0].original_name}
                        </th>
                        <td>
                          {
                            this.state.allGern[
                              moviesObj.known_for[0].genre_ids[0]
                            ]
                          }
                        </td>
                        <td>{moviesObj.popularity}</td>
                        <td>{moviesObj.known_for[0].vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(moviesObj)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
