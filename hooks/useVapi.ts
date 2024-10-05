"use client";

import { assistant } from "@/assistants/assistant";


import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
  TranscriptMessageTypeEnum,
} from "@/lib/types/conversation.type";

import { useEffect, useState } from "react";
// import { MessageActionTypeEnum, useMessages } from "./useMessages";
import { vapi } from "@/lib/vapi.sdk";

export enum CALL_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
  LOADING = "loading",
}

export function useVapi() {


  //const [assistantLanguage, setAssistantLanguage] = useState('Chinese');


  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE
  );

  const [messages, setMessages] = useState<Message[]>([]);

  const [activeTranscript, setActiveTranscript] =
    useState<TranscriptMessage | null>(null);

  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    
    const onSpeechStart = () => {
      console.log("Speech has started");
      setIsSpeechActive(true);
    }

    const onSpeechEnd = () => {
      console.log("Speech has ended");
      setIsSpeechActive(false);
    };

    const onCallStartHandler = () => {
      console.log("Call has started");
      setCallStatus(CALL_STATUS.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("Call has stopped");
      setCallStatus(CALL_STATUS.INACTIVE);
    };

    const onVolumeLevel = (volume: number) => {
      ///console.log("Volume level", volume);

      setAudioLevel(volume);
    };

    const onMessageUpdate = (message: Message) => {

      console.log("message======>", message);
      console.log("message type", message.type);
      
      
      if (
        message.type === MessageTypeEnum.TRANSCRIPT &&
        message.transcriptType === TranscriptMessageTypeEnum.PARTIAL
      ) {
        setActiveTranscript(message);
      } else {
        setMessages((prev) => [...prev, message]);
        setActiveTranscript(null);
      }
    };

    const onError = (e: any) => {
      setCallStatus(CALL_STATUS.INACTIVE);
      console.error(e);
    };

    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("call-start", onCallStartHandler);
    vapi.on("call-end", onCallEnd);
    vapi.on("volume-level", onVolumeLevel);
    vapi.on("message", onMessageUpdate);
    vapi.on("error", onError);

    return () => {
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("call-start", onCallStartHandler);
      vapi.off("call-end", onCallEnd);
      vapi.off("volume-level", onVolumeLevel);
      vapi.off("message", onMessageUpdate);
      vapi.off("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);






  const start = async (assistantLanguage: string) => {
    
    console.log("start");

    setCallStatus(CALL_STATUS.LOADING);

    
    //const response = vapi.start(assistant);

    let assistantID = "";

    if (assistantLanguage == "Korean") {
      assistantID = "bd429aad-ac21-4d2c-b899-c77f227ca396";
    } else if (assistantLanguage == "Chinese") {
      assistantID = "7a0e2e00-d99b-467b-8639-b343722faba5";
    } else if (assistantLanguage == "English") {
      assistantID = "ae8e1fb1-de7b-4c42-aa9a-d9327a7873c1";
    } else if (assistantLanguage == "Japanese") {
      assistantID = "ee58686d-b50c-4e6e-9f6e-aa138762227b";
    }

    const response = vapi.start(
      assistantID
    );


    
    /*
    const response = vapi.start(
      "bd429aad-ac21-4d2c-b899-c77f227ca396"
    );
    */

    
    /*
    const response = vapi.start(
      {
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
      }
    );
    
    */

    
    response.then((res) => {

      console.log("call", res);


    });
  
    


    /*
        vapi.send({
      type: MessageTypeEnum.ADD_MESSAGE,
      message: {
        role: "system",
        content: `Here is the list of suggested shows: ${JSON.stringify(
          shows.map((show) => show.title)
        )}`,
      },
    });
    */



        // request to backend to request for assistant

    // assistant-request
    /*
    export enum VapiWebhookEnum {
      ASSISTANT_REQUEST = "assistant-request",
      FUNCTION_CALL = "function-call",
      STATUS_UPDATE = "status-update",
      END_OF_CALL_REPORT = "end-of-call-report",
      HANG = "hang",
      SPEECH_UPDATE = "speech-update",
      TRANSCRIPT = "transcript",
    }
    */

    /*
    vapi.send({
      type: "assistant-request",
      message: {
        role: "user",
        content: "Hello",
      },
    });
    */
    /*
    vapi.send({
      type: "add-message",
      message: {
        role: "system", // system, user, assistant, tool or function
        content: "The user has pressed the button, say peanuts",
      },
    });
    */




  };




  const stop = () => {

    console.log("stop");

    setCallStatus(CALL_STATUS.LOADING);
    vapi.stop();
  };

  const toggleCall = (
    assistantLanguage: string
  ) => {

    //setAssistantLanguage(assistantLanguage);

    console.log("toggleCall");

    if (callStatus == CALL_STATUS.ACTIVE) {
      stop();
    } else {
      start(assistantLanguage);
    }
  };


  return {
    isSpeechActive,
    callStatus,
    audioLevel,
    activeTranscript,
    messages,
    start,
    stop,
    toggleCall,
  };

}
