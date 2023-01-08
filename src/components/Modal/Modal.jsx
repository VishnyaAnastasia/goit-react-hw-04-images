import { useEffect } from 'react';
import styles from './Modal.module.css';

import PropTypes from 'prop-types';

const Modal = ({ large, alt, setModal }) => {
  const closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      setModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeByEsc]);

  const modalClose = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setModal(false);
  };

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
  setModal: PropTypes.func.isRequired,
};
export default Modal;
