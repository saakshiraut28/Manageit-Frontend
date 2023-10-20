/* eslint-disable @typescript-eslint/no-unused-vars */
import { AlertColor } from "@mui/material";
import { useRecoilState } from 'recoil';
import { alertAtom , loadingAtom } from "../atom/global"

const Demo = () => {
  const [ShowAlert, setShowAlert] = useRecoilState(alertAtom) ;
  const [loading, setloading] = useRecoilState(loadingAtom) ;

  function handleAlert(e) {
    e.preventDefault();
    const text = e.target.text.value as string;
    const eventType = e.target.eventType.value as AlertColor ;
    if (!text){ alert("Text toh dalo"); return;}
    if (!eventType){ alert("eventType toh dalo"); return;}
    // Main game
    setShowAlert({text, eventType, open: true}) ;
  }

  function handleLoad(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault() ;
    setloading({open: true}) ;
    setTimeout(() => {
      setloading({open: false}) ;
    }, 3000);
  }

  function handleLoad2(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, text) {
    e.preventDefault() ;
    setloading({open: true, text: text}) ;
    setTimeout(() => {
      setloading({open: false, text: ''}) ;
    }, 3000);
  }

  return (
    <div className='h-full w-full bg-red-100 p-4 flex flex-col'>
      <h1 className="text-2xl font-bold mb-4 text-red-600">* To Show an alert </h1>
      <p><b>1. Include Files</b></p>
      <p>{`import { useRecoilState } from 'recoil';`}</p>
      <p>{`import { alertAtom , loadingAtom } from "../atom/global";`}</p>

      <p className="mt-4"><b>2. Set</b></p>
      <p>{`const [alertState, setalertState] = useRecoilState(alertAtom) ;`}</p>

      <p className="mt-4"><b>2. Call</b></p>
      <p>Just call <b>{`setShowAlert({open: true, text: "Your text", eventType: "success"})`}</b> </p>


      <p className="my-2 text-green-700">* eventType Options: <b>success, error, info, warning</b></p>
      <p className="my-2">Try:</p>
      <form onSubmit={handleAlert} className="flex flex-row flex-wrap">
        <p>{`setalertState({ text: "`}</p>
        <input type="text" name="text" className="w-28" />
        <p>{`" , eventType: "`}</p>
        <input type="text" name="eventType" className="w-28" />
        <p>{`", open: true })`}</p>
        <button className="px-2 py-1 ml-5 bg-blue-500 rounded-md text-white" type="submit">Try</button>
      </form>


      <h1 className="mt-10 text-2xl font-bold text-red-600">Start a loading screen</h1>
      <p className="my-2"><b>1. Setup file</b></p>
      <p>{`const [loading, setloading] = useRecoilState(loadingAtom) ;`}</p>

      <p><b>Call</b></p>
      <p>Without text <b>{`-> setloading({open: true}) ;`}</b></p>
      <div>
        <button className="py-1 px-2 bg-blue-500 text-white" onClick={handleLoad}>Loading Screen for 3 sec</button>
      </div>

      <p className="mt-4">With text <b>{`-> setloading({open: true, text: Some text}) ;`}</b></p>
      <div>
        <button className="py-1 px-2 bg-blue-500 text-white" onClick={(e) => handleLoad2(e,"Dherya rakhiye")}>Loading Screen with text</button>
      </div>
      <p>dont forget to clean text on loadout</p>

    </div>
  )
}

export default Demo