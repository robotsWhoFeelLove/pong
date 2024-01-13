import { useEffect, useState } from "react";
import { useRef } from "react";
import Begin from "./Begin";
let paddleY = 20;
let enemyY = 20;
let int = 0;
let reset = false;
function Canvas() {
  const [canvasHeight, setCanvasHeight] = useState();
  const [enemySpeed, setEnemySpeed] = useState(3);
  const [ballSpeed, setBallSpeed] = useState(2);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [message, setMessage] = useState("!PONG");
  const canvasRef = useRef(null);

  function handleReset() {
    reset = true;
    console.log("reset");
    setCanvasHeight();
    setEnemySpeed(2.5);
    setBallSpeed(2);
    setTimer(0);
    setScore(0);
    setIsPlay(false);
    setMessage("!PONG");
    // const canvasRef = useRef(null);
    reset = false;
  }

  function setupGame() {
    const canvas = canvasRef.current;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const canvasH = canvas.getBoundingClientRect().height;

    setCanvasHeight(canvasH);

    // ...then set the internal size to match
    paddleY = (canvas.height - 75) / 2;
    // console.log(canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");

    if (isPlay) startGame(ctx, canvas);
  }

  useEffect(() => {
    setupGame();
  }, [isPlay]);
  // ctx.fillStyle = "#000000";
  // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // drawBall();

  function startGame(ctx, canvas) {
    const paddleHeight = 75;
    const paddleWidth = 10;

    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = ballSpeed;
    let dy = -ballSpeed;
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#e5b567";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(canvas.width - paddleWidth - 10, paddleY, paddleWidth, paddleHeight);
      ctx.fillStyle = "#b4d273";
      ctx.fill();
      ctx.closePath();
      // console.log({ paddleY });
    }

    function drawEnemyPaddle() {
      ctx.beginPath();
      ctx.rect(10, enemyY, paddleWidth, paddleHeight);
      ctx.fillStyle = "#b4d273";
      ctx.fill();
      ctx.closePath();
      // console.log({ paddleY });
    }

    function draw() {
      if (reset) {
        clearInterval(interval);
        return;
      }
      if (isPlay === false) return;
      let lastDx = dx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawEnemyPaddle();
      if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
      }

      if (x + dx < ballRadius + 10) {
        // setScore((prev) => prev + 1);
        dx = -dx;
      }

      if (x + dx > canvas.width - ballRadius - 10) {
        if (y + dy > paddleY - paddleHeight * 0.5 && y + dy < paddleY + paddleHeight) {
          // console.log({ y, paddleY });
          setScore((prev) => prev + 1);
          dx = -dx;
        } else {
          setMessage("GAME OVER");
          // document.location.reload();
          clearInterval(interval);
        }
      }
      x += dx;
      y += dy;
      if (enemyY < y + dy && dx < 0) {
        enemyY = enemyY + 1.7;
      }
      if (enemyY > y + dy && dx < 0) {
        enemyY = enemyY - enemySpeed;
      }
      // if (lastDx !== dx) ;
      int += 10;

      if (int % 1000 === 0) {
        setTimer(int / 1000);
      }
    }

    draw();
    const interval = setInterval(draw, 10);
  }
  let touchBegin;
  function handleTouch(e) {
    let temp = e.changedTouches[0].pageY - 37.5;

    if (temp > 0 && temp < canvasHeight - 75) {
      paddleY = temp;
    }
  }

  // function handlePause() {
  //   // console.log("Pause");
  //   console.log({ isPlay });
  //   setIsPlay(false);
  // }

  return (
    <div tabIndex={0} className="flex w-screen h-screen bg-[#121212] p-2 z-50">
      {timer >= 0 && (
        <div className="w-1/5 bg-[#121212] border-2 border-[#e5b567] font-source text-[#b4d273] z-50">
          <div>{`SCORE: ${score}`}</div>
          <div>{`TIME: ${timer}`}</div>
          {message === "GAME OVER" && (
            <button className="z-50 border-2 border-[#b4d273] p-1" onClick={handleReset}>
              RESET
            </button>
          )}
          {/* <button onClick={handlePause}>PAUSE</button> */}
        </div>
      )}
      <div className="w-4/5 border-2 border-[#e5b567] ">
        <canvas
          ref={canvasRef}
          // onTouchStart={(e) => handleTouch(e)}
          // onClick={(e) => handleTouch(e)}
          onTouchMove={(e) => handleTouch(e)}
          // onTouchEnd={(e) => handleTouch(e)}
        />
      </div>
      {message && (
        <div className="absolute ">
          <Begin setIsPlay={setIsPlay} message={message} setMessage={setMessage} />
        </div>
      )}
    </div>
  );
}
export default Canvas;
