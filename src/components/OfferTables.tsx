"use client";
//@ts-ignore
import {useEffect, useState} from "react";
import {backend} from '@/constants';
const OfferTables = ({listingId, updated, setUpdated}:{
    listingId: number,
    updated?: boolean,
    setUpdated?: any
}) => {
    const endPoint = `${backend}api/offers/listing/${listingId}`
    const [offers, setOffers] = useState({
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(()=>{
        // @ts-ignore
        const expiryTime = Date.parse(offers.expires_at);
        // @ts-ignore
        const createdTime = Date.parse(offers.created_at);
        const now = Date.now();
        const percentage = (expiryTime - now)*100 / (expiryTime - createdTime);
        let integerPercentage =Math.floor(percentage);
        if (integerPercentage<0) integerPercentage = 100; //implies that the offer has expired
        integerPercentage=100-integerPercentage;
        console.log(integerPercentage);
        setTimeLeft(Math.max(5, integerPercentage));
    },[offers])

    const fetchOffers = async ()=>{
        const res = await fetch(endPoint,{
            method: "GET",
            cache: "no-cache",
            credentials: "include",
        });
        if (res.status !== 200 && res.status !== 401 && res.status !== 460) {
            setError(true);
            setErrorMessage("Failed to fetch offers")
        }
        if (res.status === 401) {
        setLoggedIn(false);
        }
        if (res.status===460){
            setError(true);
            setErrorMessage("No offers yet")
        }
        const body = await res.json();
        console.log(body);
        if(body.offer)
        {
            setOffers(body.offer);
            console.log(offers)
        }
        setLoading(false);
    }

    useEffect(()=>{
        if (setUpdated){
            console.log("updated value")
            fetchOffers();
            setUpdated(false);
            console.log(offers)
        }
    },[updated])


    useEffect(()=>{
        fetchOffers();
    },[])
    // @ts-ignore
    return (
       <div>
           {loading && <div>Loading...</div>}
           {loggedIn && error && <div>{errorMessage}</div>}
           {!loggedIn && <div>Log in to see offers</div>}
           {!loading && !error && !offers && <div>No offers yet</div>}
           { loggedIn&& !loading && !error && offers &&
               <div className="flex flex-col">
                   <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                       <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="overflow-hidden">
                               <table className="min-w-full">
                                   <thead className="bg-white border-b">
                                   <tr>
                                       <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                           Amount
                                       </th>
                                       <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                           Status
                                       </th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr className="bg-gray-100 border-b">
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{// @ts-ignore
                                           offers.amount}
                                       </td>
                                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           {
                                               // @ts-ignore
                                               offers.accepted === null
                                               ? 'Pending'
                                               :
                                                   // @ts-ignore
                                                   offers.accepted === 1
                                                   ? 'Accepted!'
                                                   : 'Rejected'}
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                   </div>
                   <div className="bg-white rounded-lg p-4 mb-4 w-full">
                       <p className="text-lg font-medium mb-2">Time Left</p>
                       <div className="bg-gray-300 rounded-full h-4 w-full">
                           <div className="bg-gray-500 rounded-full h-4" style={{ width: timeLeft+"%" }}></div>
                       </div>
                   </div>
               </div>

           }
       </div>
    );
}

export default OfferTables;