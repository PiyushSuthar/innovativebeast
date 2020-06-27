import React, { useState, useEffect } from "react";
import Card from "../components/card";

export default function Cards() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [LoadMoreButton, setLoadMoreButton] = useState("Load More");
  const [pointer, setPointer] = useState("auto");

  function loadMore() {
    setPage(prePage => prePage + 1);
  }

  useEffect(() => {
    var perPage = "9";
    var baseUrl = "https://innovativebeast.com";

    if (LoadMoreButton === "No More Left") {
      return;
    }
    fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`)
      .then(res => {
        if (res.status === 400) {
          setLoadMoreButton("No More Left");
          setPointer("none");
          return { str: "no" };
        } else {
          return res.json();
        }
      })
      .then(data => {
        // if (data.status === 400) {
        //   setLoadMoreButton("No More Left");
        //   return;
        // }
        if (data.str === "no") {
          return;
        }
        setPosts(value => value.concat(data));
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [page]);

  if (isLoading === true) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {posts.map((value, index) => (
            <Card set={value} key={index} />
          ))}
        </div>
        <button
          style={{
            padding: "15px",
            margin: "10px",
            pointerEvents: { pointer }
          }}
          onClick={loadMore}
        >
          {LoadMoreButton}
        </button>
      </>
    );
  }
}
