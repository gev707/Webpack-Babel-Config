// import * as $ from "jquery";
import React from "react";
import { render } from "react-dom";
// import { Post } from "./js/Post.js";
// import jsonFile from "./assets/jsonFile.json";
// import xml from "./assets/form.xml";
// import csv from "./assets/file.csv";
// import data from "./assets/jsonFile.json";
//import something from "./js/babel.js";
import "../src/styles/main.scss";

//const post = new Post(jsonFile.title);

// $(".para").html(post.toString());
//something();

// console.log("XML", xml);
// console.log("CSV", csv);
// console.log("JSON", data);

const App = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="./assets/icon.png" alt=""/>
        </div>
        <nav className="nav">
          <ul className="nav__items">
            <li className="nav__items__item">
              <a href="index.html">Home</a>
            </li>
            <li className="nav__items__item">
              <a href="about.html">About</a>
            </li>
            <li className="nav__items__item">
              <a href="blog.html">Blog</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <h1>Webpack Config App</h1>
        <hr/>
        <div className="webpack">
          <div className="webpack__bg">
            <div className="webpack__logo">
              <img src="./assets/icon.png" alt=""/>
            </div>
          </div>
          <div className="webpack__intro">
            <h2>JSON DATA WEBPACK</h2>
            <p className="para">
              A variety of interfaces are available to customize the compilation
              process. Some features overlap between interfaces, e.g. a
              configuration option may be available via a CLI flag, while others
              exist only through a single interface. The following high-level
              information should get you started.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

render(<App/>, document.getElementById("root"));
