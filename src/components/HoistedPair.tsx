"use client";
import OfferTables from "@/components/OfferTables";
import PlaceBidThingy from "@/components/PlaceBidThingy";
import {useState} from "react";
import {backend} from '@/constants';

const HoistedPair = (
    {
        listingId ,
        suggestedMinimumBid ,
        highestBid ,

    }:{
        listingId: number,
        suggestedMinimumBid: number,
        highestBid: number,
    }
) => {
    const [updated, setUpdated] = useState(false);


    return (
    <>
    <div className="bg-white rounded-lg p-4 mb-4 w-full">
                            <p className="text-lg font-medium mb-2">Your Offer</p>
                            <OfferTables setUpdated={setUpdated} updated={updated}  listingId={listingId}></OfferTables>
                        </div>
                        <div className="flex justify-center"><PlaceBidThingy setUpdateFlag={setUpdated} productId={listingId} curr={highestBid?highestBid:suggestedMinimumBid} delta={(highestBid?highestBid:suggestedMinimumBid)/20} min={10} max={10000}></PlaceBidThingy></div>

    </>

    );
}

export default HoistedPair;