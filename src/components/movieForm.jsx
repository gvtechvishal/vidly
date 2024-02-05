// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const MovieForm = () => {
//   const { _id } = useParams();

//   const navigate = useNavigate();

//   const handleSave = () => {
//     navigate("/movies", { replace: true });
//   };
//   return (
//     <>
//       <h1>Movie From {_id}</h1>
//       <button type="button" className="btn btn-primary" onClick={handleSave}>
//         Save
//       </button>
//     </>
//   );
// };

// export default MovieForm;
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import withRouter from "./hoc/getParaFromURL";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genereService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number of Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    //take movie ID
    try {
      const movieId = this.props.params._id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.navigate("/not-fond");
    }
  }

  async componentDidMount() {
    //geting data from fakegeners files

    //this function do two task 1) populate genres and populate movie
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    // console.log(movie,'ok')
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  async handleSave(navigate) {
    await saveMovie(this.state.data);
    navigate("/movies", { replace: true });
  }
  render() {
    // console.log('render')
    return (
      <>
        <h1>Movie From {this.props.params._id}</h1>

        {this.renderInput("title", "Title")}
        {/* {this.renderInput("genre", "Genre")} */}
        {/* <label htmlFor="select_gener">Gener</label>
        <select className=" form-select " id="select_gener">
          <option selected></option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="thriller">Thriller</option>
        </select> */}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Number in Stock")}
        {this.renderInput("dailyRentalRate", "Daily Rental Rate")}

        <button
          disabled={this.validate()}
          type="button"
          className="btn btn-primary m3"
          onClick={() => this.handleSave(this.props.navigate)}
        >
          Save
        </button>
      </>
    );
  }
}

export default withRouter(MovieForm);
