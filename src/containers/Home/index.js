import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './style.css';
import InfiniteScroll from 'react-infinite-scroller';
import { getPhotos } from '../../actions';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

let page = 0;

const Home = () => {
    const [items, setItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
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
    const getNewPhotos = async () => {
        page++;
        const response = await getPhotos(page);
        let photos = [];
        response.data.map((i) => {
            const item = {
                "src": i.urls.regular,
                "width": window.innerWidth / 8,
                "height": 300
            }
            photos.push(item);
        })
        setItems(items.concat(photos));
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
export default Home;