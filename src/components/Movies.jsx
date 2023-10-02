import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utility/paginate";

import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";


import _ from "lodash";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    geners: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery : '',
    selectedGenre : null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const geners = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), geners: geners });
  }

  //my functions

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    // console.log(movie);
    //state change

    const movies = [...this.state.movies];

    // console.log(movies);

    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery : '' , currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = query =>{
    this.setState ( {searchQuery : query , selectedGenre : null , currentPage : 1})
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovie,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    //filtering after sorting
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovie.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovie;

    // for searching logic 
    let filtered = allMovie;
    if(searchQuery){
      filtered = allMovie.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }else if( selectedGenre && selectedGenre._id){
      filtered = allMovie.filter(m => m.genre._id === selectedGenre._id)
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (this.state.movies.length === 0) return <h1>There is no movies!</h1>;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.geners}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in database</p>
          <SearchBox value ={this.state.searchQuery} onChange = {this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
