"use client";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
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
import ListingCardUser from "@/components/listingCardUser";
import {ChevronLeft} from "lucide-react";

// {
//     "message": "success",
//     "offers": [
//     {
//         "id": 75,
//         "amount": 9500,
//         "validity_duration": 1,
//         "created_at": "2024-03-09T09:50:25.000Z",
//         "expires_at": "2024-03-10T09:50:25.000Z",
//         "listing_id": 14,
//         "bidder_id": 2,
//         "accepted": null,
//         "is_valid": 1,
//         "owner_id": 1
//     }
// ]
// "listing": {
//     "id": 14,
//         "title": "Display",
//         "location": null,
//         "suggested_minimum_bid": 10000,
//         "description": "Acer Display bought in 2021",
//         "ext_link": null,
//         "creator_id": 1,
//         "availability": "available",
//         "highest_bid": 9500,
//         "image_path": "uploads/listings/originals/hpnidqfooawsuqr.png"
// }
// }

const page = ({params}:{params:{
    id: string,
    slug: string
    }})=>{
    console.log(params.id)

    const queryString= `http://localhost:3000/api/listings/offers/${params.id}`
    const [offers, setOffers] = useState([]);
    const [listing, setListing] = useState({} as any);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const { toast } = useToast()
    const router = useRouter();
    const fetchOffers = async ()=>{

            const res = await fetch(queryString, {
                method: "GET",
                cache: "no-cache",
                credentials: "include",
            });
            if (res.status !== 200 && res.status !== 401) {
            setError(true);
            }
            if (res.status === 401) {
                setLoggedIn(false);
                toast({
                    title: "Uh Oh!",
                    description: "Looks like you are not logged in, please to check offers",
                })
                router.push(`/login?redirect=${window.location.pathname}`);
                return;
            }
            const body = await res.json();
            console.log(body);
            if(body.offers){
                for (const offer of body.offers) {
                    const timeLeft = Date.parse(offer.expires_at) - Date.now();
                    console.log(timeLeft);
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
                    if (hours>0){
                        offer.timeLeft = hours;
                    }
                    else{
                        offer.timeLeft = -1;
                    }

                }
                setOffers(body.offers);
                setLoading(false);
                setListing(body.listing);
                console.log(offers)
            }

    }

    useEffect(()=>{fetchOffers()},[])
    const getTimeLeft = (expires_at: string)=>{
        const timeLeft = Date.parse(expires_at) - Date.now();
        console.log(timeLeft);
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
        return hours;
    }

    //in the case the listing is "unavailable", it implies that an offer has already been accepted, therefore only render the accepted offer. and along with that get the buyers details and display it.
    //on the buyers side, an offer that has been accepted should link to a simple page with the details of the listing and the seller.
    //

    return <div className="flex-row flex justify-center">
        <div className="max-w-sm w-[100vw]">
            <div className="">
                <div className="flex fex-row justify-start items-center" onClick={(e)=>{
                    router.push("/mylistings")
                }}>
                    <ChevronLeft className=""></ChevronLeft>
                    <h1 className="text-2xl p-2">My Listings</h1>
                </div>
                <div className="flex flex-row justify-start bg-gray-100 p-1 rounded-md shadow items-center">
                    <img src={`http://localhost:3000/uploads/listings/originals/hpnidqfooawsuqr.png`} className="w-24 h-24  object-cover rounded-2xl p-2  mr-4" alt="thumbnail" />
                    <div className="flex flex-row justify-between w-full"><div className="text-xl">{listing.title}</div>
                        <div className="flex flex-row justify-end text-sm ">Highest bid:<br/>{listing.highest_bid?listing.highest_bid:`No offers yet`}</div></div>
                </div>
                <div>
                    Offers:
                </div>
                <div>
                    {offers.map((offer, index)=>{
                        return<div className="w-full bg-gray-100" key={offer.id}>
                            <div>
                                <h1> Anonymous User</h1>
                                <div className="flex flex-col items-end">
                                    <div>Bid Amount</div>
                                    <div>{offer.amount}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div>Time Left</div>
                                    <div>{
                                        offer.timeLeft>0?offer.timeLeft+" hours":"Expired"
                                    }</div>
                                </div>
                                <div>
                                    {
                                        offer.timeLeft>0?<Drawer>
                                            <DrawerTrigger asChild><Button>Accept/Reject</Button></DrawerTrigger><DrawerContent  className="flex  items-center justify-center">
                                            <div className="w-[100vw] flex-row justify-center max-w-sm "><div>
                                            <DrawerHeader>
                                                <DrawerTitle>Manage Offer</DrawerTitle>
                                            </DrawerHeader>

                                                <DrawerDescription className="flex flex-row justify-center flex-nowrap">
                                                    <div>
                                                        <div>Offer Amount: {offer.amount}</div>
                                                        <div>Time Left: {offer.timeLeft} hours</div>
                                                        <div className="">
                                                            <Button>Accept</Button>
                                                            <Button>Reject</Button>
                                                        </div>
                                                        <div> By accepting the offer you agree boilerplate</div>
                                                    </div>
                                                </DrawerDescription>

                                                <DrawerFooter>
                                                    <DrawerClose>Close</DrawerClose>
                                                </DrawerFooter></div></div></DrawerContent>
                                        </Drawer> :<div>Expired</div>
                                    }
                                </div>

                            </div>

                        </div>
                    })
                    }
                </div>



            </div>
        </div>
    </div>

}

export default page;
