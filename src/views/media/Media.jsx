/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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

import axios from "@src/api/axios.js";
import PhotoAlbum from "react-photo-album";

// function renameProperty(artwork) {
//   // eslint-disable-next-line no-prototype-builtins
//   if (artwork.hasOwnProperty("image")) {
//     artwork.width = 4;
//     artwork.height = 3;
//     artwork.src = import.meta.env.VITE_API_URL + artwork.image;

//     delete artwork.image;
//   }
// }

// iterate the following and render

const RenderArtworks = ({ photos }) => {
  return (
    <div>
      {photos.map((artwork) => {
        return (
          <CContainer key={artwork.createdAt}>
            <CRow sm="auto">
              <CCard style={{ width: "18rem" }}>
                <CCardImage
                  orientation="top"
                  src={import.meta.env.VITE_API_URL + artwork.image}
                />
                <CCardBody>
                  <CCardTitle>Card title</CCardTitle>
                  <CCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </CCardText>
                  <CButton href="#">Go somewhere</CButton>
                </CCardBody>
              </CCard>
            </CRow>
          </CContainer>
        );
      })}
    </div>
  );
};

const Media = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAllArtworks = async () => {
      const artworks = await axios.get("http://localhost:3000/api/artworks");
      setPhotos(artworks.data);
    };

    getAllArtworks();
  }, []);

  // photos.forEach(renameProperty);

  return (
    <CContainer>
      {/* <PhotoAlbum layout="columns" photos={photos} /> */}
      <RenderArtworks photos={photos} />
    </CContainer>
  );
};

export default Media;
