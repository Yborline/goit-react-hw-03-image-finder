import { Component } from "react";
import s from "./Button.module.css";
import PropTypes from "prop-types";

class Button extends Component {
  state = {
    images: null,
  };

  render() {
    return (
      <div className={s.ButtonDiv}>
        <button className={s.Button} onClick={this.props.onClick} type="button">
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
