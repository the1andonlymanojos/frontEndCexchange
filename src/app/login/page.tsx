"use client";
import {useToast} from "@/components/ui/use-toast";

import InputFLoatingLabel from "@/components/InputFloatingLabel";
import {useState} from "react";
import {ToastAction} from "@/components/ui/toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const login = ({params, searchParams}:{
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const { toast } = useToast()
    const router = useRouter();


    const redirUrl = searchParams.redir;
    const endPointLogin = `http://localhost:3000/api/account/login`
    const endPointRegister = `http://localhost:3000/api/account/register`

    const handleSubmit = async ()=>{
        if(isLogin){
            //login submit
            const payload = {
                email,
                password
            }
            try{
                const res = await fetch(endPointLogin, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                if(res.status === 200){
                    toast({
                        title: "Login Success!",
                        description: "You are now logged in",
                    })
                    if(redirUrl){
                        if (typeof redirUrl === "string") {
                            router.push(redirUrl);
                        }
                    }
                    router.push('/')

                }else{
                    switch (res.status) {
                        case 469:
                            toast({
                                title: "Login Failed!",
                                description: "Email not found, try registering",
                                variant: "destructive"
                            })
                            setIsLogin(false);
                            break;
                        case 470:
                            toast({
                                title: "Login Failed!",
                                description: "Password incorrect",
                            })
                            break;
                    }
                }
            }
            catch (e){

                toast({
                    title: "Login Failed!",
                    // @ts-ignore
                    description: e.toString(),
                })
            }

        }else {
            //register submit
            if(email === "" || password === "" || userName === "" || phone === "" || confirmPassword === ""){
                toast({
                    title: "Empty Fields!",
                    description: "All fields are required",
                })
                return;
            }
            if (phone.length!=10){
                toast({
                    title: "Phone number invalid",
                    description: "bad phone number",
                })
            }
            const payload = {
                email,
                password,
                username:userName,
                phoneNumber: phone
            }
            try {
                const res = await fetch(endPointRegister, {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),

                })
                switch (res.status) {
                    case 201:
                        toast({
                            title:"Account Created!",
                            description:"Log in with your new account"
                        })
                        router.push('/')
                        break;
                    case 409:
                        toast({
                            title:"account with this email exists!",
                            description:"Reset your password if you dont remember"
                        })
                        break;
                }
                
            } catch (e){
                
            }
        }
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
                                <form action={(event)=>{ handleSubmit()}} className="flex flex-col w-full">
                                   <InputFLoatingLabel id="909j8" label="Email" type="email" sendOp={setEmail} className="mb-2"/>
                                    {isLogin ? null : <InputFLoatingLabel id="sfsxcs" label="Username" type="text" sendOp={setUserName} className="mb-2"/>}
                                    {isLogin ? null : <InputFLoatingLabel id="asfxcccx" label="Phone Number" type="text" sendOp={setPhone} className="mb-2"/>}
                                    <InputFLoatingLabel id="12fasf" label="Password" type="password" sendOp={setPassword} className="mb-2"/>
                                    {isLogin ? null : <InputFLoatingLabel id="asfsafcxxcxv" label="Confirm Password" sendOp={setConfirmPassword} type="password" className="mb-2"/>}
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