'use client';

import React, { useEffect, useState } from "react"
import moment from "moment";


export default function LibraryScreen() {

  const [libraryList, setLibraryList] = useState([]);

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('promptFormList'));
    if (storedArray) {
      setLibraryList(storedArray);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full flex-wrap content-center justify-center p-5 ">
        <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">



          {libraryList?.slice(0).reverse().map((response, index) => (
            <div className="w-auto bg-white p-3 shadow-lg hover:shadow-xl rounded-xl">
              <div className="w-full relative overflow-hidden aspect-video rounded-lg hover:shadow" >
                <iframe
                  className="absolute border-0"
                  style={{
                    width: 'calc(200% + 5px)',
                    height: 'calc(200% + 5px)',
                    top: '-2px',
                    left: "-2px",
                    transform: "scale(.5)",
                    transformOrigin: "top left",
                  }}

                  sandbox="allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-presentation"
                  frameborder="0" loading="lazy" scrolling="no" srcDoc={response.data} tabIndex="-1"
                  title={response.prompt}></iframe>
              </div>
              <div className="text-gray-500 text-sm pt-2 truncate">{response.prompt}</div>
              <ul className="mt-3 flex flex-wrap text-sm">
                <li className="mr-auto">
                  <a href="#" className="flex items-center text-gray-400 hover:text-gray-600">
                    <svg className="mr-0.5" style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
                    </svg>
                    1
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex items-center text-gray-400 hover:text-gray-600">
                    <svg className="mr-0.5" style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                    </svg>
                    24
                  </a>
                </li>
                <li className="mr-2">
                  <a href="#" className="flex items-center text-gray-400 hover:text-gray-600">
                    <svg className="mr-0.5" style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                    </svg>
                    3
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-400 hover:text-red-600">
                    <svg className="mr-0.5" style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                    3
                  </a>
                </li>
              </ul>
            </div>
          ))}


        </div>
        <div className="mb-14"></div>
        <div className="max-w-2xl mx-auto">

          <nav>
            <ul className="inline-flex -space-x-px">
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3">Önceki</a>
              </li>
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3">1</a>
              </li>
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3">2</a>
              </li>
              <li>
                <a href="#" aria-current="page"
                  className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3">4</a>
              </li>
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3">5</a>
              </li>
              <li>
                <a href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3">Sonraki</a>
              </li>
            </ul>
          </nav>


        </div>
      </div>

    </>
  )
}