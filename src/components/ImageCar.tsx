"use client";
import {backend} from '@/constants';
import {useState} from "react";

export default function ImageCar({images, className, height}:{
    images: string[],
    className: string,
    height?: string,
}) {
    const [currentImage, setCurrentImage] = useState(0);
    const [prevImage, setPrevImage] = useState(0);
    return <div className={`${className}`}>
        <div className=" mb-2 bg w-full"><img width="100%" src={images[currentImage]}/></div>
        <div className={(height?height:" h-16 ")+"flex flex-row w-full overflow-x-scroll justify-start gap-1 items-center"}>
            {images.map((image, index) => <img key={index} src={image} className="h-full" onMouseOver={()=> {
                setCurrentImage(index)
            }} onMouseLeave={
                ()=>{
                    setCurrentImage(prevImage)
                }
            } onClick={() => {
                setCurrentImage(index)
                setPrevImage(index)
            }
            }/>)}
        </div>
    </div>
}