
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
    answered: boolean;
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


const QandApublic = ({questions, withansbox}:{
    questions: question[]
    withansbox?: boolean
}) => {
    return (
        <div>
            <Accordion type="multiple" defaultChecked={false}>
                {
                    questions.map((question, index)=>{
                        return(
                            <AccordionItem key={index} value={"item "+index}>
                                <AccordionTrigger>
                                    {question.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {question.answered ? question.answer : withansbox?<>
                                    <div>
                                        <InputFLoatingLabel
                                            label="Answer"
                                            type="text"
                                            value=""
                                            onChange={(e)=>{}}
                                         id={"afsdfasd"+index}/>
                                        <Button onClick={(e)=>{
                                            //submit answer
                                            const answer = (document.getElementById("afsdfasd"+index) as HTMLInputElement).value;
                                            console.log(answer)
                                            const epoint = `${backend}+api/questions/answer/${question.id}`
                                            fetch(epoint, {
                                                method: "POST",
                                                cache: "no-cache",
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
                                                    question.answered = true;
                                                }
                                                else{
                                                    console.log("failed")
                                                }
                                            })
                                        }}>Submit Answer</Button>
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