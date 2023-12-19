import React, { useState, useEffect } from "react";

import axios from "@src/api/axios.js";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CContainer,
  CRow,
} from "@coreui/react";
import PhotoAlbum from "react-photo-album";

function renameProperty(artwork) {
  // eslint-disable-next-line no-prototype-builtins
  if (artwork.hasOwnProperty("image")) {
    artwork.width = 4;
    artwork.height = 3;
    artwork.src = import.meta.env.VITE_API_URL + artwork.image;

    delete artwork.image;
  }
}
const Media = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllArtworks = async () => {
      const artworks = await axios.get("http://localhost:3000/api/artworks");
      setPhotos(artworks.data);
    };

    getAllArtworks();
  }, []);

  photos.forEach(renameProperty);
  console.log(photos);

  // import.meta.env.VITE_API_URL

  // Function to rename property from "image" to "src"

  // Iterate through the array and call the function for each artwork
  return (
    <CContainer>
      <PhotoAlbum layout="columns" photos={photos} />
    </CContainer>
  );
};

export default Media;
