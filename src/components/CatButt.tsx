"use client"

import {useRouter} from "next/navigation";

const CatButt = () => {
    const router = useRouter()
    return(
        <div className="flex space-x-2">
            <button  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={(e)=>{
                router.push('/search?search=books')
            }}>
                Books
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={(e)=>{
                        router.push('/search?search=Electronics')
                    }}>
                Electronics
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={(e)=>{
                        router.push('/search?search=Furniture')
                    }} >
                Furniture
            </button>
        </div>
    )
}
export default CatButt