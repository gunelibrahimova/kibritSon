import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { BASE_URL, FILE_PATH } from '../../api/config';
import { addToCart, fetchBook } from '../../redux/Reducer/cartSlice';
import './PublisherDetail.scss';
import { addToFavories } from '../../redux/Reducer/favoriteSlice';

const PublisherDetail = () => {
    const { id } = useParams();
    const [publisher, setPublisher] = useState([]);
    const data = useSelector(state => state.cart.data.message);
    const dispatch = useDispatch();

    const getPublisher = async () => {
        await fetch(BASE_URL + "publisher/getbyid/" + id)
            .then((res) => res.json())
            .then((data) => setPublisher(data.message));
    };

    useEffect(() => {
        getPublisher();
        dispatch(fetchBook());
    }, [dispatch]);

    const notify = () =>
        toast(
            <Link to="/cart" style={{ textDecoration: "none" }}>
                "Product added to cart !"
            </Link>
        );

    return (
        <div id='publisherdetail'>
            <div className="top">
                <div className="box">
                    <div className="bottom">
                        <h1>Yayin evi : {publisher.name}</h1>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="container">
                    <div className="row">
                        <div className="book">
                            <div className="row">
                                {
                                    data &&
                                    data.filter((x) => x.publisherName === publisher.name)
                                        .map((book) => (
                                            <div className="col-lg-4">
                                                <div className="box">
                                                    <div className="image" key={book.id}>
                                                        <Link to={"/book/" + book.id}>
                                                            <img
                                                                src={`${FILE_PATH}${book.bookCover}`}
                                                                alt="kitab"
                                                            />
                                                        </Link>
                                                        <div className="icons">
                                                            <i className="fa-solid fa-heart icon" onClick={() => dispatch(addToFavories(book))}></i>
                                                            <br />
                                                            <i className="fa-solid fa-bag-shopping icon" onClick={() => dispatch(addToCart(book))}></i>
                                                        </div>
                                                    </div>
                                                    <div className="text">
                                                        <span className="box1 super">{book.name}</span>
                                                        <span>Janr : {book.genreName}</span> <br />
                                                        <span>Yazar : {book.authorName}</span>
                                                        <span className="box1 number">
                                                            {
                                                                book.isSale === true ? (
                                                                    <>
                                                                        <span>
                                                                            <del> {book.price} ₼</del>
                                                                        </span>
                                                                        <span style={{ marginLeft: "10px" }}>
                                                                            {book.salePrice} ₼
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>
                                                                            {book.price} ₼
                                                                        </span>
                                                                    </>
                                                                )
                                                            }
                                                        </span>
                                                        <span className="sebet" onClick={() => {
                                                            dispatch(addToCart(book));
                                                            notify()
                                                        }}>Səbətə at</span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublisherDetail