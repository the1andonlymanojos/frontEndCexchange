"use client";

import InputFLoatingLabel from "@/components/InputFloatingLabel";
import {useState} from "react";

const login = ({params, searchParams}:{
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = ()=>{
        //send the data to the backend, depending on the isLogin, send the data to the login or register endpoint
        //do the data validation here itself.
        //if 404, redirect to error page
        //if 200, redirect to the home page, or the page the user was on before logging in which is stored in search query
        //if password is wrong, show a toaster, clear the password field
        //if account not found, show a toaster, clear the password field, change isLogin to false
        //if account already exists, show a toaster, clear the password field, change isLogin to true
    }

    return (<>


            <div className=" relative h-[95vh] w-full bg-gray-800">
                <div className="bg-gray-800 h-[65px] max-md:w-[100vw] lg:left-[36vw] max-md:left-0 w-96 absolute -top-[60px] left-[34vw]"></div>

                    <div className="flex items-center bg-gray-800 h-[90vh] justify-center">
                        <div className="bg-gray-100 p-14 rounded-xl px-16">
                            <div className="flex justify-center items-center">
                                <h1 className="text-3xl mb-10  text-black font-light">{isLogin?`Login`:`Register`}</h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <form action="" className="flex flex-col w-full">
                                   <InputFLoatingLabel id="9098" label="Email" type="email" className="mb-2"/>
                                    {isLogin ? null : <InputFLoatingLabel id="sfsxcs" label="Username" type="text" className="mb-2"/>}
                                    <InputFLoatingLabel id="12fasf" label="Password" type="password" className="mb-2"/>
                                    {isLogin ? null : <InputFLoatingLabel id="asfsafcxxcxv" label="Confirm Password" type="password" className="mb-2"/>}
                                    <button className="bg-black text-white py-2 rounded-lg">{isLogin?`Login`:`Register`}</button>
                                    {isLogin ? <p className="text-center mt-5">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={()=>setIsLogin(false)}>Sign Up</span></p> : <p className="text-center mt-5">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={()=>setIsLogin(true)}>Login</span></p>}
                                </form>
                            </div>
                        </div>

                </div>

            </div>
        </>


    );
}
export default login;