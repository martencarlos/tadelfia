"use client";
import { useState } from "react";
import styles from "./carousel.module.css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";

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
