import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const [result, setResult] = useState({});
  const [Load, setLoad] = useState(true);
  const [is404, set404] = useState(false);

  const baseUrl = "https://innovativebeast.com";

  useEffect(
    function() {
      fetch(`${baseUrl}/wp-json/wp/v2/posts?slug=${id}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            set404(true);
            return { str: "no" };
          }
        })
        .then(data => {
          if (data.str === "no") {
            set404(true);
            return;
          } else {
            setResult(data);
            setLoad(false);
            set404(false);
          }
        })
        .catch(error => {
          setLoad(false);
          set404(true);
          setResult(error);
        });
    },
    [id]
  );
  if (Load === true) {
    return <h1>Loading</h1>;
  } else {
    if (is404 === false) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <hr width="90%" />
          <h1 dangerouslySetInnerHTML={{ __html: result[0].title.rendered }} />
          <div
            className="postContent"
            dangerouslySetInnerHTML={{ __html: result[0].content.rendered }}
          />
        </div>
      );
    } else {
      return <h1>404</h1>;
    }
  }
}
