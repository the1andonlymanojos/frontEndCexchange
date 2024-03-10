import ProductCard from '@/components/ProductCard'
import ProductCardShadCn from '@/components/ProductCardShadCn'
import Image from 'next/image'
import NavThing from "@/components/NavThing";
import {backend} from '@/constants';

type listing = {
    id: number,
    uploaderId: number,
    title: string,
    location: string,
    description: string,
    images: string[],
    suggestedMinimumBid: number,

}




const page =  () => {
    const res: listing[]=[
        {
            id:1,
            uploaderId: 1,
            title: "Table",
            location: "BH2",
            description: "A table",
            suggestedMinimumBid: 50,
            images: ["/prodcutImage1.png", "/ProductImage2.png" ]
        },
        {
            id:2,
            uploaderId: 1,
            title: "Maggi",
            location: "BH2",
            description: "A table",
            suggestedMinimumBid: 24,
            images: ["/maggi.jpg", "/cup.png" ]
        }

    ]
    //<ProductCardShadCn id={1} images={["/maggi.jpg"]} productName={"banana"} location={"bH3"} initialBid={500} userBidIfAny={2}></ProductCardShadCn>
    return <>
        <div className=" m-5 p-5 border-black border  border-solid">
            {res.map((item, index)=>{
                return<ProductCardShadCn
                    key={item.id}
                    images={item.images}
                    productName={item.title}
                    initialBid={item.suggestedMinimumBid}
                    location={item.location}
                    userBidIfAny={0}
                     listingId={item.id}></ProductCardShadCn>
                ;
            })}
        </div>
        <div className="overflow-hidden w-32 h-32 bg-[url('/bg1.png')] bg-no-repeat resize">aasdfsafasdf</div>


    </>
}
export default  page;