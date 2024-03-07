import ProductCardShadCn from "@/components/ProductCardShadCn";

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
})=>{
    const queryStr=searchParams.search;
    //query BackEnd for the search results
    const res: listing[]=[

        {
            id:2,
            uploaderId: 1,
            title: "Maggi",
            location: "BH2",
            description: "A table",
            suggestedMinimumBid: 24,
            images: ["/maggi.jpg", "/cup.png" ]
        },
        {
            id:3,
            uploaderId: 1,
            title: "Maggi Cuppa Noods",
            location: "BH2",
            description: "A table",
            suggestedMinimumBid: 24,
            images: ["/cup.png", "/cup.png" ]
        },{
            id:1,
            uploaderId: 1,
            title: "Table",
            location: "BH2",
            description: "A table",
            suggestedMinimumBid: 50,
            images: ["/prodcutImage1.png", "/ProductImage2.png" ]
        }

    ]
    //access the query string
    return<div className="p-2">
        <div className="font-roboto font-thin text-3xl">Showing results for</div>
        <div className="font-thin text-5xl">{queryStr}</div>
        <div className="m-2">
            {res.map((item, index)=>{
                return<ProductCardShadCn
                    key={item.id}
                    images={item.images}
                    productName={item.title}
                    initialBid={item.suggestedMinimumBid}
                    location={item.location}
                    userBidIfAny={0}
                ></ProductCardShadCn>
                ;
            })}</div>

    </div>
}
export default Page;