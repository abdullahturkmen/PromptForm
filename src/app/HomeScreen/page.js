'use client';

import React, { useEffect, useState, useRef } from "react"
import Link from "next/link";
export default function HomeScreen() {

  return (
    <>
      <section>
        <div className=" py-20">
          <div className="container mx-auto flex flex-col md:flex-row items-center ">
            <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              <h1 className="text-3xl md:text-5xl p-2 text-teal-600 tracking-loose pl-0">PromptForm</h1>
              <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Form Oluşturmak Çok Pratik
              </h2>
              <p className="text-sm md:text-base text-black-50 mb-4">Birkaç kelime ile aklınızdaki tasarıma en uygun formu oluşturmak için;</p>
              <Link href="/CreateFormScreen"
                className="bg-transparent hover:bg-teal-600 text-teal-600 hover:text-white rounded-lg shadow hover:shadow-lg py-2 px-4 border border-teal-600 hover:border-transparent">
                Hemen Başla</Link>
            </div>
            <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
              <div className="stack">
                <div className="content card">




                  <div className="form-container">
                    <form>
                      <label for="name">Kullanıcı Adı:</label>
                      <input type="text" id="name" name="name" placeholder="Kullanıcı Adı Girin" readonly autoComplete="off" />

                      <label for="email">Parola:</label>
                      <input type="password" id="email" name="email" placeholder="************" readonly autoComplete="off" />

                      <input value="Gönder" className="submit-btn" disabled/>
                    </form>
                  </div>




                </div>
                <div className="padding card"></div>
                <div className="border card"></div>
                <div className="background card"></div>
                <div className="box-shadow card"></div>
              </div>
              {/* <div className="h-48 flex flex-wrap content-center">
                <div>
                  <img className="inline-block mt-28 hidden xl:block" src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png" /></div>
                <div>
                  <img className="inline-block mt-24 md:mt-0 p-8 md:p-0" src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png" /></div>
                <div>
                  <img className="inline-block mt-28 hidden lg:block" src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png" /></div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}