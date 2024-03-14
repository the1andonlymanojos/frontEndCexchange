
/*
CREATE TABLE questions (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     listing_id INT NOT NULL,
    ->     user_id INT NOT NULL,
    ->     question TEXT NOT NULL,
    ->     answer TEXT,
    ->     answered BOOLEAN DEFAULT 0,
    ->     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ->     FOREIGN KEY (listing_id) REFERENCES listings(id),
    ->     FOREIGN KEY (user_id) REFERENCES users(id)
    -> );
    */

import InputFLoatingLabel from "@/components/InputFloatingLabel";

type question = {
    id: number;
    listing_id: number;
    user_id: number;
    question: string;
    answer: string | null; // Assuming answer can be null
    answered: number;
    created_at: string;
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button";
import {backend} from "@/constants";


const QandApublic = ({questions, withansbox, setQ}:{
    questions: question[]
    withansbox?: boolean
    setQ?: any
}) => {
    return (
        <div>
            <Accordion type={withansbox?"single":"multiple"} defaultChecked={false}>
                {
                    questions.map((question, index)=>{
                        return(
                            <AccordionItem key={index} value={"item "+index}>
                                <AccordionTrigger>
                                    {question.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {question.answered ? question.answer : withansbox?<>
                                    <div className="p-1 m-1">
                                        <InputFLoatingLabel
                                            label="Answer"
                                            type="text"
                                            onChange={(e)=>{
                                            }}
                                         id={"afsdfasd"+index}/>
                                        <Button onClick={(e)=>{
                                            //submit answer
                                            const answer = (document.getElementById("afsdfasd"+index) as HTMLInputElement).value;
                                            console.log(answer)
                                            const epoint = `${backend}api/questions/answer/${question.id}`
                                            fetch(epoint, {
                                                method: "POST",
                                                cache: "no-cache",
                                                credentials: 'include',
                                                headers:{
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    answer: answer
                                                })
                                            }).then((res)=>{
                                                if (res.status === 200){
                                                    console.log("success")
                                                    question.answer = answer;
                                                    // remove the question from the list of questions
                                                    setQ((prevState:any)=>{
                                                        if (prevState.length=== 1) {
                                                            return []
                                                        }
                                                        return prevState.filter((q:question)=>{
                                                            return q.id !== question.id
                                                        })
                                                    })
                                                }
                                                else{
                                                    console.log("failed")
                                                }
                                            })
                                        }}
                                        className="bg-gray-100 text-black font-thin">Submit Answer</Button>
                                    </div>
                                    </>:"Not answered yet"}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>


        </div>
    )
}

export default QandApublic