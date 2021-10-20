import React from "react";
import logo from "../../images/PathfinderLogo.png";
export default function Menu({resetGrid, visualiseDijkstras, algorithms, setCurrentAlgorithm}){
    return(
        <nav className="bg-gray-300 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="/" className="flex items-center py-4 px-2">
                                
                                <img className="w-10 h-10 " src={logo}></img>
                            </a>
                        </div>



                        <div className="hidden md:flex items-center space-x-1">
						<h1 className="cursor-pointer py-4 px-2 text-green-800 border-b-4 border-green-800 font-semibold ">Home</h1>

                        <div className="dropdown inline-block relative">
                            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                              <span className="mr-1">Algorithms</span>
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                            </button>
                            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow-lg">
                                {algorithms.map(algorithm => {
                                    return (
                                        <li className="" onClick={setCurrentAlgorithm(algorithm)}><h1 className="rounded bg-gray-200 hover:bg-green-800 hover:text-white text-center cursor-pointer py-2 px-8 block whitespace-no-wrap">{algorithm}</h1></li>

                                    );
                                })}
                            </ul>
                          </div>


                          <a href="/about" className="cursor-pointer py-4 px-2 text-gray-700 font-semibold hover:text-green-800 transition duration-300" >About</a > 
                        

                        </div>
                    </div>
                    <div>
                        <button onClick={visualiseDijkstras} className="bg-green-800 rounded p-2 m-2 text-white">Visualize Algorithm</button>
                        {/* <button onClick={resetGrid} className="bg-green-800 rounded p-2 m-2 text-white">Reset Grid</button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
