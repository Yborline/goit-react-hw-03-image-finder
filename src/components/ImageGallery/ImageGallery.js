import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import s from "../ImageGallery/ImageGallery.module.css";

class ImageInfo extends Component {
  state = {
    images: [],
    error: "",
    status: "idle",
    numberImage: 12,
    showModal: false,
    largeImage: "",
    alt: "",
    page: 1,
  };
  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  loadNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: "",
      alt: "",
    }));
  };

  openModal = (event) => {
    console.log(event.target);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: event.target.dataset.src,
      alt: event.target.dataset.alt,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;

    const { numberImage, page } = this.state;
    console.log(prevState.page);
    console.log(page);

    if (prevName !== nextName) {
      const KEY = "24295658-d33a4cb7a7ba959c48fb9a807";

      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?key=${KEY}&q=${nextName}&page=${page}&image_type=photo&per_page=${numberImage}`
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(
              new Error(`Нет картинки с именем ${nextName}`)
            );
          }

          return response.json();
        })
        .then((newImages) =>
          this.setState({
            images: [...this.state.images, ...newImages.hits],
            status: "resolved",
          })
        ).catch = (error) => {
        this.setState({ error: error.message, status: "rejected" });
        if (this.page !== 1) this.scrollToBottom();
      };
    }
  }

  changeNumber = (number) => {
    this.setState({
      numberImage: number,
    });
  };

  render() {
    const { images, error, status, showModal, alt, largeImage } = this.state;

    if (status === "idle") {
      return <div>Введите название </div>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <h1>{error.message}</h1>;
    }
    if (images.length === 0) {
      return <p>Такого запроса не существует</p>;
    }
    if (status === "resolved") {
      return (
        <div>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                onClick={this.openModal}
                className={s.ImageGalleryItemImag}
                key={id}
                url={webformatURL}
                alt={tags}
                largeURL={largeImageURL}
              ></ImageGalleryItem>
            ))}
            {showModal && (
              <Modal
                onClose={this.closeModal}
                alt={alt}
                largeImage={largeImage}
              >
                <button onClick={this.closeModal} type="button">
                  Close
                </button>
              </Modal>
            )}
          </ul>
          <Button onClick={this.loadNextPage} />
        </div>
      );
    }
    return null;
  }
}

export default ImageInfo;
