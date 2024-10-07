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
      
      {callStatus !== CALL_STATUS.ACTIVE && callStatus !== CALL_STATUS.LOADING && (
        <div className="w-full flex flex-col gap-2 justify-center items-center mt-5">

          
          <select
            //disabled={callStatus === CALL_STATUS.ACTIVE || callStatus === CALL_STATUS.LOADING}
            value={assistantLanguage}
            onChange={(e) => setAssistantLanguage(e.target.value)}
          >
            <option value="Korean">Korean</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="English">English</option>
          </select>
          


          <p className="mt-5 text-2xl text-center">
            아래 버튼을 누르면 인공지능 동반자와 대화할수 있습니다.
          </p>

        </div>
      )}

      {callStatus === CALL_STATUS.ACTIVE && (
        <p className=" mt-1 text-2xl text-center">
          대화중입니다. 대화를 그만하시려면 다시 버튼을 누르세요.
        </p>
      )}



      <div className="w-full flex flex-col gap-2 justify-center items-center mt-24">

        {callStatus === CALL_STATUS.LOADING && (
          <div className="text-2xl text-center">
            <p>인공지능 동반자와 연결중입니다. 잠시만 기다려주세요.</p>
          </div>
        )}

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
