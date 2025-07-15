import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const setFavicon = (url) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = url;
    };
    const setTitle = (newTitle) => {
      let title = document.querySelector("title");
      if (!title) {
        title = document.createElement("title");
        title.innerText = newTitle;
        document.head.appendChild(title);
      }
      title.innerText = newTitle;
    };
    setTitle("Algo ERP");
    setFavicon("https://demo.algosofttech.com/admin/assets/img/fav-icon.png");
    return () => {
      setTitle("ALGO ERP");
      setFavicon(
        "https://demo.algosofttech.com/admin/assets/img/logo-small.png"
      );
    };
  }, []);
};

export default Home;
