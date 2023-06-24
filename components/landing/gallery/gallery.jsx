"use client"
import React, { useState } from 'react'
import styles from './gallery.module.css'
import Image from 'next/image'
import { BsXLg } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";



function Gallery() {

    const [selectedImageSrc, setSelectedImageSrc] = useState(null)
    const [selectedImageId, setSelectedImageId] = useState(null)
    
    function closeModal(e) {

        const modal = document.getElementById("imgModal")
        modal.style.display = "none"
    }

    function openModal(e) {
        
        const modal = document.getElementById("imgModal")
        if (e.target.tagName === "IMG" && (modal.style.display === "none" || modal.style.display === "") ) {
            setSelectedImageSrc(e.target.src)
            setSelectedImageId(e.target.id)
            modal.style.display = "flex"
        }
    }

    const previousImage = () => {
        if(selectedImageId >  1){
            const nextImgSrc = "/maingallery/"+(parseInt(selectedImageId)-1)+".webp"
            setSelectedImageId(parseInt(selectedImageId)-1)
            setSelectedImageSrc(nextImgSrc)
        }
    }

    const nextImage = () => {
        if(selectedImageId <  16){
            const nextImgSrc = "/maingallery/"+(parseInt(selectedImageId)+1)+".webp"
            setSelectedImageId(parseInt(selectedImageId)+1)
            setSelectedImageSrc(nextImgSrc)
        }
            
    }


  return (
    <div className={styles.gallery}>
        <h1 className={styles.h1}>{"Gallery"}</h1>
        <div onClick={openModal} className={styles.galleryContainer}>
        {/* Image modal - hidden */}
        <div id="imgModal" className={styles.modal}>
            <div className={styles.galleryContainer}>
                <Image
                    src={selectedImageId ? selectedImageSrc : "/maingallery/1.webp"}
                    alt="Exterior pool view of a villa"
                    className={styles.modalImage}
                    width={2000}
                    height={1800}
                />
                <div className={styles.closeButton} onClick={closeModal}>
                    <BsXLg />
                </div>
                <div className={styles.previous} onClick={previousImage}>
                    <BsChevronLeft />
                </div>
                <div className={styles.next} onClick={nextImage}>
                    <BsChevronRight />
                </div>
               
            </div>
          
        </div>
        <div className={styles.column}>
            <Image
                id='1'
                src="/maingallery/1.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='5'
                src="/maingallery/5.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='6'
                src="/maingallery/6.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='7'
                src="/maingallery/7.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='2'
                src="/maingallery/2.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='8'
                src="/maingallery/8.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='9'
                src="/maingallery/9.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='10'
                src="/maingallery/10.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='3'
                src="/maingallery/3.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='11'
                src="/maingallery/11.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='12'
                src="/maingallery/12.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='13'
                src="/maingallery/13.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='4'
                src="/maingallery/4.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='14'
                src="/maingallery/14.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='15'
                src="/maingallery/15.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
            <Image
                id='16'
                src="/maingallery/16.webp"
                alt="Exterior pool view of a villa"
                className={styles.galleryImage}
                width={250}
                height={250}
            />
        </div>
        </div>
    </div>
  )
}

export default Gallery