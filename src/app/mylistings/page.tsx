"use client";

/* example response from the fetch request
{
    "message": "success",
    "offers": [
        {
            "id": 74,
            "amount": 2296,
            "created_at": "2024-03-09T09:30:38.000Z",
            "expires_at": "2024-03-10T09:30:38.000Z",
            "listing_id": 15,
            "accepted": null,
            "is_valid": 0,
            "listing": {
                "id": 15,
                "title": "sad",
                "availability": "available",
                "highest_bid": 3214,
                "image_path": "uploads/listings/originals/mobnwqqzhgkgwow.png"
            }
        },
        {
            "id": 75,
            "amount": 9500,
            "created_at": "2024-03-09T09:50:25.000Z",
            "expires_at": "2024-03-10T09:50:25.000Z",
            "listing_id": 14,
            "accepted": null,
            "is_valid": 1,
            "listing": {
                "id": 14,
                "title": "Display",
                "availability": "available",
                "highest_bid": 9500,
                "image_path": "uploads/listings/originals/hpnidqfooawsuqr.png"
            }
        }
    ]
}
*/




import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import OfferCardUser from "@/components/OfferCardUser";
import {ChevronRight} from "lucide-react";
import ListingCardUser from "@/components/listingCardUser";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
const page = () => {

    const endPoint = `http://localhost:3000/api/account/listings`
    const [listings, setListings] = useState([]);

    const [openListings, setOpenListings] = useState([]);
    const [closedListings, setClosedListings] = useState([]);

    const {toast} = useToast();
    const router = useRouter();

    const fetchListings = async () => {
        const res = await fetch(endPoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        console.log(res.status);
        const body = await res.json();
        console.log(body);

        if(res.status === 401){
            //redirect to login page
            toast({
                title: "Uh Oh!",
                description: "You are not logged in",
                status: "error",
                duration: 10000,
                isClosable: true,
            })
            router.push(`/login?redirect=${window.location.pathname}`);
            return;
        }
        if(res.status === 200){
            setListings(body.listings);
        }
    }

    useEffect(()=>{
        fetchListings();
    },[])

    useEffect(()=>{
        if (listings){
            const open = listings.filter((listing) => {
                return listing.availability === "available";
            });

            setOpenListings(open.sort((a, b) => {
                return b.id - a.id; // Sort by descending order of IDs
            }));
            const closed = listings.filter((listing)=>{
                return listing.availability !== "available"
            })
            setClosedListings(closed.sort((a,b)=>{
                return b.id - a.id; // Sort by descending order of IDs
            }));
        }
    },[listings])


    return (
        <div className="flex-row flex justify-center">
            <div className="max-w-sm">
                <div className="w-full">
                    <div className="flex fex-row justify-between">
                        <h1 className="text-2xl p-2">My Listings</h1>
                        <Button variant="default" className="m-2" onClick={(e)=>{
                            //redirect to create listing page
                            window.location.href = "/listing/new"
                        }}>New Listing</Button>
                    </div>
                    <div className="text-xl text-gray-600 m-2">Open Listings:</div>
                    <div className="max-h-[50vh] overflow-y-scroll">
                        {openListings.map((listing, index)=>{
                            return<ListingCardUser key={index} title={listing.title} thumbnail={listing.image_path} highest_bid={listing.highest_bid} listing_id={listing.id}></ListingCardUser>
                        })}
                    </div>
                    <div className="text-xl text-gray-600 m-2">Closed Listings:</div>
                    <div>
                        {closedListings.map((listing, index)=>{
                            return<ListingCardUser key={index} title={listing.title} thumbnail={listing.image_path} highest_bid={listing.highest_bid} listing_id={listing.id}></ListingCardUser>
                        })}
                    </div>



            </div>
            </div>
        </div>
    )
}
export default page;