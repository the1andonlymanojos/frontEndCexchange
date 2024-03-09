"use client";
import { useState } from "react";
import InputFloatingLabel from "@/components/InputFloatingLabel";
import {ChevronLeft, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation'

const page = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [extLink, setExtLink] = useState("");
    const [location, setLocation] = useState("BH1");
    const [images, setImages] = useState([]);
    const [suggestedMinimumBid, setSuggestedMinimumBid] = useState("");
    const router = useRouter();

    // @ts-ignore
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // @ts-ignore
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const removeImage = (index:number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };
    const [selectedCategories, setSelectedCategories] = useState([]);

    // @ts-ignore
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            // @ts-ignore
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
        }
    };

    const handleCreateListing = async ()=>{
        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append("title", title);
        formData.append("description", description);
        formData.append("extLink", extLink);
        formData.append("location", location);
        formData.append("suggestedMinimumBid", suggestedMinimumBid);
        formData.append("categories", selectedCategories.join(","));

        const res = await fetch("http://localhost:3000/api/listings",{
            method: "POST",
            body: formData,
            credentials: "include",
        })
        const response = await res.json();
        console.log(response);
        switch (res.status) {
            case 200:
                // redirect to my listings
                break;
            case 400:
                // display error
                break;
        }

    }




    return (
        <div className="flex justify-center">
            <div className="bg-gray-800 h-[65px] max-md:w-[100vw] max-md:bg-white max-md:top-[56px] max-md:h-[50px] lg:left-[36vw] max-md:left-0 w-96 absolute -top-[14px] left-[34vw]"></div>

            <div className=" w-full  max-w-md">
                <div className="flex ml-1 mt-2 flex-row font-thin justify-start" onClick={(e)=>{
                    router.push("/mylistings")
                }}><ChevronLeft strokeWidth={.75} stroke="black"></ChevronLeft><h3>My Listings</h3></div>

            <h1 className="text-2xl font-light m-2">New Listing</h1>
            <div className="">
                <label htmlFor="images" className="block m-2 font-bold">
                    Images
                </label>
                <div className="p-3 flex justify-start items-center">
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <label
                        htmlFor="images"
                        className="flex items-center justify-center w-[128px] h-[128px] bg-gray-200 rounded-md cursor-pointer"
                    >
                        <Plus className="text-gray-500" />
                    </label>
                    <div className="flex pl-1 flex-row w-full overflow-x-scroll justify-start gap-1 items-center">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index}`}
                                    className="w-32 h-32 max-w-fit object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <InputFloatingLabel
                label="Title"
                id="title"
                sendOp={setTitle}
                type="text"
                className="mb-2"
            />
            <InputFloatingLabel
                label="External Link"
                id="extLink"
                sendOp={setExtLink}
                type="text"
                className="mb-2"
            />
            <InputFloatingLabel
                label="Suggested Minimum Bid"
                id="suggestedMinimumBid"
                sendOp={setSuggestedMinimumBid}
                type="number"
                className="mb-2 "
            />
            <div>
                <label htmlFor="description" className="block m-2 font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    placeholder="What are you selling? What condition is it in? What are the dimensions? Anything that the buyer should know."
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[110px] p-2 border border-gray-300 rounded-md"
                ></textarea>
            </div>
            <div>

                <div className="flex justify-center items-center space-x-2">
                    <label className="block m-2 font-bold">Location</label>
                    {["BH1", "BH2", "BH3", "BH4", "IVH", "GH", "ANY"].map((loc) => (
                        <div key={loc} className="flex items-center">
                            <input
                                type="radio"
                                id={loc}
                                name="location"
                                value={loc}
                                checked={location === loc}
                                onChange={() => setLocation(loc)}

                                className="mr-2 appearance-none"
                            />
                            <label htmlFor={loc}  className={`${location === loc ? 'font-bold text-xs text-blue-500' : 'text-xs'}`}>{loc}</label>
                        </div>
                    ))}
                </div>
            </div>
                <div className="flex justify-center items-center flex-wrap space-x-2 mt-4">
                    <label className="block m-2 font-bold">Category</label>
                    {["Books", "Furniture", "Electronics", "Food", "Heaters", "Coolers", "Misc"].map(
                        (category:string) => (
                            <div key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={category}
                                    name="category"
                                    value={category}
                                    //@ts-ignore
                                    checked={selectedCategories.includes(category)}
                                    onChange={handleCategoryChange}
                                    className="mr-2 appearance-none"
                                />
                                <label
                                    htmlFor={category}
                                    className={`${
                                        //@ts-ignore
                                        selectedCategories.includes(category)
                                            ? 'font-bold text-xs text-blue-500'
                                            : 'text-xs'
                                    }`}
                                >
                                    {category}
                                </label>
                            </div>
                        )
                    )}
                </div>
                <div className="mt-3 flex flex-row justify-center"> <Button onClick={(e)=>{handleCreateListing()}}>Create New Listing</Button></div>


            </div>

        </div>

    );
};

export default page;