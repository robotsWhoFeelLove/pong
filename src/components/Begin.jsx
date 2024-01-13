import { useEffect, useState } from "react";

function Begin({ setIsPlay, message, setMessage }) {
  const [isFlash, setIsFlash] = useState(true);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsFlash((prev) => !prev), 200;
  //     });
  //   }, []);
  function handlePlay() {
    setMessage("GET READY!");
    showMessage("3", 1000);
    showMessage("2", 2000);
    showMessage("1", 3000);
    showMessage("GO!!!", 4000);
    setTimeout(() => {
      setMessage();
      setIsPlay(true);
    }, 5000);
  }

  function showMessage(message, interval) {
    setTimeout(() => {
      setMessage(message);
    }, interval);
  }

  return (
    <>
      {message && (
        <div className="h-screen w-screen flex flex-col justify-center items-center text-[#b4d273]">
          <div className={"text-4xl text-[#b4d273] " + (isFlash && " text-[[#e5b567]")}>{message}</div>
          <div className="flex">
            {message === "!PONG" && (
              <button className="border-2 border-[#b4d273] p-1" onClick={handlePlay}>
                BEGIN
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// bg-[#121212] border-2 border-[#e5b567] font-source text-[#b4d273]

export default Begin;
