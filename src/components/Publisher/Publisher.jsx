import React, { useEffect, useState } from "react";
import "./publisher.scss";
import { BASE_URL, FILE_PATH } from "../../api/config";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

const Publisher = () => {
  const [yayinevi, setYayinevi] = useState([]);

  const getPublisher = async () => {
    await fetch(BASE_URL + "publisher/getall")
      .then((a) => a.json())
      .then((data) => setYayinevi(data));
  };

  useEffect(() => {
    getPublisher();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div id="publisher">
      <div className="container">
        <div className="publish">
          <div className="yayin">
            <div className="text">Yayin evleri</div>
          </div>
          <div className="bottom">
            <Carousel responsive={responsive}>
              {
                yayinevi &&
                yayinevi.map((e) => (
                  <div className="box">
                    <div className="image">
                      <Link to={'/yayinevi/' + e.id}>
                        <img
                          className="pub-image"
                          src={`${FILE_PATH}${e.photoURL}`}
                          alt=""
                          width="100"
                          height="100"
                        />
                      </Link>
                      <p>{e.name}</p>
                    </div>
                  </div>
                ))
              }
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publisher;
