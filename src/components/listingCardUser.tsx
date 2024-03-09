import {ChevronRight} from "lucide-react";


const OfferCardUser = ({
                        title, thumbnail, highest_bid, listing_id, isOpen
                       }:{
    title: string,
    thumbnail: string,
    highest_bid: number,
    listing_id: number,
    isOpen?: boolean

                        }
)=>{

    return<>
        <div className="flex items-center bg-gray-100 rounded-lg shadow-lg p-4 mb-4" onClick={(e)=>{
            if (isOpen){
                //redir to place where all offers on a specific listing are shown
                }
            else {
                //toast that the listing has been accepted and redirect to page where contact details are shown
            }
        }}>
            <img src={`http://localhost:3000/${thumbnail}`} className="w-20 h-20 object-cover rounded-lg mr-4" alt="thumbnail" />
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="text-lg font-semibold m-1 mr-4">{title}</h3>
                    <div>
                        <p className="text-gray-600">Highest Bid<br></br> {highest_bid?"₹"+highest_bid:"No bids yet"}</p>
                        <p className="text-gray-600 text-sm"></p>
                    </div>
                </div>
            </div><div className="flex flex-col items-center">
            <ChevronRight width={50}></ChevronRight>
        </div>
        </div>
    </>
}
export default OfferCardUser;