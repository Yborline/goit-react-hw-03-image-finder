import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import s from "../ImageGallery/ImageGallery.module.css";
import api from "../../api/api";
import PropTypes from "prop-types";

class ImageGallery extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
  };
  state = {
    name: "",
    images: [],
    error: "",
    status: "idle",
    showModal: false,
    largeImage: "",
    alt: "",
    page: 1,
    loading: false,
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

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;
    const { page } = this.state;

    if (prevName !== nextName) {
      this.setState({ images: [], page: 1, loading: true });
    }

    if ((prevProps !== this.props && page === 1) || prevState.page !== page) {
      this.setState({ status: "pending" });
      api.fetchImages(nextName, page).then((images) =>
        this.setState({
          images: [...this.state.images, ...images.hits],
          status: "resolved",
          loading: false,
        })
      );
      if (page !== 1) this.scrollToBottom();
    }
  }

  changeNumber = (number) => {
    this.setState({
      numberImage: number,
    });
  };

  openModal = ({ alt, largeURL }) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: largeURL,
      alt: alt,
    }));
  };

  render() {
    const { images, error, status, showModal, alt, largeImage, loading } =
      this.state;

    <div></div>;
    if (status === "idle") {
      return <div className={s.text}>Введите название </div>;
    }

    if (status === "resolved" || status === "pending") {
      return (
        <div className={s.text}>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                onClick={this.openModal}
                className={s.ImageGalleryItemImag}
                key={id}
                url={webformatURL}
                alt={tags}
                largeURL={largeImageURL}
              />
            ))}
          </ul>
          {showModal && (
            <Modal
              onClose={this.closeModal}
              alt={alt}
              largeImage={largeImage}
            />
          )}

          {images.length > 0 ? (
            <Button onClick={this.loadNextPage} />
          ) : (
            <p className={s.text}>Такого запроса не существует</p>
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <div className={s.text}>
          <Loader />
        </div>
      );
    }
    if (status === "rejected") {
      return <h1 className={s.text}>{error.message}</h1>;
    }
  }
}

export default ImageGallery;

// const KEY = "24295658-d33a4cb7a7ba959c48fb9a807";

//     this.setState({ status: "pending" });
//     fetch(
//       `https://pixabay.com/api/?key=${KEY}&q=${nextName}&page=${page}&image_type=photo&per_page=${numberImage}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           return Promise.reject(
//             new Error(`Нет картинки с именем ${nextName}`)
//           );
//         }

//         return response.json();
//       })
//         .then((newImages) =>{
//             if (newImages === this.state.images) {
//                  this.setState({
//           images: [...newImages.hits],
//           status: "resolved",
//         })

//           }
//         this.setState({
//           images: [...this.state.images, ...newImages.hits],
//           status: "resolved",
//         })}
//       ).catch = (error) => {
//       this.setState({ error: error.message, status: "rejected" });
//       if (this.page !== 1) this.scrollToBottom();
//     };
