'use client';

import React, { useEffect, useState } from "react"
import FireworksConfetti from "./confetti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OpenAI = require('openai');
export default function Home() {


  const openai = new OpenAI({
    apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true
  });


  const [promptText, setPromptText] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [responseData, setResponseData] = useState(null);
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
		setTimeout(() => {
			setConfettiVisible(false)
		}, 2000)
	}, [confettiVisible])




  const getResponse = async () => {
    setResponseData(null)
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

    removeText(response.choices[0].message.content)
    setButtonLoading(false)
    setConfettiVisible(true)

  }

  const removeText = (response) => {
    var code = response
    if (response.includes('```')) {
      code = response.split('```')[1]
      code = code.slice(4)
    }
    setResponseData(code)
  }

  const copyHTML = () => {
    const el = document.createElement('textarea');

    el.value = responseData;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast("Kodlar kopyalandı!")
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enter tuşunun varsayılan davranışını engelle
      getResponse(); // Mesaj gönderme fonksiyonunu çağır
    }
  };

  return (
    <div className="flex flex-col container mx-auto">
      <div className="bg-white  mx-auto my-3 shadow-md rounded px-3 lg:px-8 pt-6 pb-8 mb-4 w-11/12 lg:w-6/12 ">
        <h1 className="text-xl lg:text-3xl text-black">Web Form Oluşturucu - PromptForm</h1>
        <textarea className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="textInput" rows="4" cols="50" defaultValue={promptText} onChange={e => setPromptText(e.target.value)} placeholder="Birkaç kelime ile nasıl bir form ihtiyacınız olduğunu yazın..." onKeyPress={handleKeyPress}></textarea>


        {buttonLoading ? (<><button disabled className="text-white bg-gray-400  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center">
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
          Oluşturuluyor...
        </button></>) : (<><button disabled={promptText.length == 0} className={`${promptText.length > 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'}   text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`} type="button" onClick={() => getResponse()}>Oluştur</button></>)}
      </div>

      {responseData && (
        <div className="bg-white  mx-auto my-3 shadow-md rounded px-3 lg:px-8 pt-6 pb-8 mb-4 w-11/12 lg:w-6/12 ">
          <iframe className="mb-10" srcDoc={responseData} style={{ width: '100%', height: '500px', border: 'none' }} />
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={copyHTML}>Kodları Kopyala</button>
          {confettiVisible && (
            <FireworksConfetti />
          )}
        </div>
      )}
      <ToastContainer />

    </div>
  )
}