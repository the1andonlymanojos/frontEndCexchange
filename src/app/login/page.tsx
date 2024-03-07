"use client";

import InputFLoatingLabel from "@/components/InputFloatingLabel";
import {useState} from "react";

const login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

            <div className=" relative h-[93vh] w-full bg-gray-800">

                    <div className="flex items-center bg-gray-800 h-[90vh] justify-center">
                        <div className="bg-gray-100 p-14 rounded-xl px-16">
                            <div className="flex justify-center items-center">
                                <h1 className="text-3xl mb-10  text-black font-light">Login</h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <form action="" className="flex flex-col w-full">
                                   <InputFLoatingLabel id="9098" label="Email" type="email" className="mb-2"/>
                                    <InputFLoatingLabel id="12fasf" label="Password" type="password" className="mb-5"/>
                                    <button className="bg-black text-white py-2 rounded-lg">Login</button>
                                </form>
                            </div>
                        </div>

                </div>

            </div>


    );
}
export default login;