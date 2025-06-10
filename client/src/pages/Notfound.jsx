import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotfound404() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
  <main className="grid min-h-full place-items-center max-h-screen bg-gray-800 px-6 py-24 sm:py-32 lg:px-8 ">
    <div className="text-center">
            {/* 404 Text */}
        <div className="flex justify-center  space-x-2 text-[12em] mt-4 animate-bounce w-screen ">
            <div className="text-white">4</div>
            <div className="text-white bg-slate-400">0</div>
            <div className="text-white">4</div>
        </div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            or <br /><span>does not Exist anymore</span> 
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-20">
            {/*________________________  Go Back Button _______________________ */}
            <button onClick={handleGoBack}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200" >
                ← Go Back
            </button>
            <Link to="#" className="text-sm font-semibold text-white">
                     Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
        </div>
    </div>
            
   </main>

   

      

  );
}