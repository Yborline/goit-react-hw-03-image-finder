import { Component } from "react";
import { ImSearch } from "react-icons/im";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    nameImg: "",
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
    event.preventDefault();
    if (this.state.nameImg.trim() === "") {
      alert("Введите название");
      return;
    }
    this.props.onSubmit(this.state.nameImg);
    this.reset();
  };

  render() {
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
            value={this.state.nameImg}
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
