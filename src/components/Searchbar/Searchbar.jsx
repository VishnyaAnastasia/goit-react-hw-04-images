import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit, setGallery }) => {
  const submitHandler = event => {
    event.preventDefault();

    const newQuery = event.target.elements.input.value;

    if (newQuery.trim() === '') {
      Notify.warning('Oppps.. please type query');
      event.target.reset();
      setGallery(false);
      return;
    }

    event.target.reset();

    onSubmit(newQuery);
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={submitHandler} className={styles.form}>
        <input
          name="input"
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setGallery: PropTypes.func.isRequired,
};

export default Searchbar;
