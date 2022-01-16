import s from "../ImageGalleryItem/ImageGalleryItem.module.css";

const ImageGalleryItem = ({ url, alt, id, onClick, largeURL }) => {
  return (
    <li ket={id} className={s.ImageGalleryItemImage}>
      <img
        className={s.img}
        onClick={onClick}
        src={url}
        alt={alt}
        data-src={largeURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
