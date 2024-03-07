
import ImageCar from "@/components/ImageCar";

const page = ({params}:{params: {
        listingid: number;
        slug: string}}) =>{
    const randomImages = ["/cup.png","/cup.png","/maggi.jpg","/maggi.jpg", "/cup.png", "/cup.png", "/cup.png"]

    const listingId = params.listingid;

    console.log(listingId);
    //query backend for listing information, use @/utils/getListing
    return <>
        <div className="max-sm:yeet">
            <div className="flex flex-row justify-evenly items-start bg-gray-100 rounded-lg p-6 shadow-md">
                <div className="flex flex-row justify-center mb-6">
                    <ImageCar images={randomImages} className="m-5 w-[30vw]"></ImageCar>
                </div>
                <div className="flex mt-5 flex-col items-baseline h-full w-[30vw]">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Maggi</h1>
                            <p className="text-lg font-medium mb-10">BH2</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium mb-4">Description<br/>
                            Crafted in the heart of the city, this Maggi is a must have for all people who value the simple things in life.
                            </p>
                            <p className="text-lg font-medium mb-6">Suggested Minimum Bid</p>
                        </div>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                            Place Bid
                        </button>

                    </div>


                </div>
                <div className="flex w-[25vw] max-w-72 min-w-52 flex-col items-center w-full">
                    <div className="bg-white rounded-lg p-4 mb-4 w-full">
                        <p className="text-lg font-medium mb-2">Time Left</p>
                        <div className="bg-gray-300 rounded-full h-4 w-full">
                            <div className="bg-gray-500 rounded-full h-4" style={{ width: '50%' }}></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4 w-full">
                        <p className="text-lg font-medium mb-2">Your Offers</p>
                        {/* Add your offers list here */}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 w-full">
                <p className="text-lg font-medium mb-2">Posted By</p>
                {/* Add posted by information here */}
            </div>

        </div>

    <div className="sm:yeet"> small screen
    </div>
    </>
}

export default page;