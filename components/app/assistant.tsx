"use client";

import { CALL_STATUS, useVapi } from "../../hooks/useVapi";

import { AssistantButton } from "./assistantButton";

import { Display } from "./display";

import {
  Web3Button,
  ConnectWallet,
  useAddress,
} from "@thirdweb-dev/react";

import { use, useEffect, useState } from "react";

function Assistant() {


  //const address = useAddress();

  const address = '0x';


  //const assistantLanguage = 'Korean';

  const [assistantLanguage, setAssistantLanguage] = useState('Korean');

  console.log("assistantLanguage", assistantLanguage);

  
  const {
    isSpeechActive,
    callStatus,
    audioLevel,
    activeTranscript,
    messages,
    start,
    stop,
    toggleCall,
  } = useVapi();
  

 

  return (
    <div>

      {/* Connect Wallet */}
      {/*}
      <div className="connect-wallet">
        <ConnectWallet
          theme={"light"}
        />
      </div>
      */}




      <div className="chat-history">
        <Display />
      </div>


      
      <div className="w-full flex flex-col gap-2 justify-center items-center mt-5">

        {callStatus !== CALL_STATUS.ACTIVE && callStatus !== CALL_STATUS.LOADING ? (
          <select
            //disabled={callStatus === CALL_STATUS.ACTIVE || callStatus === CALL_STATUS.LOADING}
            value={assistantLanguage}
            onChange={(e) => setAssistantLanguage(e.target.value)}
          >
            <option value="Korean">
              한국어 (Korean)
            </option>
            <option value="Chinese">
              中文 (Chinese)
            </option>
            <option value="Japanese">
              日本語 (Japanese)
            </option>
            <option value="English">
              English (English)
            </option>
          </select>
        ) : null}
      </div>
 

      
      {callStatus !== CALL_STATUS.ACTIVE && callStatus !== CALL_STATUS.LOADING && (

        <p className="mt-5 text-2xl text-center">
          {/*아래 버튼을 누르면 한국어 인공지능 동반자와 대화할수 있습니다.*/}

          {assistantLanguage === "Korean" && "아래 버튼을 누르면 한국어 인공지능 동반자와 대화할수 있습니다."}
          {assistantLanguage === "Chinese" && "下面的按钮可以与中文人工智能伙伴交谈。"}
          {assistantLanguage === "Japanese" && "下のボタンを押すと日本語のAIコンパニオンと話すことができます。"}
          {assistantLanguage === "English" && "Press the button below to talk with English AI Companion."}

        </p>
      )}

      {callStatus === CALL_STATUS.ACTIVE && (
        <p className=" mt-1 text-2xl text-center">
          {/*대화중입니다. 대화를 그만하시려면 다시 버튼을 누르세요.*/}

          {assistantLanguage === "Korean" && "한국어로 대화중입니다. 대화를 그만하시려면 다시 버튼을 누르세요."}
          {assistantLanguage === "Chinese" && "中文で話しています。話をやめる場合は、もう一度ボタンを押してください。"}
          {assistantLanguage === "Japanese" && "日本語で話しています。話をやめる場合は、もう一度ボタンを押してください。"}
          {assistantLanguage === "English" && "Speaking in English. Press the button again to stop talking."}


        </p>
      )}

      {callStatus === CALL_STATUS.LOADING && (
          <p className="text-2xl text-center">
            {/* 한국어 인공지능 동반자와 연결중입니다. 잠시만 기다려주세요. */}

            {assistantLanguage === "Korean" && "한국어 인공지능 동반자와 연결중입니다. 잠시만 기다려주세요."}
            {assistantLanguage === "Chinese" && "正在连接中文人工智能伙伴。请稍等。"}
            {assistantLanguage === "Japanese" && "日本語のAIコンパニオンと接続中です。お待ちください。"}
            {assistantLanguage === "English" && "Connecting with English AI Companion. Please wait."}

          </p>
      )}


      <div className="w-full flex flex-col gap-2 justify-center items-center mt-24">



        {address && (
          <div className="user-input">
            <AssistantButton
              assistantLanguage={assistantLanguage}
              audioLevel={audioLevel}
              callStatus={callStatus}
              toggleCall={toggleCall}
            />
          </div>
        )}

      </div>
     
    </div>

  );
}

export { Assistant };
