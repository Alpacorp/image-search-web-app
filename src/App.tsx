import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  const Access_Key =
    process.env.REACT_APP_ACCESS_KEY ||
    "up18yhD-quVFgSoaLTvbbtceusj7lCucb7E6vzOEtAQ";

  const Submit = () => {
    fetchRequest();
    setImg("");
  };

  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?query=${img}&client_id=${Access_Key}&per_page=20`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    // console.log(result);

    setRes(result);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center input">
          <input
            className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 boder-dark"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Search anything ..."
          />
          <button
            type="submit"
            onClick={Submit}
            className="btn bg-dark text-white fs-3 mx-3"
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-evenly flex-wrap image-result">
        {res.map((val: any) => {
          return (
            <img
              key={val.id}
              className="col-3 img-fluid img-thumbnail"
              src={val.urls.full}
              alt={val.alt_description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
