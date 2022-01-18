import Searchbar from "./components/Searchbar/Searchbar";
import { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.css";

class App extends Component {
  state = {
    imgName: "",
    page: 1,
  };
  sevPage = (number) => {
    this.setState({ page: number });
  };

  saveState = (name) => {
    this.setState({ imgName: name });
  };

  render() {
    const { imgName, page } = this.state;
    return (
      <div className={s.body}>
        <Searchbar page={this.sevPage} onSubmit={this.saveState} />
        <ImageGallery page={page} imgName={imgName} />
      </div>
    );
  }
}

export default App;
