import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetch } from '../services/imgApi';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

Notify.init({
  useIcon: false,
  fontSize: '20px',
  position: 'right-top',
  width: '350px',
  height: '35px',
  clickToClose: true,
});

export const App = () => {
  const [query, setQuery] = useState(null);
  const [gallery, setGallery] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [large, setLarge] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    }

    fetch(query, page)
      .then(({ pictures, pages }) => {
        if (pictures.length === 0) {
          Notify.warning('Oppps.. bad query');
          setGallery(false);
          return;
        }
        setPictures(prevState => [...prevState, ...pictures]);
        setPages(pages);
        setGallery(true);
      })
      .catch(error => Notify.warning('Oppps.. bad query'))
      .finally(setLoader(false));
  }, [query, page]);

  const onSubmit = event => {
    event.preventDefault();

    const newQuery = event.target.elements.input.value;

    if (newQuery.trim() === '') {
      Notify.warning('Oppps.. please type query');
      event.target.reset();
      setGallery(false);
      return;
    }

    setPictures([]);
    setQuery(newQuery);
    setPage(1);
    setLoader(true);

    event.target.reset();
  };

  const onClick = () => {
    setPage(prevState => prevState + 1);
    setLoader(true);
  };

  const onClickModal = (newLarge, newAlt) => {
    window.addEventListener('keydown', closeByEsc);

    setLarge(newLarge);
    setModal(true);
    setAlt(newAlt);
  };

  const closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      setModal(false);

      window.removeEventListener('keydown', closeByEsc);
    }
  };

  const modalClose = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {gallery && (
        <ImageGallery>
          {pictures.map(({ id, small, large, alt }) => {
            return (
              <ImageGalleryItem
                onClickModal={onClickModal}
                id={id}
                small={small}
                large={large}
                alt={alt}
                key={id}
              />
            );
          })}
        </ImageGallery>
      )}
      {loader && <Loader />}
      {gallery && page < pages && <Button onClick={onClick} />}
      {modal && <Modal alt={alt} large={large} modalClose={modalClose} />}
    </>
  );
};
