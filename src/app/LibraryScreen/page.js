'use client';

import React, { useEffect, useState, useRef } from "react"
import { toast } from 'react-toastify';
import moment from "moment";


export default function LibraryScreen() {

  const [libraryList, setLibraryList] = useState([]);
  const [selectItemData, setSelectItemData] = useState(null);
  const [inputFocusVisible, setInputFocusVisible] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const modalContent = useRef(null);
  useOutsideAlerter(modalContent);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectItemData(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('promptFormList'));
    if (storedArray) {
      setLibraryList(storedArray);
    }
  }, []);



  const copyHTML = (data) => {
    const el = document.createElement('textarea');

    el.value = data;
    el.value = el.value.split("<body>").join("<body> <!-- Bu Form https://prompt-form.vercel.app Sitesi Aracılığıyla Yapılmıştır -->")
    el.value = el.value.split("</body>").join("<!-- Bu Form https://prompt-form.vercel.app Sitesi Aracılığıyla Yapılmıştır --> </body>")
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success("Kodlar kopyalandı!")
  };

  useEffect(() => {
    setTotalPageNum(Math.ceil(libraryList.length / 12))
  }, [libraryList])

  useEffect(() => {
    const pageArr = Array.from({ length: totalPageNum }, (_, index) => index + 1);
    setPageNumbers(pageArr)
  }, [totalPageNum])



  const prevPage = () => {
    setCurrentPageNum(currentPageNum - 1)
  }

  const nextPage = () => {
    setCurrentPageNum(currentPageNum + 1)
  }

  const onPageChange = (num) => {
    setCurrentPageNum(num)
  }


  return (
    <>
      <div className="flex flex-col w-full flex-wrap content-center justify-center p-5 ">
        <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">


          {libraryList?.slice(0).reverse().map((response, index) => (
            <div className="w-auto bg-white p-3 shadow-lg hover:shadow-xl rounded-xl cursor-pointer" onClick={() => setSelectItemData(response)} key={index}>
              <div className="w-full relative overflow-hidden aspect-video rounded-lg" >
                <iframe
                  className="absolute border-0 pointer-events-none"
                  style={{
                    width: 'calc(200% + 5px)',
                    height: 'calc(200% + 5px)',
                    top: '-2px',
                    left: "-2px",
                    transform: "scale(.5)",
                    transformOrigin: "top left",
                  }}

                  sandbox="allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-presentation"
                  frameBorder="0" loading="lazy" scrolling="no" srcDoc={response.data} tabIndex="-1"
                  title={response.prompt}></iframe>
              </div>
              <div className="text-gray-500 text-sm pt-2 truncate">{response.prompt}</div>
              <ul className="mt-3 flex flex-wrap text-sm hidden">
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
        {totalPageNum > 1 && (<>

          <div className="max-w-2xl mx-auto">
            <nav>
              <ul className="inline-flex -space-x-px">

                {currentPageNum > 1 && (<>
                  <li>
                    <a onClick={prevPage}
                      className="cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3">Önceki</a>
                  </li>
                </>)}
                {pageNumbers.map(number => (
                  <li
                    key={number}
                    onClick={() => onPageChange(number)}
                  >
                    <a
                      className={`cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 ${number === currentPageNum ? ' dark:bg-gray-700 dark:text-white' : ''}`}>{number}</a>

                  </li>
                ))}
                {currentPageNum < totalPageNum && (<>
                  <li>
                    <a onClick={nextPage}
                      className="cursor-pointer bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3">Sonraki</a>
                  </li>
                </>)}

              </ul>
            </nav>


          </div>
        </>)}

      </div>





      {selectItemData && (


        <div className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full flex items-center justify-center bg-[#0000007d]">
          <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" ref={modalContent}>
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {selectItemData.prompt}
                </h3>
                <button onClick={() => setSelectItemData(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 w-full relative overflow-hidden aspect-video"
              >
                <button title="Kodları Kopyala" className=" z-10 absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-500 p-1 rounded-lg focus:ring focus:ring-violet-300 focus:shadow-md" onClick={(e) => copyHTML(selectItemData.data)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M216 34H88a6 6 0 0 0-6 6v42H40a6 6 0 0 0-6 6v128a6 6 0 0 0 6 6h128a6 6 0 0 0 6-6v-42h42a6 6 0 0 0 6-6V40a6 6 0 0 0-6-6Zm-54 176H46V94h116Zm48-48h-36V88a6 6 0 0 0-6-6H94V46h116Z" /></svg>
                </button>
                <iframe
                  className="absolute bg-white  w-full border-0 shadow-md"
                  style={{
                    width: 'calc(200% + 5px)',
                    height: 'calc(200% + 5px)',
                    top: '-2px',
                    left: "-2px",
                    transform: "scale(.5)",
                    transformOrigin: "top left",
                  }}

                  sandbox="allow-forms allow-modals allow-pointer-lock allow-same-origin allow-scripts allow-presentation"
                  frameBorder="0" loading="lazy" scrolling="no" srcDoc={selectItemData.data} tabIndex="-1"
                  title={selectItemData.prompt}></iframe>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}