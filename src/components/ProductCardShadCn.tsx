import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card"

interface ProductCardProps {
    key:number,
    images: string[];
    productName: string;
    location: string;
    initialBid: number;
    userBidIfAny: number;
}

const ProductCardShadCn = ({
    images,
                                 productName,
                                 location,
                                 initialBid,
                                 userBidIfAny,
                            }: ProductCardProps) => {

    //     Array.from({ length: 5 }).map((_, index) => (
    //     <CarouselItem key={index}>
    //         <div className="p-1">
    //             <Card>
    //                 <CardContent className="flex aspect-square items-center justify-center p-0">
    //                     <img src="/ProductImage2.png" width="800px"/>
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     </CarouselItem>
    // ))

    return <div className="w-full my-3 snap-center md:w-1/3 lg:w-1/4 xl:w-1/5">
            <Card className="w-fit ">
                <div className="flex flex-col max-sm:flex-row">
                    <Carousel className="w-full max-sm:w-1/2 max-w-lg bg-gray-100">
                        <CarouselContent>
                            {
                                images.map((img, index)=>{
                                    return(
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                                        <img src={img} width="800px"/>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                })
                            }

                        </CarouselContent>
                        <CarouselPrevious className="left-4"/>
                        <CarouselNext className="right-4"/>
                    </Carousel>
                    <div className="bg-gray-100 p-4 max-sm:w-1/2">
                        <div className="font-medium text-lg   col-span-2 leading-none tracking-tight">{productName}</div>
                        <div className="flex justify-between"> <div className="col-span-2 text-xl px-0 py-1">₹{initialBid}</div></div>
                    </div>
                </div>

            </Card>
        </div>
}
export default ProductCardShadCn;