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

  const [assistantLanguage, setAssistantLanguage] = useState('Chinese');

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
      <div className="w-full flex justify-center items-center mt-5">
        <select
          disabled={callStatus === CALL_STATUS.ACTIVE || callStatus === CALL_STATUS.LOADING}
          value={assistantLanguage}
          onChange={(e) => setAssistantLanguage(e.target.value)}
        >
          <option value="Chinese">Chinese</option>
          <option value="Korean">Korean</option>
          <option value="Japanese">Japanese</option>
          <option value="English">English</option>
        </select>
      </div>


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
