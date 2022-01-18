import PropTypes from "prop-types";
import s from "../ImageGalleryItem/ImageGalleryItem.module.css";

const ImageGalleryItem = ({ url, alt, id, onClick, largeURL }) => {
  return (
    <li ket={id} className={s.ImageGalleryItemImage}>
      <img
        className={s.img}
        onClick={() => onClick({ alt, largeURL })}
        src={url}
        alt={alt}
        data-src={largeURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
