"use client";
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
import {Plus, Minus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import { useToast } from "@/components/ui/use-toast"
import {useRouter} from 'next/navigation'


const PlaceBidThingy = ({delta, curr, min, max,productId,setUpdateFlag}:{
    delta: number,
    curr: number,
    min: number,
    max: number,
    productId: number,
    setUpdateFlag?: any
}) =>{
    const [bid, setBid] = useState(Math.round(curr));
    const minBid = Math.round(min);
    const maxBid = Math.round(max);
    const roundedDelta = Math.round(delta);
    const refDr = useRef(null);
    const refIr = useRef(null);
    const refDropdown = useRef(null);
    const refClose = useRef(null);
    const { toast } = useToast()
    const router = useRouter();

    const handleSubmit = async () => {
        // @ts-ignore
        console.log(refDropdown.current.value);
        console.log(bid);

        const endpoint = `${backend}api/offers/create/${productId}`;

        const payload = {
            price: bid,
            // @ts-ignore
            ttl: refDropdown.current.value
        }

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: "include",
        })
        console.log(res.status);
        const body = await res.json();
        console.log(body);
        if(res.status === 401){
            //redirect to login page
            // @ts-ignore
            toast({
                title: "Uh Oh!",
                description: "Looks like you are not logged in, please login to place a bid",
            })
            router.push(`/login?redirect=${window.location.pathname}`);
            return;
        }
        if(res.status===469){
            toast({
                title: "Nice Try ;)",
                description:"You cant bid on your own listing"
            })
            // @ts-ignore
            refClose.current.click();
            return;
        }

        if (setUpdateFlag){
            setUpdateFlag(true);
            console.log("set update flag")
        }
        toast({
            title: "Bid Placed!",
            description: "You can view your offers in Account > My Offers section",
        })
        //make post req to backend.
        //if success, close the drawer add a toast and add offer to myOffers on the UI.
        //if server responds with 401, then redirect to login page, send current url as redirect url in query params. on login page toast "Please login to place a bid"

        // @ts-ignore
        refClose.current.click();


    }
    const handleChnageDr = ()=>{
        if(bid-roundedDelta<minBid){

            // @ts-ignore
            refDr.current.disabled = true;
            return;
        }
        // @ts-ignore
        refIr.current.disabled = false;
        setBid(bid-roundedDelta);
    }
    const handleChnageIr = ()=>{
        if(bid+roundedDelta>maxBid){
            // @ts-ignore
            refIr.current.disabled = true;
            return;
        }
        // @ts-ignore
        refDr.current.disabled = false;
        setBid(bid+roundedDelta);
    }
    const [Open, setOpen] = useState(false);



    return<div>
        <Drawer >
            <DrawerTrigger asChild><Button onClick={()=>setOpen(true)}>
                Place Bid
            </Button>
            </DrawerTrigger>
            <DrawerContent className="flex  items-center justify-center">
                <div className="max-w-sm ">
                <DrawerHeader >
                    <DrawerTitle className="text-xl" >Are you sure?</DrawerTitle>
                    <DrawerDescription className="text-basis">Placing a bid means that you are interested in buying the product/service at the price if accepted. </DrawerDescription>
                </DrawerHeader>

                <div className="flex items-center justify-center mt-8 mb-8 space-x-2">
                    <Button ref={refDr} className="h-8 rounded-2xl p-0 w-8" onClick={e=>{handleChnageDr()}}>
                        <Minus color="white" className="h-6 w-6"></Minus>
                    </Button>
                        <div className="text-3xl">₹{bid}</div>


                    <Button ref={refIr} className="h-8 rounded-2xl p-0 w-8" onClick={e=>{handleChnageIr()}}>
                        <Plus color="white" className="h-6 w-6"></Plus>
                    </Button>
                </div>
                    <div className="flex  items-center justify-center space-x-2"><div>Bid Validity:</div><select ref={refDropdown}> <option value={1}>1 Day</option><option value={2}> 2 Days </option> <option value={3}>3 Days</option> </select> </div>




                    <DrawerFooter>
                        <div className="flex justify-center"></div>
                        <Button onClick={handleSubmit}>Submit</Button>

                    <DrawerClose asChild>
                        <Button ref={refClose} variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </div>
}

export default PlaceBidThingy;
