import { CALL_STATUS, useVapi } from "@/hooks/useVapi";
import { Loader2, Mic, Square } from "lucide-react";
import { Button } from "../ui/button";



const AssistantButton = ({
  
  assistantLanguage,

  toggleCall,
  callStatus,
  audioLevel = 0,

//}: Partial<ReturnType<typeof useVapi>>) => {

}:
{
  assistantLanguage: string;
  toggleCall: (assistantLanguage: string) => void;
  callStatus: CALL_STATUS;
  audioLevel?: number;
}) => {


  console.log("AssistantButton assistantLanguage", assistantLanguage);

  
  const color =
    callStatus === CALL_STATUS.ACTIVE
      ? "red"
      : callStatus === CALL_STATUS.LOADING
      ? "orange"
      : "green";

  const buttonStyle = {
    borderRadius: "50%",
    width: "160px",
    height: "160px",
    color: "white",
    border: "none",
    boxShadow: `1px 1px ${100 + audioLevel * 40}px ${audioLevel * 100}px ${color}`,
    backgroundColor:
      callStatus === CALL_STATUS.ACTIVE
        ? "red"
        : callStatus === CALL_STATUS.LOADING
        ? "orange"
        : "green",
    cursor: "pointer",
  };

  return (
    <Button
      style={buttonStyle}
      className={`transition ease-in-out ${
        callStatus === CALL_STATUS.ACTIVE
          ? "bg-red-500 hover:bg-red-700"
          : callStatus === CALL_STATUS.LOADING
          ? "bg-orange-500 hover:bg-orange-700"
          : "bg-green-500 hover:bg-green-700"
      } flex items-center justify-center`}
      onClick={
        toggleCall ? () => toggleCall(assistantLanguage) : () => {}
      }
    >
      {callStatus === CALL_STATUS.ACTIVE ? (
        <Square
          className="animate-pulse w-24 h-24"
        />
      ) : callStatus === CALL_STATUS.LOADING ? (
        <Loader2
          className="animate-spin w-24 h-24"
        />
      ) : (
        <Mic
          className="w-24 h-24"
        />
      )}
    </Button>
  );
};

export { AssistantButton };
