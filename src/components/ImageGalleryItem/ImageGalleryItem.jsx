import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ id, small, large, alt, onClickModal }) {
  return (
    <li onClick={() => onClickModal(large, alt)} key={id}>
      <img className={styles.galleryImg} src={small} alt={alt} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
