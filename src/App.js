import Searchbar from "./components/Searchbar/Searchbar";
import { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import s from "./App.css";

class App extends Component {
  state = {
    imgName: "",
    page: 1,
  };

  saveState = (name) => {
    this.setState({ imgName: name });
  };

  render() {
    return (
      <div className={s.body}>
        <Searchbar onSubmit={this.saveState} />
        <ImageGallery page={this.state.page} imgName={this.state.imgName} />
      </div>
    );
  }
}

export default App;
