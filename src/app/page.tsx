import Image from "next/image";
import InputFloatingLabel from "@/components/InputFloatingLabel";
import {backend} from '@/constants';
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
export default async function Home() {
    //endpoint:
    const endPoint = `https://manojshivagange.tech:3000/getnew`;
    const res = await fetch(endPoint,{
        method: "GET",
        cache: "no-cache",
    });
    if (res.status !== 200) {
        console.log("failed to fetch");
        console.log(res.status)
        const response = await res.json();
        console.log(response);
        console.log("error")
        return <div>Failed to fetch</div>
    }
    const body = await res.json();

    const listings:listing[] = body.listings;


    //home page, landing page. brief description of the app, search bar, with categories, and a list of the whats hot.
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">

            <main className="container mx-auto px-4 py-8 flex-1">
                <section className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">
                        Buy and Sell with Ease in Your College
                    </h1>
                    <p className="text-gray-600 mb-8">
                        CollegeXchange is a platform where you can easily buy and sell
                        things within your college community. Bid on products or sell items
                        you no longer need.
                    </p>
                    <div className="flex justify-center">
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                Books
                            </button>
                            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                Electronics
                            </button>
                            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                Furniture
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Whats Hot</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
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
                    </div>
                </section>
            </main>
            <footer className="w-full bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    &copy; {new Date().getFullYear()} CollegeXchange. All rights reserved.
                </div>
            </footer>
        </div>
    );
}