"use client";

import {useEffect, useState} from "react";

const OfferTables = ({listingId, updated, setUpdated}:{
    listingId: number,
    updated?: boolean,
    setUpdated?: any
}) => {
    const endPoint = `http://localhost:3000/api/offers/listing/${listingId}`
    const [offers, setOffers] = useState({
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    const fetchOffers = async ()=>{
        const res = await fetch(endPoint,{
            method: "GET",
            cache: "no-cache",
            credentials: "include",
        });
        if (res.status !== 200 && res.status !== 401) {
            setError(true);
        }
        if (res.status === 401) {
        setLoggedIn(false);
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


if (setUpdated) {
    useEffect(() => {
        console.log("updated value")
        fetchOffers();
        setUpdated(false);
        console.log(offers)
    }, [updated])
}

    useEffect(()=>{
        fetchOffers();
    },[])
    return (
       <div>
           {loading && <div>Loading...</div>}
           {loggedIn && error && <div>Failed to fetch offers</div>}
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
                                           Expiration
                                       </th>
                                       <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                           Status
                                       </th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr className="bg-gray-100 border-b">
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                           {offers.amount}
                                       </td>
                                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal">
                                           {new Date(offers.expires_at).toLocaleString()}
                                       </td>
                                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                           {offers.accepted === null
                                               ? 'Pending'
                                               : offers.accepted === 1
                                                   ? 'Accepted!'
                                                   : 'Rejected'}
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                   </div>
               </div>

           }
       </div>
    );
}

export default OfferTables;