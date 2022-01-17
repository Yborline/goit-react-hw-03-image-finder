import s from "../Modal/Modal.module.css";
import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImage, alt } = this.props;
    return createPortal(
      <div onClick={this.handleBackdropClick} className={s.Overlay}>
        <img className={s.Modal} alt={alt} src={largeImage}></img>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
