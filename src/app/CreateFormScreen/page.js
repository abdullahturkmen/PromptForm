'use client';

import React, { useEffect, useState, useRef } from "react"
import moment from "moment";
import FireworksConfetti from "../components/confetti";
import { toast } from 'react-toastify';


const OpenAI = require('openai');
export default function CreateFormScreen() {


  const openai = new OpenAI({
    apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true
  });


  const [promptText, setPromptText] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [responseList, setResponseList] = useState([]);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [inputFocusVisible, setInputFocusVisible] = useState(false);
  const inputContent = useRef(null);
  useOutsideAlerter(inputContent);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInputFocusVisible(false)
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
      setResponseList(storedArray);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setConfettiVisible(false)
    }, 2000)
  }, [confettiVisible])


  const getResponse = async () => {
    setButtonLoading(true)

    var text = promptText


    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: 'system',
        content: 'Sen html olarak çıktı veren glassmorphism stillendirmeli web form oluşturma aracısın, gradient arkaplana sahip olsun, pastel renkler ve ayrıca sans-serif google font kullan, yumuşak geçişlere sahip olsun. box-sizing: border-box özelliğini unutma'
      }, {
        role: "user",
        content: text
      }],
    });

    const newData = { prompt: promptText, data: removeText(response.choices[0].message.content), createDate: new Date() }
    const storedArray = JSON.parse(localStorage.getItem('promptFormList')) || [];
    storedArray.push(newData)
    localStorage.setItem("promptFormList", JSON.stringify(storedArray));

    setResponseList(current => [...current, newData])

    setButtonLoading(false)
    setConfettiVisible(true)
  }

  const removeText = (response) => {
    var code = response
    if (response.includes('```')) {
      code = response.split('```')[1]
      code = code.slice(4)
    }
    return code
  }

  const copyHTML = (index) => {
    const el = document.createElement('textarea');

    el.value = responseList[index].data;
    el.value = el.value.split("<body>").join("<body> <!-- Bu Form https://prompt-form.vercel.app Sitesi Aracılığıyla Yapılmıştır -->")
    el.value = el.value.split("</body>").join("<!-- Bu Form https://prompt-form.vercel.app Sitesi Aracılığıyla Yapılmıştır --> </body>")
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast.success("Kodlar kopyalandı!")
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getResponse();
    }
  };




  return (
    <>


      {responseList?.slice(0).reverse().map((response, index) => (
        <div className="sticky top-36 md:top-16 mx-auto my-3 rounded px-3 lg:px-8 pt-6 pb-8 mb-4 w-11/12 lg:w-6/12 relative" key={index}>
          <div className="bg-white p-2 text-sm text-gray-500 bg-gray-100 w-full rounded-tr-lg rounded-tl-lg flex items-center justify-between border border-b-0">
            <div className="truncate">{response.prompt}
              <div className="text-gray-300 text-[11px]">{moment(response.createDate).format('DD/MM/YYYY hh:mm')}</div>
            </div>

          </div>


          <div className="w-full relative overflow-hidden aspect-video rounded-br-lg rounded-bl-lg" >
            <button title="Kodları Kopyala" className="z-10 absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 text-gray-500 p-1 rounded-lg focus:ring focus:ring-violet-300 focus:shadow-md" onClick={(e) => copyHTML(index)}>
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
              frameBorder="0" loading="lazy" scrolling="no" srcDoc={response.data} tabIndex="-1"
              title={response.prompt}></iframe>


          </div>
        </div>
      ))}
      <div className="mb-28"></div>



      <div className="w-full fixed bottom-0 left-0 z-50">
        <div onFocus={() => setInputFocusVisible(false)} className=" bg-white  mx-auto shadow-md rounded-lg mb-0 md:mb-4 border w-[100%] md:w-11/12 lg:w-6/12 max-w-[600px]">
          <div className="flex items-center justify-center p-2 md:p-5 " ref={inputContent}>
            <div className="w-full rounded-lg bg-gray-200 border">


              {inputFocusVisible && (<>

                <div className="bg-white border-b rounded-tl-lg rounded-tr-lg p-3">
                  buraya radio buttonlar gelecek
                </div>

              </>)}

              <div className="flex">
                <div className={`hidden md:flex w-10 items-center justify-center  border-r border-gray-200 bg-white p-5 rounded-bl-lg ${inputFocusVisible ? '' : 'rounded-tl-lg'}`}>
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input type="text" className="rounded-tl-lg rounded-bl-lg md:rounded-none w-full bg-white pl-2 font-medium text-sm outline-0" placeholder="Birkaç kelime ile nasıl bir form ihtiyacınız olduğunu yazın..." onKeyPress={handleKeyPress} defaultValue={promptText} onChange={e => setPromptText(e.target.value)} disabled={buttonLoading} />

                <button disabled={promptText.length == 0} className={`${inputFocusVisible ? '' : 'rounded-tr-lg'} rounded-br-lg ${promptText.length > 0 ? 'text-gray-500' : ' text-gray-300'}  bg-white  font-bold py-2 px-4  focus:outline-none focus:shadow-outline`} type="button" onClick={() => getResponse()}>
                  {buttonLoading ? (<>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4  text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                  </>) : (<>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1004.03 0c-6.096 0-13.52 1.73-22.096 5.361L27.278 410.45c-34.368 14.577-36.544 42.689-4.832 62.449l269.76 168.032c31.712 19.744 73.648 62.08 93.184 94.047l161.712 264.768c9.28 15.184 20.496 22.72 31.28 22.72c11.92 0 23.28-9.152 31.025-27.232L1017.663 41.49C1028.718 15.617 1022.415 0 1004.03 0zM325.552 583.922L106.896 447.713l733.616-311.248L368.32 616.657c-14.432-12.8-29.088-24.224-42.768-32.735zM572.72 915.265l-130.432-213.52c-7.696-12.609-17.856-26.05-29.185-39.393l474.384-482.384z" /></svg>
                  </>)}</button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {confettiVisible && (
        <FireworksConfetti />
      )}
    
    </>
  )
}