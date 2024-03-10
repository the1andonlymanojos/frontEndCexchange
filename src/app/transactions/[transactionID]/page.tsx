"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {backend} from '@/constants';
type TransactionDetails = {
    seller_name: string;
    seller_email: string;
    seller_id: number;
    seller_phone: string;
    buyer_name: string;
    buyer_id: number;
    seller_transaction_complete: number;
    buyer_transaction_complete: number;
    offer_amount: number;
    buyer_email: string;
    buyer_phone: string;
    listing_title: string;
    image_path: string;
};

const Page = ({params}:{params:{
        transactionID: string,
        slug: string
    }})=>{
    const router = useRouter();
    const { toast } = useToast();
    const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
    const [error, setError] = useState(false);
    const endPoint = `${backend}api/transactions/${params.transactionID}`;
    const getTransaction = async () => {
        const res = await fetch(endPoint,{
            method: "GET",
            cache: "no-cache",
            credentials: "include",
        });
        if (res.status !== 200 && res.status!==401) {
            setError(true);
        }
        if (res.status === 401) {
            toast({
                title: "Uh Oh!",
                description: "Looks like you are not logged in, please to check offers",
            })
            router.push(`/login?redirect=${window.location.pathname}`);
            return;
        }
        console.log(res.status)
        console.log(res)
        const body = await res.json();
        console.log(body);
        setTransaction(body.transaction);
    }
    useEffect(()=>{
        getTransaction();
        console.log(transaction)
    },[])


    return<div className="flex flex-row justify-center">
        <div className="w-full max-w-md">
            <div className="text-3xl font-semibold mb-4">Aaaaand.... Deal is done!</div>
            <div className="mb-4">Please use the below details to get in touch with the other party and fulfill the boilerplate.</div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center">
                <img src={`${backend}${transaction?.image_path}`} className="w-32 h-32 object-cover rounded-lg mr-4" alt="thumbnail" />
                <div>
                    <div className="text-lg font-semibold mb-2">{transaction?.listing_title}</div>
                    <div className="text-gray-600">Amount: ₹{transaction?.offer_amount}</div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-8">
                <div>
                    <div className="text-lg font-semibold mt-4">Seller</div>
                    <div className="text-gray-600 mt-1">{transaction?.seller_name}</div>
                    <div className="text-gray-600">{transaction?.seller_email}</div>
                    <div className="text-gray-600">{transaction?.seller_phone}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold mt-4">Buyer</div>
                    <div className="text-gray-600 mt-1">{transaction?.buyer_name}</div>
                    <div className="text-gray-600">{transaction?.buyer_email}</div>
                    <div className="text-gray-600">{transaction?.buyer_phone}</div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-8">
                <Button onClick={(e)=>{
                    router.push("/mylistings")
                }}><ChevronLeft></ChevronLeft> My Listings</Button>
                <Button onClick={(e)=>{
                    router.push("/myoffers")
                }}> <ChevronLeft></ChevronLeft> My Offers </Button>
            </div>
        </div>
    </div>
}

export default Page;