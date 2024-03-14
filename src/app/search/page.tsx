"use client";
import ProductCardShadCn from "@/components/ProductCardShadCn";
import {backend} from '@/constants';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {list} from "postcss";
import {ChevronLeft} from "lucide-react";
import {useRouter} from "next/navigation";
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
    const router = useRouter()
    const queryStr = searchParams.search;
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [listings, setListings] = useState<listing[]>([]);
    const [error, setError] = useState(false);
    const {toast} = useToast();
    const endPoint = `${backend}api/listings/search`
    const fetchListings = async (limit:number, offset:number, searchTerm:string) => {
        const res = await fetch(endPoint, {
            method: "POST",
            cache: "no-cache",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                limit: limit,
                offset: offset,
                searchString: searchTerm
            })
        });
        const body = await res.json();
        if (res.status !== 200) {
            if (res.status === 404) {
                if (listings.length === 0 || offset === 0) {
                    setError(true);

                    toast({
                        title: "Uh Oh!",
                        description: "No results found, showing new listings",
                    })
                    setListings((prevListings) => [...body.listings]);
                } else {
                    setError(false);
                    toast({
                        title: "Uh Oh!",
                        description: "No more listings found",
                    })
                }
            }
        } else {
            setError(false)
            setListings((prevState)=>{return [...prevState, ...body.listings]});
        }



    }

    useEffect(()=>{
        console.log(queryStr)
        setOffset(0);
        setListings([]);
        //@ts-ignore
        fetchListings(limit, 0, queryStr);
        console.log("listings"+listings)
        console.log(listings)
    },[queryStr])



    //access the query string
    return <>
        <div className="max-sm:yeet flex  justify-between">
            <div className="w-[15vw] "></div>
            <div className="w-full">
                <div className="flex flex-row justify-start" onClick={(e)=>{
                    router.push("/")
                }}> <ChevronLeft></ChevronLeft> <div>Home</div></div>


                {error?<div>  <div className="font-roboto font-thin text-3xl">Couldnt find anything for {queryStr} :(</div>
                    <div className="font-thin text-5xl">New on collegeXchange</div></div>:<div>
                    <div className="font-roboto font-thin text-3xl">Showing results for</div>
                    <div className="font-thin text-5xl">{queryStr}</div>
                </div>}

                <div className="m-2 flex flex-row flex-wrap items-start">
                    {listings.map((item, index) => {
                        // @ts-ignore

                        return <ProductCardShadCn
                            key={index}
                            listingId={item.id}
                            images={item.images}
                            productName={item.title}
                            initialBid={//@ts-ignore
                            item.suggested_minimum_bid}
                            location={item.location}
                            userBidIfAny={0}
                        ></ProductCardShadCn>
                    })}</div>
                <Button onClick={(e)=>{

                    setOffset(offset+limit);
                    //@ts-ignore
                    fetchListings(limit, offset+limit, queryStr);
                }}>Load More</Button>
            </div>

            <div className="w-[15vw]"></div>


        </div>
        <div className="p-2 sm:yeet">
            <div className="flex flex-row justify-start" onClick={(e)=>{
                router.push("/")
            }}> <ChevronLeft></ChevronLeft> <div>Home</div></div>
            {error?<div>  <div className="font-roboto font-thin text-3xl">Couldnt find anything for {queryStr} :(</div>
                <div className="font-thin text-5xl">New on collegeXchange</div></div>:<div>
                <div className="font-roboto font-thin text-3xl">Showing results for</div>
                <div className="font-thin text-5xl">{queryStr}</div>
            </div>}
            <div className="m-2">
                {listings.map((item, index) => {
                    return <ProductCardShadCn
                        key={index}
                        listingId={item.id}
                        images={item.images}
                        productName={item.title}
                        initialBid={
                        //@ts-ignore
                        item.suggested_minimum_bid}
                        location={item.location}
                        userBidIfAny={0}
                    ></ProductCardShadCn>
                        ;
                })}</div>
            <Button onClick={(e)=>{
                setOffset(offset+limit);
                //@ts-ignore
                fetchListings(limit, offset, queryStr);
            }}>Load More</Button>
        </div>
    </>
}
export default Page;

