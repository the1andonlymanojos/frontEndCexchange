"use client";
import {
    Sheet, SheetClose,
    SheetContent, SheetFooter,
    SheetTrigger,
} from "@/components/ui/sheet"
import {useRouter} from "next/navigation";
import {backend} from '@/constants';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {Button} from "@/components/ui/button"
import Image from 'next/image'
import InputFLoatingLabel from "@/components/InputFloatingLabel";
import {useRef, useState} from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const NavThing = ()=>{
    // return (
    //     <div className="flex flex-row justify-between">
    //         <Sheet>
    //             <SheetTrigger asChild>
    //                 <Button variant="outline" className="w-fit px-2"><Image src="/menuIcon.png" width="20" height="20" alt="menu icon"></Image></Button>
    //             </SheetTrigger>
    //             <SheetContent className="w-[400px] sm:w-[540px]" side="left">
    //                 <div>
    //                     <Sheet>
    //                         <SheetTrigger asChild>
    //                             <div>
    //                                 <div>Account</div>
    //                                 <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/guest-male.png" alt="guest-male"/>
    //                             </div>
    //
    //                         </SheetTrigger>
    //                         <SheetContent side="left">
    //                                 <SheetTitle>Account</SheetTitle>
    //                                 <SheetDescription>Manage your account</SheetDescription>
    //                                 <div>Profile</div>
    //                                 <div>Settings</div>
    //                                 <div>Logout</div>
    //                             </SheetContent>
    //                     </Sheet>
    //
    //
    //                 </div>
    //                 <div>
    //                     <div>Buy</div>
    //                     <img src="/buy.png" width="48" height="48"></img>
    //                 </div>
    //                 <div>
    //                     <div>Sell</div>
    //                     <Image src="/sell.png" alt="sell" width="48" height="48"></Image>
    //                 </div>
    //                 <div>About</div>
    //                 <div>Contact</div>
    //
    //             </SheetContent>
    //         </Sheet>
    //         <div className="text-xl">collegeXchange</div>
    //         <Image src="/logo.png" alt="logo" width="50" height="50"></Image>
    //
    //     </div>
    // )

    // return (
    //     <div className="flex flex-row justify-between items-center py-4 px-6 bg-gray-800 text-white">
    //         <Sheet>
    //             <SheetTrigger asChild>
    //                 <Button variant="outline" className="w-fit px-2">
    //                     <Image src="/menuIcon.png" width="20" height="20" alt="menu icon" />
    //                 </Button>
    //             </SheetTrigger>
    //             <SheetContent className="w-[400px] sm:w-[540px] bg-gray-700 rounded-lg shadow-lg p-6" side="left">
    //                 <div className="mb-4">
    //                     <Accordion type="single" collapsible>
    //                         <AccordionItem value="item-1">
    //                             <AccordionTrigger>Is it accessible?</AccordionTrigger>
    //                             <AccordionContent>
    //                                 Yes. It adheres to the WAI-ARIA design pattern.
    //                             </AccordionContent>
    //                         </AccordionItem>
    //                     </Accordion>
    //
    //                 </div>
    //                 <div className="flex justify-between items-center mb-4">
    //                     <div className="mr-2">Buy</div>
    //                     <img src="/buy.png" width="48" height="48" alt="buy icon" />
    //                 </div>
    //                 <div className="flex items-center mb-4">
    //                     <div className="mr-2">Sell</div>
    //                     <Image src="/sell.png" alt="sell" width="48" height="48" />
    //                 </div>
    //                 <div className="text-gray-300 hover:text-white cursor-pointer mb-2">About</div>
    //                 <div className="text-gray-300 hover:text-white cursor-pointer">Contact</div>
    //             </SheetContent>
    //         </Sheet>
    //         <div className="flex items-center">
    //             <div className="text-xl font-bold mr-2">collegeXchange</div>
    //             <Image src="/logo.png" alt="logo" width="50" height="50" />
    //         </div>
    //     </div>
    // )
    let str = "";


    const cats = ["Books", "Furniture", "Electronics", "Food", "Heaters", "Coolers", "Misc"];
    const [books, setBooks] = useState<Checked>(false);
    const [furniture, setFurniture] = useState<Checked>(false);
    const [electronics, setElectronics] = useState<Checked>(false);
    const [food, setFood] = useState<Checked>(false);
    const [heaters, setHeaters] = useState<Checked>(false);
    const [coolers, setCoolers] = useState<Checked>(false);
    const [misc, setMisc] = useState<Checked>(true);
    const [categories, setCategories] = useState<string[]>(["Misc"]);

    const refClose = useRef(null)
    const router = useRouter();
    const sendOp = (val:string)=>{
        str=val;
    };

    const handleSearch = (str:string)=>{
        if (str === "") {
            router.push(`/`);
            return;
        }
        if (str.trim()=== "") {
            router.push(`/`);
            return;
        }
        let hrf=`/search?search=${str}`
        //append filters that are true


//remove last & if it exists
        if (hrf[hrf.length-1] === "&") {
            hrf = hrf.slice(0,hrf.length-1);
        }
        console.log(hrf);

       router.push(hrf);
       return;
        console.log("search icon clicked"+str);
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("form submitted");
        console.log(str);

        handleSearch(str);
    }
    return (<>
            <div className="flex flex-row justify-between items-center py-2 px-3 bg-gray-800 text-white">
                <Sheet>
                    <SheetTrigger  asChild>
                        <Button variant="outline" className="w-fit px-2">
                            <Image src="/menuIcon.png" width="20" height="20" alt="menu icon" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className=" border-0 bg-gray-700 rounded-lg shadow-lg p-6" side="left">

                        <div className="mt-8 -mb-6">
                            <Accordion type="single"  collapsible>
                                <AccordionItem className="border-0" value="item-1">
                                    <AccordionTrigger className="text-gray-300 hover:text-white"><div className="text-lg">Account</div></AccordionTrigger>
                                    <AccordionContent className="text-gray-300">
                                        <div className="mb-2 text-base ml-4 hover:text-white cursor-pointer" onClick={(e)=>{
                                            router.push("/myoffers")
                                            //@ts-ignore
                                            refClose.current.click();
                                        }}>View My Offers</div>
                                        <div className="mb-2 text-base ml-4 hover:text-white cursor-pointer" onClick={(e)=>{
                                            router.push("/mylistings")
                                            //@ts-ignore
                                            refClose.current.click();
                                        }}>View My Listings</div>
                                        <div className="mb-2 text-base ml-4 hover:text-white cursor-pointer" onClick={(e)=>{
                                            router.push("/login")
                                            //@ts-ignore
                                            refClose.current.click();
                                        }}>Login</div>
                                        <div className="mb-2 text-base ml-4 hover:text-white cursor-pointer">Personal Details</div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className="flex my-8 justify-between items-center mb-4 text-gray-300 hover:text-white cursor-pointer"
                             onClick={(e)=>{
                                 router.push("/")
                                 //@ts-ignore
                                 refClose.current.click();
                             }}>
                            <div className="mr-2 text-lg">Buy</div>
                            <img src="/buy.png" width="38" height="38" className="mr-5" alt="buy icon" />
                        </div>
                        <div className="flex my-8 items-center justify-between mb-4 text-gray-300 hover:text-white cursor-pointer" onClick={(e)=>{
                            router.push("/mylistings")
                        }}>
                            <div className="mr-2 text-lg">Sell</div>
                            <Image src="/sell.png" alt="sell" width="38" className="mr-5" height="38" />
                        </div>
                        <div className="text-gray-300 my-8 flex items-center justify-between hover:text-white cursor-pointer mb-2">
                            <div className="mr-2 text-lg">About</div>
                            <Image src="/about.png" alt="sell" width="38" className="mr-5" height="38" />
                        </div>
                        <div className="text-gray-300 my-8 flex items-center justify-between hover:text-white cursor-pointer mb-2">
                            <div className="mr-2 text-lg">Report an issue</div>
                            <Image src="/report.png" alt="sell" width="38" className="mr-5" height="38" />
                        </div>
<SheetFooter><SheetClose asChild>
    <Button type="submit" ref={refClose} className="bg-gray-700 text-gray-700">x</Button>
</SheetClose></SheetFooter>
                    </SheetContent>

                </Sheet>
                <div className="pl-32 flex flex-row max-md:yeet">
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-row">
                    <InputFLoatingLabel id="asfsss" label="" placeholder="What're you looking for?" className="" sendOp={sendOp}></InputFLoatingLabel>
                    <button className="bg-amber-500 text-xs text-black w-10 h-10 px-0 mx-0 pl-1 py-0 rounded-md"><img src="/search.png" width="28" height="28"
                                                                                                                      onClick={()=>{
                                                                                                                          console.log("search icon clicked");
                                                                                                                          console.log(`/search?search=${str}`)
                                                                                                                          //redirect user to result page, make url have search query. result page should render based on search query
                                                                                                                          handleSearch(str);
                                                                                                                      }}
                    /></button></div></form>
                </div>


                <div className="flex items-center">
                    <div className="text-xl font-bold mr-2">collegeXchange</div>
                    <Image src="/logo.png" alt="logo" width="50" height="50" />
                </div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="md:yeet flex flex-row p-1">  <InputFLoatingLabel id="asfasfsdf" submit={handleSearch} label="" placeholder="What're you looking for?" className="w-full" sendOp={sendOp}></InputFLoatingLabel>
                    <button className="bg-amber-500 text-xs text-black w-10 h-10 px-0 mx-0 pl-1 py-0 rounded-md" onClick={()=>{
                        console.log("search icon clicked");
                        console.log(`/search?search=${str}`)
                        //redirect user to result page, make url have search query. result page should render based on search query
                        handleSearch(str);
                    }}><img src="/search.png" width="28" height="28"/></button> </div>
            </form>

    </>

    )

}

export default NavThing;