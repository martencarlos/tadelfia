

"use client";
import { useEffect, useState } from "react";
import styles from "./carousel.module.css";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";


let slideIndex = 0;
let slideshowActive = true;
 // Next/previous controls
 function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  
  if(n === undefined && slideshowActive) {
    let i;
    let slides = document.querySelectorAll("[class*=carouselImg]")
    // console.log(slides);
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";

    setTimeout(() => {
      showSlides()
    }, 5000);
  } else {
    //button pressed
    slideshowActive = false;
    let i;
    let slides = document.querySelectorAll("[class*=carouselImg]")

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
   
  }

}

function Carousel() {
  //start slideshow
  useEffect(() => {
      showSlides()
    }, []);

  return (
    <div className={styles.carousel}>

        <Image
          src={"/mainGallery/1.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          style={{display: "block"}}
          fill
        />
        <Image
          src={"/mainGallery/2.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/4.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/5.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/6.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/7.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/8.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/9.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/10.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />
        <Image
          src={"/mainGallery/11.webp"}
          id="carouselImg"
          alt="gallery"
          className={styles.carouselImg}
          priority
          fill
        />

      <div className={styles.previous} onClick={()=>plusSlides(-1)}>
        <BsChevronLeft />
      </div>
      <div className={styles.next } onClick={()=>plusSlides(1)}>
        <BsChevronRight />
      </div>
    </div>
  );
}

export default Carousel;



  // const [selectedImageSrc, setSelectedImageSrc] = useState("/maingallery/1.webp");
  // const [selectedImageId, setSelectedImageId] = useState(1);
  // // const [loadingImage, setLoadingImage] = useState(true);

  // const previousImage = () => {

  //   if (selectedImageId > 1) {
  //     const nextImgSrc =
  //       "/maingallery/" + (selectedImageId - 1) + ".webp";
  //     setSelectedImageId(selectedImageId - 1);
  //     setSelectedImageSrc(nextImgSrc);
  //   }
  // };

  // const nextImage = () => {
  //   if (selectedImageId < 16) {
  //     const nextImgSrc =
  //       "/maingallery/" + (selectedImageId + 1) + ".webp";
  //     setSelectedImageId(selectedImageId + 1);
  //     setSelectedImageSrc(nextImgSrc);
  //   }
  // };