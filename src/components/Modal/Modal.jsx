import styles from './Modal.module.css';

import PropTypes from 'prop-types';

const Modal = ({ large, alt, modalClose }) => {
  return (
    <div className={styles.overlay} onClick={modalClose}>
      <div className={styles.modal}>
        <img className={styles.photoCardImg} src={large} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
export default Modal;
