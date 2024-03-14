import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Report an Issue (or give us feedback)</h1>
                    <p>
                        <b>
                        We{`'`}re always looking to improve CollegeXchange, and we{`'`}d love to hear from you. If you{`'`}ve encountered a bug, or if you have any suggestions for how we can make CollegeXchange better, please let us know.
                        </b>
                        <br></br>
                        <br></br>
                        Reach us at:
                        <br></br>
                        <br></br>
                        Manoj Shivagange, 2022IMT-070 <br></br>
                        Mail: 2022IMT070@iiitm.ac.in
                        <br></br>
                        <br></br>
                        Riya Shewale, 2022IMT-101 <br></br>
                        Mail: 2022IMT101@iiitm.ac.in
                        <br></br>
                        <br></br>
                        Siddhanth Baiswar, 2022IMT-108 <br></br>
                        Mail: 2022IMT108@iiitm.ac.in
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