"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import InputFLoatingLabel from "@/components/InputFloatingLabel";



export default function Home() {
    const [value, setValue] = useState("");
    useEffect(()=>{
        console.log(value);
    },[value])

    return (
        <>
            <h1 className="">HKJHSKJHSKJHKSJF</h1>
            <InputFLoatingLabel label="email" placeholder="" sendOp={setValue} />
        </>
    );
}