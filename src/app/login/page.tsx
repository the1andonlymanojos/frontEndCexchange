const login = () => {
    return (

            <div className=" relative h-full w-full bg-[url('/bg1.png')]">
                <div className="bg-black w-full h-full lg:bg-opacity-60">
                    <nav className="px-12 py-5 opacity-100">
                        <img src="/logo.png" alt="logo" className=" h-20 " />
                    </nav>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-85 px-16">
                            <div className="flex justify-center items-center">
                                <h1 className="text-3xl font-bold">Login</h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <form action="" className="flex flex-col w-3/4">
                                    <input type="text" placeholder="Username" className="border-b-2 border-black my-3" />
                                    <input type="password" placeholder="Password" className="border-b-2 border-black my-3" />
                                    <button className="bg-black text-white py-2 rounded-lg">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


    );
}
export default login;