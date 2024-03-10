"use client";
import {useRef, useState} from "react";
import ScrollIntoView from 'react-scroll-into-view'
import 'dotenv'
import {backend} from '@/constants';
interface ProductCardProps {
    images: string[];
    productName: string;
    location: string;
    initialBid: number;
    userBidIfAny: number;

}

const ProductCard = () => {
    const img4 = useRef(null);
    const [BidAmt, setBidAmt] = useState(100)
    return (
    <>
        <div className="border border-black bg-white">

            <div className="flex-row flex overflow-x-scroll snap-x w-80 no-scrollbar snap-mandatory">
                <img  src="/prodcutImage1.png" id="image1" className="snap-center m-2 h-72" />
                <img src="/ProductImage2.png" className="snap-center m-2 h-72" />
                <img src="/prodcutImage1.png" className="snap-center m-2 h-72" />
                <img src="/ProductImage2.png" className="snap-center m-2 h-72" />
                <img src="/prodcutImage1.png" className="snap-center m-2 h-72" />
            </div>{/*image scrolly-bit*/}
            <div className="flex flex-row justify-between px-3 py-1 h-28">
                <div className="flex flex-col justify-evenly">
                    <h1 className="text-xl font-bold ">Product Name</h1>
                    <h2 className="text-xs">BH1</h2>
                    <a className="text-sm font-semibold text-blue-800 hover:text-purple-950">More Info</a>
                </div>{/*left aligned product name\n location \n more info> bit*/}
                <div className="flex flex-row justify-items-end      px-3 py-0 h-28">
                    <div className="relative px-0 py-4 h-fit grid grid-rows-2 grid-cols-4 gap-1">
                        <div className="bg-blue-300 hover:bg-blue-400 text-xl flex justify-center items-center text-white w-8 rounded-md" onClick={() => { setBidAmt(BidAmt - 50) }}>-</div>
                        <div className="bg-gray-300 flex justify-center items-center rounded-md col-span-2">{BidAmt + "$"}</div>
                        <div className="bg-blue-300 hover:bg-blue-400 text-xl flex justify-center items-center text-white rounded-md" onClick={() => { setBidAmt(BidAmt + 50) }}><img src="/plusIcon.png" width="15"/></div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs text-center rounded col-span-4">Place Bid</button>
                    </div>
                </div>

                {/*right aligned bid-selector and place offer button*/}
            </div>{/*bottom bit*/}
        </div>
    </>
    );
}

export default ProductCard;