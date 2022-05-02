import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
import { getPhotos } from '../../actions';

let page = 0;

const Home = () => {
    const [items, setItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
const getNewPhotos = async () => {
        page++;
        const response = await getPhotos(page);
        setItems(items.concat(response.data));
        setTotalHits(response.headers["x-total"]);
        setInitialized(true);
    }
useEffect(() => {
        if (!initialized) {
            getNewPhotos();
        }
    });
return (
        <div className="HomePage">
            Total Number of photos: {totalHits}
            <InfiniteScroll
                pageStart={page}
                loadMore={getNewPhotos}
                hasMore={totalHits > items.length}
                threshold={100}
            >
                {items.map((i, index) =>
                    <Figure key={index}>
                        <Figure.Image
                            width={window.innerWidth / 8}
                            height="300"
                            src={i.urls.thumb}
                        />
                    </Figure>
                )}
            </InfiniteScroll>
        </div>
    );
}
export default Home;