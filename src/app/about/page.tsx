import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">About CollegeXchange</h1>
                    <p className="mb-4">
                        At CollegeXchange, we understand the unique challenges and needs of college students. Thats why weve created a platform designed specifically for the college community, where you can buy and sell items with ease, right from your campus.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">A Platform Built for Speed and Scalability</h2>
                    <p className="mb-4">
                        CollegeXchange is powered by a robust Fastify backend, ensuring lightning-fast performance and seamless scalability. Our MySQL database provides rapid access to a vast inventory of products, ensuring that you can find what you need quickly and efficiently.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 mt-8">Full-Text Search: Find What You Need, Fast</h2>
                    <p className="mb-4">
                        Weve implemented a not-so-cutting-edge full-text search feature that tokenizes your search queries and searches for each individual token, ensuring that you get the most relevant results every time. Whether youre looking for a specific textbook, a gently used laptop, or a cozy piece of furniture, our search functionality will help you find it with ease.
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