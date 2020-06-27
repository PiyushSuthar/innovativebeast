import React from "react";
import { Link } from "react-router-dom";

export default function Card({ set }) {
  const { title, excerpt, slug } = set;
  function decodeHTMLEntities(text) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }
  return (
    <div
      className="card"
      style={{
        maxWidth: "26%",
        textAlign: "left",
        margin: "10px",
        padding: "20px",
        boxShadow: "0 2px 10px 0 rgba(0,0,0,0.15)"
      }}
    >
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/post/${slug}`}
      >
        <h1
          style={{ fontSize: "25px" }}
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        />
      </Link>
      <div>
        {decodeHTMLEntities(excerpt.rendered.substring(0, 100).substr(3))}...
      </div>
      <br />
      <Link to={`/post/${slug}`} style={{ marginTop: "10px!important" }}>
        <button style={{ padding: "10px" }}>Read Article</button>
      </Link>
    </div>
  );
}
