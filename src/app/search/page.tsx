"use client";
import ProductCardShadCn from "@/components/ProductCardShadCn";
import {backend} from '@/constants';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
type listing = {
    id: number,
    uploaderId: number,
    title: string,
    location: string,
    description: string,
    images: string[],
    suggestedMinimumBid: number,

}



const Page =({
                       params,
                       searchParams,
                   }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const queryStr = searchParams.search;
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [listings, setListings] = useState<listing[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const {toast} = useToast();
    const endPoint = `${backend}api/listings/search`
    const fetchListings = async (limit:number, offset:number) => {
        const res = await fetch(endPoint, {
            method: "POST",
            cache: "no-cache",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                limit: limit,
                offset: offset,
                searchString: queryStr
            })
        });
        const body = await res.json();
        if (res.status !== 200) {
            if (res.status === 404) {
                toast({
                    title: "Uh Oh!",
                    description: "No results found, showing new listings",
                })

                setListings((prevListings) => [...prevListings, ...body.listings]);

            }

            //in future make an error page and redirect users to that
        }

        //append body.listings to listings
        setListings([ ...body.listings]);
        setOffset((prevState)=>{
            return (prevState+limit);
        });
    }
    useEffect(()=>{
        //remove duplicates


    },[listings])
    useEffect(()=>{
        fetchListings(limit, offset);
        console.log("listings"+listings)
    },[])



    //access the query string
    return <>
        <div className="max-sm:yeet flex  justify-between">
            <div className="w-[15vw] "></div>
            <div className="w-full">
                <div className="font-roboto font-thin text-3xl">Showing results for</div>
                <div className="font-thin text-5xl">{queryStr}</div>
                <div className="m-2 flex flex-row flex-wrap items-start">
                    {listings.map((item, index) => {
                        // @ts-ignore
                        return <ProductCardShadCn
                            key={index}
                            listingId={item.id}
                            images={item.images}
                            productName={item.title}
                            initialBid={item.suggested_minimum_bid}
                            location={item.location}
                            userBidIfAny={0}
                        ></ProductCardShadCn>
                    })}</div>
                <Button onClick={(e)=>{
                    fetchListings(limit, offset);
                }}>Load More</Button>
            </div>

            <div className="w-[15vw]"></div>


        </div>
        <div className="p-2 sm:yeet">

            <div className="font-roboto font-thin text-3xl">Showing results for</div>
            <div className="font-thin text-5xl">{queryStr}</div>
            <div className="m-2">
                {listings.map((item, index) => {
                    return <ProductCardShadCn
                        key={index}
                        listingId={item.id}
                        images={item.images}
                        productName={item.title}
                        initialBid={item.suggested_minimum_bid}
                        location={item.location}
                        userBidIfAny={0}
                    ></ProductCardShadCn>
                        ;
                })}</div>
            <Button onClick={(e)=>{
                fetchListings(limit, offset);
            }}>Load More</Button>
        </div>
    </>
}
export default Page;

