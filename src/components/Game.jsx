import Canvas from "./Canvas";

let rightPressed = false;
let leftPressed = false;

// function handleKeyDown(e) {
//   console.log({ e });
//   if (e.key === "Right" || e.key === "ArrowRight") {
//     rightPressed = true;
//     console.log({ rightPressed });
//   } else if (e.key === "Left" || e.key === "ArrowLeft") {
//     leftPressed = true;
//     console.log({ leftPressed });
//   }
// }

function Game() {
  return (
    <div className="flex w-screen h-screen bg-[#121212] p-2">
      <div className="w-1/5 bg-[#121212] border-2 border-[#e5b567] font-source text-[#b4d273]">`TIME: ${timer}`</div>
      <div className="w-4/5 border-2 border-[#e5b567] ">
        <Canvas></Canvas>
      </div>
      {/* <div className="w-24 bg-blue-400"></div> */}
    </div>
  );
}

export default Game;
//bg-[#121212]
