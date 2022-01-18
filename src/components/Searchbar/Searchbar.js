import { Component } from "react";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    nameImg: "",
    page: 1,
  };

  reset() {
    this.setState({
      nameImg: "",
    });
  }

  changeInput = (event) => {
    const { value } = event.target;
    this.setState({ nameImg: value.toLowerCase() });
  };

  handleSubmit = (event) => {
    const { nameImg, page } = this.state;
    event.preventDefault();
    if (nameImg.trim() === "") {
      alert("Введите название");
      return;
    }
    this.props.onSubmit(nameImg);
    this.props.page(page);
    this.reset();
  };

  render() {
    const { nameImg } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch style={{ marginRight: 8 }} />
            Найти
          </button>
          <input
            onChange={this.changeInput}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            value={nameImg}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
