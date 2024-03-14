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
    answered: boolean;
    created_at: string;
}

const InteractiveQbox = ({listingId}:{
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
        setQuestions(body.questions);
    }

    useEffect(()=>{
        fetchQuestions(listingId);
    },[])

    return(
        <>
        <div className="relative bg-white rounded-lg p-4 mb-1 w-full">
            <div className="text-xl font-thin absolute top-2 left-7">QnA</div>

            <div className="bg-white rounded-lg p-2 mb-1 mt-4 w-full max-h-[300px] overflow-y-scroll">

                <QandApublic questions={questions}></QandApublic>
            </div>
            <div className="text-xs font-thin absolute bottom-1 left-4">scroll for more</div>
        </div>
    <div className="bg-white rounded-lg p-1 w-full">
        <InputFLoatingLabel label={"Ask a question"} className="m-1" sendOp={setQuestion} id={"dhfgfdghcfgchg"}></InputFLoatingLabel>
        <Button className="ml-2 bg-gray-800 text-white" onClick={(e)=>{
            if (question === ""){
                toaster.toast({
                    title: "Empty question",
                    description: "Please enter a question",
                })
                return;
            }
            if (question.trim()=== ""){
                toaster.toast({
                    title: "Empty question",
                    description: "Please enter a question",
                })
                return;
            }
            if (question.length > 100){
                toaster.toast({
                    title: "Question too long",
                    description: "Please keep the question under 100 characters",
                })
            }
            const postQuestion = async () => {
                const endpoint = `${backend}api/questions/${listingId}`;
                const res = await fetch(endpoint, {
                    method: "POST",
                    cache: "no-cache",
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question,
                    }),
                    credentials: 'include',
                });
                if (res.status === 401){
                    toaster.toast({
                        title: "Not logged in",
                        description: "Please log in to ask a question",
                        action: <ToastAction asChild altText={"login"}><Button className="bg-gray-100 text-black" variant="default" onClick={(e)=>{
                            router.push("/login?redirect="+window.location.pathname)
                        }}>Login</Button></ToastAction>
                    })
                    return;
                }
                if (res.status !== 200){
                    toaster.toast({
                        title: "Failed to ask question",
                        description: "Please try again",
                    })
                    return;
                }
                if (res.status===200){
                    toaster.toast({
                        title: "Question asked",
                        description: "Your question has been asked",
                    })
                    const bdy = await res.json();
                    const qid = bdy.questionId
                    setQuestions((prevQuestions)=>{
                        return [ {
                            id: qid,
                            listing_id: listingId,
                            user_id: 0,
                            question: question,
                            answer: null,
                            answered: false,
                            created_at: "2021-10-20T00:00:00Z"
                        },...prevQuestions]
                    })

                    setQuestion("");
                }
            }
            postQuestion();
        }} variant={"outline"}>Submit</Button>
    </div>
    </>
    )
}

export default InteractiveQbox;