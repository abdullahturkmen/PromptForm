'use client';

import React, { useEffect, useState, useRef } from "react"
import { toast } from 'react-toastify';
import moment from "moment";
import Link from "next/link";
import {
  db,
  collection,
  getDocs,
  query,
  limit,
  where,
  orderBy
} from '../firebase-config';


export default function library() {

  const [libraryList, setLibraryList] = useState([]);
  const [selectItemData, setSelectItemData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUserCreateForm, setIsUserCreateForm] = useState(false);

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
      setIsUserCreateForm(true)
    }
  }, []);

  const copyHTML = (data) => {
    const el = document.createElement('textarea');

    el.value = data;
    el.value = el.value.split("<body>").join("<body> <!-- Bu Form https://prompt-form.vercel.app Sitesi Aracılığıyla Yapılmıştır -->")
    el.value = el.value.split("</body>").join("<!-- https://linkedin.com/in/abdullahturkmen --> </body>")
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success("Kodlar kopyalandı!")
  };



  useEffect(() => {
    getForms()
  }, [])


  async function getForms() {
    setIsLoading(true);

    var limitSize = 24
    var whereDate = Date.now()
    var orderArrow = ">"

    if (libraryList?.length > 0) {
      limitSize = 12
      whereDate = libraryList[libraryList.length - 1].orderNum
      orderArrow = "<"
    }

    const formsCol = collection(db, "forms");
    const filter = query(formsCol,  orderBy('orderNum', 'desc'),where("orderNum",orderArrow, whereDate), limit(limitSize));
    const querySnapshot = await getDocs(filter);
    const formList = querySnapshot.docs.map(doc => doc.data());
    setLibraryList(current => [...current, ...formList])

    // const storedArray = JSON.parse(localStorage.getItem('firebaseFormList'));
    // if (storedArray) {
    //   console.log("storedArray length : ", storedArray.length)
    //   setLibraryList(current => [...current,...storedArray]);
    // }
    // else{
    //   const formsCol = collection(db, 'forms');
    //   const formSnapshot = await getDocs(formsCol);
    //   const formList = formSnapshot.docs.map(doc => doc.data());
    //   setLibraryList(formList)
    //   localStorage.setItem("firebaseFormList", JSON.stringify(formList));
    //   console.log("list : ", formList)
    // }

    setIsLoading(false);
  }


  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    getForms()
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);


  return (
    <>


      {!isUserCreateForm && (<>
        <div className="flex flex-col w-full flex-wrap content-center justify-center p-5 ">
          <div className=" mx-auto w-full max-w-[1400px] ">
            <div className="flex flex-col md:flex-row justify-between py-6 px-4 bg-teal-100 rounded-lg  space-y-2">
              <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-1">
                <img src="https://abdullahturkmen.com/abdullah-turkmen-avatar.jpg" className="rounded-full h-14 w-14" alt="" />
                <div className="flex flex-col space-y-1">
                  <span className="font-bold h3">Henüz Bir Form Oluşturmadın, Neden?</span>
                  <span className="text-sm">Muhteşem bir form oluştur ve web sitene ekle 🔥</span>
                </div>
              </div>
              <div className="flex-none py-2 text-stone-600 text-xs md:text-sm">
                <Link href="/create"
                  className="bg-white hover:bg-teal-600 text-teal-600 hover:text-white rounded-lg shadow hover:shadow-lg py-2 px-4 border border-teal-600 hover:border-transparent">
                  Hemen Oluştur</Link>
              </div>
            </div>
          </div>
        </div>
      </>)}


      <div className="flex flex-col w-full flex-wrap content-center justify-center p-5 ">
        <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">


          {libraryList?.map((response, index) => (
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
              <div className="text-gray-500 text-sm pt-2 truncate">{response.prompt}
                <div className="text-gray-300 text-[11px]">{moment(response.createDate).format('DD/MM/YYYY HH:mm')}</div>
              </div>
              {/* <ul className="mt-3 flex flex-wrap text-sm hidden">
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
              </ul> */}
            </div>
          ))}

        </div>
        <div className="mb-14"></div>

        {isLoading && (
          <div className="flex justify-center">
            <svg aria-hidden="true" role="status" className="inline w-[20%] max-w-[200px] text-teal-600 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
          </div>
        )}

      </div>

      {selectItemData && (
        <div className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full flex items-center justify-center bg-[#0000007d]">
          <div className="relative w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" ref={modalContent}>
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {selectItemData.prompt}
                  <div className="text-gray-300 text-[11px]">{moment(selectItemData.createDate).format('DD/MM/YYYY HH:mm')} tarihinde oluşturuldu</div>
                </h3>

                <button onClick={() => setSelectItemData(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Kapat</span>
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