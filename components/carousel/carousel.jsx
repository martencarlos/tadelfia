"use client";
import { useState } from "react";
import styles from "./carousel.module.css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";

//image placeholder functions
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

function Carousel() {
  const [selectedImageSrc, setSelectedImageSrc] = useState("/maingallery/1.webp");
  const [selectedImageId, setSelectedImageId] = useState(1);

  const previousImage = () => {

    if (selectedImageId > 1) {
      const nextImgSrc =
        "/maingallery/" + (selectedImageId - 1) + ".webp";
      setSelectedImageId(selectedImageId - 1);
      setSelectedImageSrc(nextImgSrc);
    }
  };

  const nextImage = () => {

    if (selectedImageId < 16) {
      const nextImgSrc =
        "/maingallery/" + (selectedImageId + 1) + ".webp";
      setSelectedImageId(selectedImageId + 1);
      setSelectedImageSrc(nextImgSrc);
    }
  };

  return (
    <div className={styles.carousel}>
    
        <Image
          src={selectedImageSrc}
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          
        />
      

      <div className={styles.previous} onClick={previousImage}>
        <BsChevronLeft />
      </div>
      <div className={styles.next} onClick={nextImage}>
        <BsChevronRight />
      </div>
    </div>
  );
}

export default Carousel;
