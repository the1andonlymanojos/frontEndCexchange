import ImageCar from "@/components/ImageCar";
import { Minus, Plus } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import PlaceBidThingy from "@/components/PlaceBidThingy";
import {getServerSideProps} from "next/dist/build/templates/pages";
import OfferTables from "@/components/OfferTables";
import HoistedPair from "@/components/HoistedPair";
import {backend} from '@/constants';

/*
{
    "id": 12,
    "title": "crack",
    "images": [
        "http://localhost:3000/uploads/listings/thumbnails/iuwinpmoeqtxbbx.png",
        "http://localhost:3000/uploads/listings/thumbnails/gsxotkadwmlbtpi.png"
    ],
    "location": null,
    "suggested_minimum_bid": 79.99,
    "description": "sweet sweet bliss",
    "ext_link": null,
    "creator_id": 1,
    "availability": "available",
    "highest_bid": null,
    "offers": []
}
*/
const page = async ({params}:{params: {
        listingid: number;
        slug: string}}) =>{
    const listingId = params.listingid;

    const endPoint = `${backend}api/listings/${listingId}`;

    const res = await fetch(endPoint,{
        method: "GET",
        cache: "no-cache",

    });
    if (res.status !== 200) {
        return <div>Failed to fetch</div>
        //in future make an error page and redirect users to that
    }
    const body = await res.json();
    console.log(body);
    const randomImages = body.images;
    const title = body.title;
    const location = body.location;
    const suggestedMinimumBid = body.suggested_minimum_bid;
    const description = body.description;
    const highestBid = body.highest_bid;



    //query backend for listing information, use @/utils/getListing
    return <>
        <div className="max-sm:yeet">
            <div className="flex flex-row justify-evenly items-start bg-gray-100 rounded-lg p-6 shadow-md">
                <div className="flex flex-row justify-center mb-6">
                    <ImageCar images={randomImages} className="m-5 w-[30vw]"></ImageCar>
                </div>
                <div className="flex mt-5 flex-col items-baseline h-full w-[30vw]">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{title}</h1>
                            <p className="text-lg font-medium mb-10">{location}</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium mb-4">Description<br/>
                                {description}
                            </p>
                            <p className="text-lg font-medium mb-6">{highestBid?`Highest bid: ${highestBid}`:`Suggested Minimum Bid: ${suggestedMinimumBid}`}</p>
                        </div>
                        {
                            // <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                            //     Place Bid
                            // </button>
                        }
                        <PlaceBidThingy productId={listingId} curr={highestBid?highestBid:suggestedMinimumBid} delta={(highestBid?highestBid:suggestedMinimumBid)/20} min={10} max={10000}></PlaceBidThingy>


                    </div>


                </div>
                <div className="flex w-[25vw] max-w-96 min-w-52 flex-col items-center w-full">

                    <div className="bg-white rounded-lg p-4 mb-4 w-full">
                        <p className="text-lg font-medium mb-2">Your Offer</p>
                        {listingId ? <OfferTables  listingId={listingId}></OfferTables>:<div>Invalid ID</div>}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 w-full">
                <p className="text-lg font-medium mb-2">Posted By</p>
                {/* Add posted by information here */}
            </div>

        </div>

    <div className="sm:yeet">
<h1 className="text-3xl font-bold m-5 mb-2">{title}</h1>
<p className="text-lg font-medium mt-2 ml-5 mr-2 mb-6">{location}</p>
        <ImageCar images={randomImages} className="p-5 w-full"></ImageCar>
        <p className="text-lg font-medium mt-5 ml-5 mr-2 mb-4">Description<br/>
            {description}
        </p>
        <p className="text-lg font-medium mt-5 ml-5 mr-2 mb-6">Suggested Minimum Bid: {suggestedMinimumBid} </p>
        <div>
            <HoistedPair listingId={listingId} suggestedMinimumBid={suggestedMinimumBid} highestBid={highestBid}></HoistedPair>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 w-full">
            <p className="text-lg font-medium mb-2">Posted By</p>
            {/* Add posted by information here */}
        </div>
    </div>
    </>
}

export default page;