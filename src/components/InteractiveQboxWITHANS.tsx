"use client";
import QandApublic from "@/components/QandApublic";
import InputFLoatingLabel from "@/components/InputFloatingLabel";
import {Button} from "@/components/ui/button";
import {backend} from "@/constants";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {useRouter} from "next/navigation";

type question = {
    id: number;
    listing_id: number;
    user_id: number;
    question: string;
    answer: string | null; // Assuming answer can be null
    answered: number;
    created_at: string;
}

const InteractiveQboxWITHANS = ({listingId}:{
    listingId: number;
})=>{
    const router = useRouter();
    const [question, setQuestion] = useState<string>("")
    const endPointForQuestions = `${backend}api/questions/${listingId}`
    console.log(endPointForQuestions)
    const [questions, setQuestions] = useState<question[]>([]);
    const toaster = useToast();
    const fetchQuestions = async (listingID:number) => {
        const res = await fetch(endPointForQuestions, {
            method: "GET",
            cache: "no-cache",
            headers:{
                'Content-Type': 'application/json',
            },
        });
        const body = await res.json();
        if (res.status !== 200) {
            console.log("failed to fetch");
            console.log(res.status)
            const response = await res.json();
            console.log(response);
            //in future make an error page and redirect users to that
        }
        console.log(body);
        if (body.questions.length>0){
            const unAnsweredQuestions = body.questions.filter((question:question)=>{
                return question.answered===0;
            })
            setQuestions(unAnsweredQuestions);
        }


    }

    useEffect(()=>{
        fetchQuestions(listingId);
    },[])

    return(
        <>
        <div className="relative bg-white rounded-lg p-4 mb-1 w-full">
            <div className="text-xl font-thin absolute top-2 left-7">QnA</div>

            <div className="bg-white rounded-lg p-2 mb-1 mt-4 w-full max-h-[300px] overflow-y-scroll">

                <QandApublic withansbox={true} setQ={setQuestions} questions={questions}></QandApublic>
            </div>
            <div className="text-xs font-thin absolute bottom-1 left-4">scroll for more</div>
        </div>
    </>
    )
}

export default InteractiveQboxWITHANS;