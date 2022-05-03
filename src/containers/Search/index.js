import React from 'react';
import { Formik } from 'formik';
import { Col, Form, Button } from "react-bootstrap";
import * as yup from 'yup';
import './style.css';
import { searchPhotos } from '../../actions';
import { useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
let page = 1;
const schema = yup.object({
  query: yup.string().required('Query is required'),
});
const Search = () => {
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
  };
  const handleSubmit = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const data = {
      q: encodeURIComponent(evt.query),
      image_type: 'photo',
      page
    }
    const response = await searchPhotos(data);
    let photos = [];
    response.data.results.map((i) => {
      const item = {
          "src": i.urls.regular,
          "width": window.innerWidth / 8,
          "height": 300
      }
      photos.push(item);
    })    
    setTotalHits(response.headers["x-total"]);
    setItems(photos);
    setKeyword(evt.query);
  }
  const getMorePhotos = async () => {
    page++;
    const data = {
      q: encodeURIComponent(keyword),
      image_type: 'photo',
      page
    }
    const response = await searchPhotos(data);
    let photos = [];
    response.data.results.map((i) => {
      const item = {
          "src": i.urls.regular,
          "width": window.innerWidth / 8,
          "height": 300
      }
      photos.push(item);
    })    
    setTotalHits(response.headers["x-total"]);
    setItems(items.concat(photos));
  }
return (
    <div className="ImageSearchPage">
      <Formik
        initialValues={{ query: ''}}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
            <Form noValidate onSubmit={handleSubmit}>
              
                <Form.Group as={Col} md="12" className="mb-3" controlId="firstName">
                  <Form.Label>
                    <h4>Image Search</h4>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="query"
                    placeholder="Keyword"
                    value={values.query}
                    onChange={handleChange}
                    isInvalid={touched.description && errors.query}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.query}
                  </Form.Control.Feedback>
                </Form.Group>
              
              <Button type="submit">Search</Button>
            </Form>
          )}
      </Formik>
      <InfiniteScroll
        pageStart={page}
        loadMore={getMorePhotos}
        hasMore={totalHits > items.length}
        threshold={100}
      >
        <div>
          <Gallery photos={items} onClick={openLightbox} />
          <ModalGateway>
              {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                  <Carousel
                  currentIndex={currentImage}
                  views={items.map(x => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title
                  }))}
                  />
              </Modal>
              ) : null}
          </ModalGateway>
          </div>
      </InfiniteScroll>
    </div>
  );
}
export default Search;