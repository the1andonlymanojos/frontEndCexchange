"use client";
import {useEffect, useRef, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {backend} from '@/constants';
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
import {Check, ChevronLeft, Cross, PlusIcon, X} from "lucide-react";
import {ToastAction} from "@/components/ui/toast";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import InteractiveQbox from "@/components/InteractiveQbox";
import InteractiveQboxWITHANS from "@/components/InteractiveQboxWITHANS";

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

type listing = {
    id: number;
    title: string;
    location: string | null;
    suggested_minimum_bid: number;
    description: string;
    ext_link: string | null;
    creator_id: number;
    availability: string;
    highest_bid: number | null;
    image_path: string | null;
};

type Offer = {
    id: number;
    amount: number;
    validity_duration: number;
    created_at: Date | null;
    expires_at: Date | null;
    listing_id: number | null;
    bidder_id: number | null;
    accepted: number | null;
    is_valid: number;
    owner_id: number | null;
    transaction_id: number | null;
    timeLeft?: number;
};



const Page = ({params}:{params:{
    id: string,
    slug: string
    }})=>{
    console.log(params.id)
    const listingId = Number.parseInt(params.id);

    const queryString= `${backend}api/listings/offers/${params.id}`
    const [offers, setOffers] = useState<Offer[]>([]);
    const [listing, setListing] = useState<listing|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);
    const { toast } = useToast()
    const router = useRouter();
    const refCLose = useRef(null);
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

            if (body.listing.availability!=="available"){
                //find the transaction id, the offer with acceted===1 will have transaction_id
                const acceptedOffer = body.offers.find((offer:any)=>offer.accepted===1);
                if (acceptedOffer){
                    router.push(`/transactions/${acceptedOffer.transaction_id}`)
                }
                return;
            }

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
            if (body.listing){
                setListing(body.listing);
                setLoading(false);
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
        <div className="max-w-md w-[100vw]">
            <div className="">
                <div className="flex fex-row justify-start items-center" onClick={(e)=>{
                    router.push("/mylistings")
                }}>
                    <ChevronLeft className=""></ChevronLeft>
                    <h1 className="text-2xl p-2">My Listings</h1>
                </div>
                <div className="flex flex-row justify-start bg-gray-100 p-1 rounded-md shadow items-center" onClick={(e)=>{
                    router.push(`/listing/${listing?.id}`)

                }}>
                    <img src={`${backend}`+listing?.image_path} className="w-24 h-24  object-cover rounded-2xl p-2  mr-2" alt="thumbnail" />
                    <div className="flex flex-row justify-between w-full"><div className="text-xl">{listing?.title}</div>
                        <div className="flex flex-row justify-end text-xs ">Highest bid:<br/>{listing?.highest_bid?listing.highest_bid:`No offers yet`}</div></div>
                </div>
                <div className="m-2 text-lg">Offers:</div>
                <div className="m-2 text-base flex flex-col items-center justify-center">
                    {offers.length===0?<div>No offers yet</div>:null}
                    {loading?<div>Loading...</div>:null}
                </div>
                <Accordion type={"single"} >
                    <AccordionItem value={"value-12"}>
                        <AccordionTrigger>Unanswered Questions</AccordionTrigger>
                        <AccordionContent>
                            <InteractiveQboxWITHANS listingId={listingId}></InteractiveQboxWITHANS>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div>
                    {offers.map((offer, index)=>{
                        // @ts-ignore
                        return<div className={"w-full rounded-xl p-2 "+(offer.accepted === null
                            ? 'bg-gray-100'
                            : offer.accepted === 1
                            ? 'bg-green-50'
                            :'bg-red-50')} key={offer.id}>
                            <div className="flex flex-row justify-between items-center flex-nowrap">
                                <h1> Anonymous<br></br> User</h1>
                                <div className="flex flex-col text-sm items-end">
                                    <div>Bid Amount</div>
                                    <div>₹{offer.amount}</div>
                                </div>
                                <div className="flex text-sm flex-col items-end">
                                    <div>Time Left</div>
                                    <div>{
                                        //@ts-ignore
                                        offer.timeLeft>0?offer.timeLeft+" hours":"Expired"
                                    }</div>
                                </div>
                                <div>
                                    {
                                        //offer.timeLeft>0?
                                        1?
                                            <div className={"flex flex-col mr-3 justify-center items-center"}>
                                                <Drawer>
                                                    <DrawerTrigger asChild><Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-green-300 shrink-0 rounded-full"
                                                        disabled={offer.accepted!==null}
                                                    >
                                                        <Check />
                                                    </Button></DrawerTrigger>
                                                    <DrawerContent>
                                                        <div className="mx-auto w-full max-w-sm">
                                                        <DrawerHeader>
                                                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                                            <DrawerDescription>This action cannot be undone. By clicking accept you agree to the bid of ₹{offer.amount}. Failure to blah blah blah boilerplate</DrawerDescription>
                                                        </DrawerHeader>
                                                        <DrawerFooter>
                                                            <Button className="bg-green-800" onClick={async (e) => {
                                                                //accept the bid, so offerID is needed.
                                                                const endPoint = `${backend}api/offers/respond/${offer.id}`;
                                                                const payload = {response: "accept"};
                                                                const res = await fetch(endPoint, {
                                                                    method: "POST",
                                                                    cache: "no-cache",
                                                                    credentials: "include",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    body: JSON.stringify(payload)
                                                                })
                                                                const body = await res.json();
                                                                console.log(body);
                                                                console.log("here")
                                                                if (res.status !== 200) {
                                                                    toast({
                                                                        title: "Uh Oh!",
                                                                        variant: "destructive",
                                                                        description: "Failed to accept bid " + body.message,
                                                                    })
                                                                    // @ts-ignore
                                                                    refCLose.current.click();
                                                                }
                                                                else {
                                                                    toast({
                                                                        title: "Success",
                                                                        description: "Bid accepted",
                                                                        action: <ToastAction altText="go to transaction page" onClick={()=>{
                                                                            console.log("going to transaction page")}}>Open Transaction Page</ToastAction>
                                                                    })
                                                                    //relaod page
                                                                    router.push(`/transactions/${body.transaction_id}`)
                                                                    // @ts-ignore
                                                                    refCLose.current.click();
                                                                }

                                                            }}>Accept Bid</Button>
                                                            <DrawerClose asChild>
                                                                <Button ref={refCLose} variant="outline">Cancel</Button>
                                                            </DrawerClose>
                                                        </DrawerFooter>
                                                        </div>
                                                    </DrawerContent>
                                                </Drawer>
                                                <Drawer>
                                                    <DrawerTrigger asChild><Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-red-300 shrink-0 rounded-full"
                                                        disabled={offer.accepted!==null}
                                                    >
                                                        <X strokeWidth={1.25} />
                                                    </Button></DrawerTrigger>
                                                    <DrawerContent>
                                                        <div className="mx-auto w-full max-w-sm">
                                                            <DrawerHeader>
                                                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                                                <DrawerDescription>This action cannot be undone. By clicking reject you are rejecting the bid of ₹{offer.amount}. Failure to blah blah blah boilerplate</DrawerDescription>
                                                            </DrawerHeader>
                                                            <DrawerFooter>
                                                                <Button className="bg-red-800" onClick={async (e) => {
                                                                    //accept the bid, so offerID is needed.
                                                                    const endPoint = `${backend}api/offers/respond/${offer.id}`;
                                                                    const payload = {response: "reject"};
                                                                    const res = await fetch(endPoint, {
                                                                        method: "POST",
                                                                        cache: "no-cache",
                                                                        credentials: "include",
                                                                        headers: {
                                                                            "Content-Type": "application/json",
                                                                        },
                                                                        body: JSON.stringify(payload)
                                                                    })
                                                                    const body = await res.json();
                                                                    console.log(body);
                                                                    console.log("here")
                                                                    if (res.status !== 200) {
                                                                        toast({
                                                                            title: "Uh Oh!",
                                                                            variant: "destructive",
                                                                            description: "Failed to reject bid " + body.message,
                                                                        })
                                                                        // @ts-ignore
                                                                        refCLose.current.click();
                                                                    }
                                                                    else {
                                                                        toast({
                                                                            title: "Success",
                                                                            description: "Bid rejected",
                                                                        })
                                                                        // @ts-ignore
                                                                        refCLose.current.click();
                                                                    }

                                                                }}>Reject Bid</Button>
                                                                <DrawerClose asChild>
                                                                    <Button ref={refCLose} variant="outline">Cancel</Button>
                                                                </DrawerClose>
                                                            </DrawerFooter>
                                                        </div>
                                                    </DrawerContent>
                                                </Drawer>

                                            </div> :<div>Expired</div>
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

export default Page;
