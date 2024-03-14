"use client"
// @ts-ignore
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const CheckIfLoggedIn = () => {
    const router = useRouter();

    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(()=>{
        const cookie = Cookies.get('jwtToken');
        if(cookie){
            setLoggedIn(true);
            console.log("logged in ")
        } else {
            setLoggedIn(false);
            console.log("not logged in")
        }
    },[])


    return(
        <div className={"flex flex-col"}>
            {!loggedIn && <>
                <div>Log in or Register to get started!</div>
                <div className="flex flex-row justify-center">
                    <button className="px-4 py-2 mx-1 bg-gray-700 rounded-lg hover:bg-gray-600 text-white " onClick={(e)=>{
                        router.push('/login')
                    }

                    }>Login</button>
                    <button className="px-4 py-2 mx-1 bg-gray-700 rounded-lg hover:bg-gray-600 text-white" onClick={(e)=>{
                        router.push('/register')
                    }}>Register</button>
                </div>
            </>}


        </div>
    )
}

export default CheckIfLoggedIn;