"use client";
import {backend} from '@/constants';
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
import {useRouter} from 'next/navigation'
const page = () => {
    // @ts-ignore
    const [offers, setOffers] = useState([]);
    const [acceptedOffers, setAcceptedOffers] = useState([]);
    const [rejectedOffers, setRejectedOffers] = useState([]);
    const [pendingOffers, setPendingOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(false);
    const { toast } = useToast()
    const endpoint = `${backend}api/account/offers`
    const router = useRouter();

    const fetchOffers = async () => {
        const res = await fetch(endpoint, {
            method: "GET",
            cache: "no-cache",
            credentials: "include",
        });
        console.log(res.status)
        if (res.status === 401) {
            setLoggedIn(false);
            toast({
                title: "Uh Oh!",
                description: "Looks like you are not logged in, please login to place a bid",
            })
            window.location.href = `/login?redirect=${window.location.pathname}`;
            return;
        }
        if (res.status !== 200) {
            setLoading(false);
            setError(true);
            //redir to error page

        }
        const body = await res.json();
        console.log(body);
        setLoggedIn(true);
        if (body.offers) {
            setOffers(body.offers);

        }

        setLoading(false);

    }

    useEffect(() => {
        fetchOffers();
    }, []);

    useEffect(() => {
        if (offers.length > 0) {
            // @ts-ignore
            const updatedAcceptedOffers = [];
            // @ts-ignore
            const updatedRejectedOffers = [];
            // @ts-ignore
            const updatedPendingOffers = [];

            offers.forEach(offer => {
                // @ts-ignore
                if (offer.accepted === 1) {
                    updatedAcceptedOffers.push(offer);
                } else { // @ts-ignore
                    if (offer.accepted === 0) {
                                        updatedRejectedOffers.push(offer);
                                    } else {
                                        updatedPendingOffers.push(offer);
                                    }
                }
            });

            // @ts-ignore
            setAcceptedOffers(updatedAcceptedOffers);
            // @ts-ignore
            setRejectedOffers(updatedRejectedOffers);
            // @ts-ignore
            setPendingOffers(updatedPendingOffers);
        }
    }, [offers]);


    //first step is to group data based on "accepted"


    // @ts-ignore
    const onclkfn = (available,is_valid,listing_id,accepted, transaction_id)=>{
        if (accepted==null){
            toast({
                title: "Offer is pending",
                description: "You can view your offers in Account > My Offers section",
            })
        }
        if (accepted==1){
            //redir to transaction page /transactions/:id
            router.push(`/transactions/${transaction_id}`)

        }
        if (accepted==0 && available==='available'){
            router.push(`/listing/${listing_id}`)
        }
        if (accepted==0 && available!=='available'){
            toast({
                title: "Offer is rejected",
                description: "The listing is no longer available",
            })
        }

    }

    return (
        <div className="flex-row flex justify-center">
            <div className="max-w-sm">
                <div className="w-full">
                    <h1 className="text-2xl">My offers:</h1>
                    {loading && <div>Loading...</div>}
                    {loggedIn && error && <div>Failed to fetch offers</div>}
                    {!loggedIn && <div>Log in to see offers</div>}
                    {!loading && !error && !offers && <div>No offers yet</div>}
                    { loggedIn&& !loading && !error &&<div className="p-1">
                        Accepted Offers:
                        {acceptedOffers.length===0 && <div className="text-gray-500 mb-4">No accepted offers yet</div>}
                        {acceptedOffers.map((offer, index)=>{
                            // @ts-ignore
                            return <OfferCardUser transaction_id={offer.transaction_id} key={index} title={offer.listing.title}  amount={offer.amount} accepted={offer.accepted} available={offer.listing.availability} created_at={offer.created_at} expires_at={offer.expires_at} highest_bid={offer.highest_bid} is_valid={offer.is_valid} listing_id={offer.listing_id} thumbnail={offer.listing.image_path} onClick=
                                                      {onclkfn}/>
                        })}
                        Pending Offers:
                        {pendingOffers.length===0 && <div className="text-gray-500 mb-4">No pending offers yet</div>}
                        {pendingOffers.map((offer, index)=>{
                            // @ts-ignore
                            return <OfferCardUser onClick={onclkfn}  key={index} title={offer.listing.title}  amount={offer.amount} accepted={offer.accepted} available={offer.listing.availability} created_at={offer.created_at} expires_at={offer.expires_at} highest_bid={offer.highest_bid} is_valid={offer.is_valid} listing_id={offer.listing_id} thumbnail={offer.listing.image_path}/>
                        })}
                        Rejected Offers:
                        {rejectedOffers.length===0 && <div className="text-gray-500 mb-4">No rejected offers yet</div>}
                        {rejectedOffers.map((offer, index)=>{

                            // @ts-ignore
                            return <OfferCardUser onClick={onclkfn} key={index} title={offer.listing.title}  amount={offer.amount} accepted={offer.accepted} available={offer.listing.availability} created_at={offer.created_at} expires_at={offer.expires_at} highest_bid={offer.highest_bid} is_valid={offer.is_valid} listing_id={offer.listing_id} thumbnail={offer.listing.image_path}/>
                        })}
                    </div> }

                </div>
            </div>
        </div>
    )
}
export default page;