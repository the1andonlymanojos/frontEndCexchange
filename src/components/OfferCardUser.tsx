import {ChevronRight} from "lucide-react";
import {backend} from '@/constants';

const OfferCardUser = ({amount,
                       created_at,
                       expires_at,
                       listing_id,
                       accepted,is_valid,title, thumbnail,available, highest_bid, onClick, transaction_id}:{
    amount: number,
    created_at: string,
    expires_at: string,
    listing_id: number,
    accepted?: number,
    is_valid: number,
    title: string,
    thumbnail: string,
    available: string,
    highest_bid: number,
    transaction_id?: number,
    onClick: (available: string, key: number, listing_id: number, accepted: number)=>void
})=>{


    const timeLeft = Date.parse(expires_at) - Date.now();
    console.log(timeLeft);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;

    console.log("recieved values"+amount+created_at+expires_at+listing_id+accepted+is_valid+title+thumbnail+available+highest_bid)

    return<>
        <div className="flex flex-row justify-start" onClick={(e)=>{ // @ts-ignore
            onClick(available,is_valid,listing_id, accepted,transaction_id )}}>
            <div className="flex items-center bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
                <img src={`${backend}`+thumbnail} className="w-20 h-20 object-cover rounded-lg mr-4" alt="thumbnail" />
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        <p className="text-gray-600">Amount: ₹{amount}</p>
                        <p className="text-gray-600 text-sm">Valid for: {hours} hours</p>
                    </div>
                    <div className={(accepted === null ? `text-purple-950` : accepted === 1 ? `text-green-500` : `text-red-500`)+" text-xs"}>
                        {accepted === null
                            ? 'Status: Pending'
                            : accepted === 1
                                ? 'Status: Accepted! Click to get contact details'
                                : available==='available'?'Status: Rejected, click to place another bid':'Status: Rejected, listing is no longer available'}
                    </div>
                </div><div className="flex flex-col items-center">
                <ChevronRight width={40}></ChevronRight>
            </div>
            </div>


        </div>

    </>
}
export default OfferCardUser;