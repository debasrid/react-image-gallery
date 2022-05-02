import React from 'react';
import { Formik } from 'formik';
import { Col, Row, Form, Button } from "react-bootstrap";
import * as yup from 'yup';
import './style.css';
import { searchPhotos } from '../../actions';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
let page = 1;
const schema = yup.object({
  query: yup.string().required('Query is required'),
});
const Search = () => {
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [keyword, setKeyword] = useState('');
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
    setTotalHits(response.headers["x-total"]);
    setItems(response.data.results);
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
    setTotalHits(response.headers["x-total"]);
    setItems(items.concat(response.data.results));
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
        {items.map((i, index) =>
          <Figure key={index}>
            <Figure.Image
              width={window.innerWidth / 10}
              height="300"
              src={i.urls.thumb}
            />
          </Figure>
        )}
      </InfiniteScroll>
    </div>
  );
}
export default Search;