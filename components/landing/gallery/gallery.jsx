"use client"
import  { useState } from 'react'
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
            setSelectedImageSrc("/maingallery/"+e.target.id+".webp")
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
            <div className={styles.carousel}>
                {selectedImageSrc &&
                <Image
                    src={selectedImageSrc}
                    alt="gallery"
                    className={styles.modalImage}
                    priority
                    placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                    fill
                />}
                
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
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                width={144}
                height={104}
                
            />
         
            <Image
                id='5'
                src="/maingallery/5.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='6'
                src="/maingallery/6.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='7'
                src="/maingallery/7.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='2'
                src="/maingallery/2.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='8'
                src="/maingallery/8.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='9'
                src="/maingallery/9.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='10'
                src="/maingallery/10.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='3'
                src="/maingallery/3.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='11'
                src="/maingallery/11.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='12'
                src="/maingallery/12.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='13'
                src="/maingallery/13.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
        </div>
        <div className={styles.column}>
            <Image
                id='4'
                src="/maingallery/4.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='14'
                src="/maingallery/14.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='15'
                src="/maingallery/15.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
            <Image
                id='16'
                src="/maingallery/16.webp"
                alt="Exterior pool view of a villa"
                placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                className={styles.galleryImage}
                width={144}
                height={104}
            />
        </div>
        </div>
    </div>
  )
}

export default Gallery