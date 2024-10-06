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
      
      {/* select assistant language */}
      <div className="w-full flex justify-center items-center mt-0">
        <select
          disabled={callStatus === CALL_STATUS.ACTIVE || callStatus === CALL_STATUS.LOADING}
          value={assistantLanguage}
          onChange={(e) => setAssistantLanguage(e.target.value)}
        >
          <option value="Korean">Korean</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="English">English</option>
        </select>
      </div>
      {/* 아래 버튼을 누르면 인공지능 동반자와 대화할수 있습니다. */}
      {callStatus !== CALL_STATUS.ACTIVE && callStatus !== CALL_STATUS.LOADING && (
        <div className="w-full flex justify-center items-center mt-5 text-2xl">
          아래 버튼을 누르면 인공지능 동반자와 대화할수 있습니다.
        </div>
      )}

      {callStatus === CALL_STATUS.ACTIVE && (
        <div className="w-full flex justify-center items-center mt-5 text-2xl">
          대화중입니다. 대화를 종료하려면 다시 버튼을 누르세요.
        </div>
      )}



      <div className="w-full flex justify-center items-center mt-24">

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
