import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, fetchBook } from "../../redux/Reducer/cartSlice";
import { BASE_URL, FILE_PATH } from "../../api/config";
import "./allBook.scss";

const AllBook = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cart.data.message);
    const [query, setQuery] = useState("");
    const [janr, setJanr] = useState([]);
    const [yazici, setYazici] = useState([]);
    const [dil, setDil] = useState([]);
    const [yayinevi, setYayinevi] = useState([]);
    const [books, setBooks] = useState(data);

    const getGenre = async () => {
        await fetch(BASE_URL + "genre/getall")
            .then((response) => response.json())
            .then((data) => setJanr(data));
    };

    const getAuthor = async () => {
        await fetch(BASE_URL + "Author/getall")
            .then((response) => response.json())
            .then((data) => setYazici(data));
    };

    const getLanguage = async () => {
        await fetch(BASE_URL + "language/getall")
            .then((response) => response.json())
            .then((data) => setDil(data));
    };

    const getPublisher = async () => {
        await fetch(BASE_URL + "publisher/getall")
            .then((response) => response.json())
            .then((data) => setYayinevi(data));
    };

    const filterGenre = (genreItem) => {
        const result = data.filter((e) => {
            return e.genreName === genreItem;
        });
        setBooks(result);
    };

    const filterAuthor = (authorItem) => {
        const result = data.filter((e) => {
            return e.authorName === authorItem;
        });
        setBooks(result);
    };

    const filterLanguage = (languageItem) => {
        const result = data.filter((e) => {
            return e.languageName === languageItem;
        });
        setBooks(result);
    };

    const filterPublisher = (publisherItem) => {
        const result = data.filter((e) => {
            return e.publisherName === publisherItem;
        });
        setBooks(result);
    };

    useEffect(() => {
        getGenre();
        getAuthor();
        getLanguage();
        getPublisher();
        dispatch(fetchBook()).then(() => {
            setBooks(data);
        });
    }, []);


    const notify = () =>
        toast(
            <Link to="/cart" style={{ textDecoration: "none" }}>
                "Product added to cart !"
            </Link>
        );

    return (
        <>
            <hr />
            <div id="allBook">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <input
                                type="text"
                                placeholder="Kitab adı, yazar və ya yayınevi axtar..."
                                className="search"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                onClick={() => setBooks(data)}
                                className="text-center"
                            >
                                Bütün kitablara bax
                            </button>
                            <div className="categories" style={{ marginTop: "10px" }}>
                                <div className="row">
                                    <span className="span">Janrlar</span>
                                    {janr &&
                                        janr.map((e, index) => (
                                            <span
                                                onClick={() => filterGenre(e.name)}
                                                key={index}
                                            >
                                                {e.name}
                                            </span>
                                        ))}
                                </div>
                                <hr />
                            </div>
                            <div className="categories">
                                <div className="row justify-content-between">
                                    <span className="span">Yazıçılar</span>
                                    {yazici &&
                                        yazici.map((e, index) => (
                                            <span
                                                onClick={() => filterAuthor(e.name)}
                                                key={index}
                                            >
                                                {e.name ? e.name : "Belə bir kitab tapılmadı."}
                                            </span>
                                        ))}
                                </div>
                                <hr />
                            </div>
                            <div className="categories">
                                <div className="row justify-content-between">
                                    <span className="span">Dillər</span>
                                    {dil &&
                                        dil.map((e, index) => (
                                            <span
                                                onClick={() => filterLanguage(e.name)}
                                                key={index}
                                            >
                                                {e.name}
                                            </span>
                                        ))}
                                </div>
                                <hr />
                            </div>
                            <div className="categories">
                                <div className="row justify-content-between">
                                    <span className="span">Yayın evləri</span>
                                    {yayinevi &&
                                        yayinevi.map((e, index) => (
                                            <span
                                                onClick={() => filterPublisher(e.name)}
                                                key={index}
                                            >
                                                {e.name}
                                            </span>
                                        ))}
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="book">
                                <div className="row">
                                    {books && books.length > 0 ? (
                                        books
                                            .filter(
                                                (book) =>
                                                    book.name.toLowerCase().includes(query) ||
                                                    book.genreName.toLowerCase().includes(query) ||
                                                    book.authorName.toLowerCase().includes(query)
                                            )
                                            .map((book) => (
                                                <div className="col-lg-4" key={book.id}>
                                                    <div className="box">
                                                        <div className="image">
                                                            <Link to={"/book/" + book.id}>
                                                                <img
                                                                    src={`${FILE_PATH}${book.bookCover}`}
                                                                    width="100%"
                                                                    height="900px"
                                                                    alt="kitab"
                                                                />
                                                            </Link>
                                                            <div className="icons">
                                                                <i className="fa-solid fa-heart icon"></i>
                                                                <br />
                                                                <i
                                                                    className="fa-solid fa-bag-shopping icon"
                                                                    onClick={() => dispatch(addToCart(book))}
                                                                ></i>
                                                            </div>
                                                        </div>
                                                        <div className="text">
                                                            <span className="box1 super">{book.name}</span>
                                                            <span>Janr : {book.genreName}</span> <br />
                                                            <span>Yazar adi : {book.authorName}</span>
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
                                                            <span
                                                                className="sebet"
                                                                onClick={() => {
                                                                    dispatch(addToCart(book));
                                                                    notify();
                                                                }}
                                                            >
                                                                Səbətə at
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="col-lg-12">
                                            <div className="box">
                                                <div className="text">
                                                    <h2 className="text-center">
                                                        Belə bir kitab tapılmadı.
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllBook;
