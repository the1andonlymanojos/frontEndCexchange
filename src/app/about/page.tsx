import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">About CollegeXchange</h1>
                    <p className="mb-4">
                        <b>
                        This project is our submission for AASFs Winter Projects 2024. We have built this platform with practicality and maintainability in mind. We have tried to maintain good documentation and a clean codebase. Designed and built from the Ground up by:<br></br> <br></br>
                        Manoj Shivagange, 2022IMT-070
                        <br></br>
                        Riya Shewale, 2022IMT-101
                        <br></br>
                        Siddhanth Baiswar, 2022IMT-108
                        <br></br> <br></br>
                            We set out to solve a real problem, faced my our IIITM community. Im sure your mailboxes have been flooded at the end of every sem, with countless people trying to sell their stuff. We wanted to create a platform that would make this process easier, and more efficient. And so, CollegeXchange was born.
                            We wanted to simplify this process, and make it way easier for students to buy and sell things within their college community. Your contact details stay private, and are only shared to the bidder you choose. We hope you enjoy using CollegeXchange as much as we enjoyed building it. <br></br>
                            <br></br>Built with {'<'}3 by Manoj, Riya and Siddhanth. <br></br>
                            Also Next.js, Tailwind, Nginx, MySQL, Drizzle, and Fastify.
                        </b>
                        <br></br>
                        At CollegeXchange, we understand the unique challenges and needs of college students. Thats why weve created a platform designed specifically for the college community, where you can buy and sell items with ease, right from your campus.
                        This is a platform built for students, by students.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">A Platform Built for Speed and Scalability</h2>
                    <p className="mb-4">
                        CollegeXchange is powered by a robust Fastify backend, ensuring lightning-fast performance and seamless scalability. Our MySQL database provides rapid access to a vast inventory of products, ensuring that you can find what you need quickly and efficiently.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">Full-Text Search: Find What You Need, Fast</h2>
                    <p className="mb-4">
                        Weve implemented a not-so-cutting-edge full-text search feature that tokenizes your search queries and searches for each individual token, ensuring that you get the most relevant results every time. Whatever your looking for, if theres someone selling it, youll find it.
                    </p>


                    {/* Add more sections as needed */}
                </div>

            </main>
            <footer className="w-full bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    &copy; {new Date().getFullYear()} CollegeXchange. All rights reserved.
                </div>
            </footer>

        </div>
    )
}