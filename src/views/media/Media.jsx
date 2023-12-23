/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import axios from "@src/api/axios.js";

import PhotoAlbum from "react-photo-album";

function renameProperty(artwork) {
  // eslint-disable-next-line no-prototype-builtins
  if (artwork?.hasOwnProperty("image")) {
    artwork.width = 4;
    artwork.height = 3;
    artwork.src = import.meta.env.VITE_API_URL + artwork.image;

    delete artwork.image;
  }
}

// const RenderArtworks = ({ photos }) => {
//   return (
//     <>
//       {photos.map((artwork) => {
//         return (
//           <CCol key={artwork.createdAt}>
//             <CCard style={{ width: "18rem" }}>
//               <CCardImage
//                 orientation="top"
//                 src={import.meta.env.VITE_API_URL + artwork.image}
//               />
//               <CCardBody>
//                 <CCardTitle>{artwork.title}</CCardTitle>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         );
//       })}
//     </>
//   );
// };

const Media = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getAllArtworks = async () => {
      const artworks = await axios.get("http://localhost:3000/api/artworks");
      setArtworks(artworks.data);
    };

    getAllArtworks();
  }, []);
  
  artworks.forEach(renameProperty)
  return (
    <CContainer>
      {/* <CRow>
        <RenderArtworks photos={photos} />
      </CRow> */}
      <PhotoAlbum layout="columns" photos={artworks} />
    </CContainer>
  );
};

export default Media;
