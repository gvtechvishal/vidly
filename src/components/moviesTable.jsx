import React, { Component } from "react";
import Like from "./common/like";

import Table from "./common/table";
import { Link } from "react-router-dom";
import authServices from "../services/authServices";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => {
            this.props.onLike(movie);
          }}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => {
          this.props.onDelete(movie);
        }}
        type="button"
        className="btn btn-danger btn-sm "
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = authServices.currentUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    // const user = authServices.currentUser();
    // let column;
    // if (user) {
    //   column = [
    //     {
    //       path: "title",
    //       lable: "Title",
    //       content: (movie) => (
    //         <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    //       ),
    //     },
    //     { path: "genre.name", lable: "Genre" },
    //     { path: "numberInStock", lable: "Stock" },
    //     { path: "dailyRentalRate", lable: "Rate" },
    //     {
    //       key: "like",
    //       content: (movie) => (
    //         <Like
    //           liked={movie.liked}
    //           onClick={() => {
    //             this.props.onLike(movie);
    //           }}
    //         />
    //       ),
    //     },
    //     {
    //       key: "delete",
    //       content: (movie) => (
    //         <button
    //           onClick={() => {
    //             this.props.onDelete(movie);
    //           }}
    //           type="button"
    //           className="btn btn-danger btn-sm "
    //         >
    //           Delete
    //         </button>
    //       ),
    //     },
    //   ];
    // } else {
    //   column = [
    //     {
    //       path: "title",
    //       lable: "Title",
    //       content: (movie) => (
    //         <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    //       ),
    //     },
    //     { path: "genre.name", lable: "Genre" },
    //     { path: "numberInStock", lable: "Stock" },
    //     { path: "dailyRentalRate", lable: "Rate" },
    //     {
    //       key: "like",
    //       content: (movie) => (
    //         <Like
    //           liked={movie.liked}
    //           onClick={() => {
    //             this.props.onLike(movie);
    //           }}
    //         />
    //       ),
    //     },
    //     // {
    //     //   key: "delete",
    //     //   content: (movie) => (
    //     //     <button
    //     //       onClick={() => {
    //     //         this.props.onDelete(movie);
    //     //       }}
    //     //       type="button"
    //     //       className="btn btn-danger btn-sm "
    //     //     >
    //     //       Delete
    //     //     </button>
    //     //   ),
    //     // },
    //   ];
    // }
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        columns={this.columns}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
