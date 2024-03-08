"use client";

import {useEffect, useState} from "react";

const OfferTables = ({listingId}:{
    listingId: number
}) => {
    const endPoint = `http://localhost:3000/api/offers/listing/15`
    const [offers, setOffers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchOffers = async ()=>{
        const res = await fetch(endPoint,{
            method: "GET",
            cache: "no-cache",
            credentials: "include",
        });
        if (res.status !== 200) {
            setError(true);
        }
        const body = await res.json();
        console.log(body);
        setOffers(body.offer);
        console.log(offers)
        setLoading(false);
    }
    useEffect(()=>{
       // fetchOffers();
    },[])
    return (
       <div>
           {loading && <div>Loading...</div>}
           {error && <div>Error fetching offers</div>}
           {!loading && !error && !offers && <div>No offers yet</div>}
           {
               <div>
                   <div>{offers.amount}</div>
                     <div>{offers.expires_at}</div>

                    <div>{offers.accepted?`Accepted`:`Pending`}</div>
               </div>

           }
       </div>
    );
}

export default OfferTables;