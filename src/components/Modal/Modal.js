import s from "../Modal/Modal.module.css";
import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
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
