"use client";
import React from "react";

export default function Home() {
  const RESET = 10;
  const TIMEOUT_FIFTEEN = 900000;
  const TIMEOUT_THIRTY = 1800000;
  const TIMEOUT_FORTY_FIVE = 2700000;
  const TIMEOUT_SIXTY = 3600000;
  const [timeout, setTimeout] = React.useState<number>(TIMEOUT_FIFTEEN);
  const [timeSinceLasthandleKeyDown, settimeSinceLasthandleKeyDown] =
    React.useState(0);
  const [uninterruptedWriting, setUninteruptedWriting] = React.useState(0);
  const [text, setText] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const timer = React.useRef<NodeJS.Timeout>();
  const uninteruptedTimer = React.useRef<NodeJS.Timeout>();

  const computeBlur = () => {
    switch (timeSinceLasthandleKeyDown) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return "blur-[0px]";
      case 6:
        return "blur-[1px]";
      case 7:
        return "blur-[2px]";
      case 8:
        return "blur-[3px]";
      case 9:
        return "blur-[4px]";
      case 10:
        return "blur-[5px]";
    }
  };

  const handleKeyDown = (type: string) => {
    setText(type);
    settimeSinceLasthandleKeyDown(0);
    if (uninterruptedWriting > timeout) {
      // We're done
      return;
    }

    clearInterval(timer.current);

    timer.current = setInterval(() => {
      console.log("reset tick..");
      settimeSinceLasthandleKeyDown((prev) => prev + 1);
    }, 1000);

    if (!uninteruptedTimer.current) {
      uninteruptedTimer.current = setInterval(() => {
        console.log("uninterupted tick..");
        setUninteruptedWriting((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleTimeoutChange = (timeout: number) => {
    setText("");
    clearInterval(timer.current);
    settimeSinceLasthandleKeyDown(0);
    clearInterval(uninteruptedTimer.current);
    uninteruptedTimer.current = undefined;
    setUninteruptedWriting(0);
    setTimeout(timeout);
    setSuccess("");
  };

  React.useEffect(() => {
    if (timeSinceLasthandleKeyDown > RESET) {
      setText("");
      clearInterval(timer.current);
      settimeSinceLasthandleKeyDown(0);
      clearInterval(uninteruptedTimer.current);
      uninteruptedTimer.current = undefined;
      setUninteruptedWriting(0);
    } else if (uninterruptedWriting > timeout) {
      clearInterval(timer.current);
      clearInterval(uninteruptedTimer.current);
      setSuccess("You freaking did it buddy!!!!!!!1");
    }
  }, [timeSinceLasthandleKeyDown]);

  React.useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-900">
      <h1 className="text-lime-500">
        Zach is super awesome, Happy 30th Bday Zach!!!!11
      </h1>
      <div className="relative flex">
        <button
          onClick={() => handleTimeoutChange(TIMEOUT_FIFTEEN)}
          className={` flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit  lg:w-auto  lg:rounded-xl lg:border  lg:p-4  ${
            timeout == TIMEOUT_FIFTEEN
              ? "bg-rose-500 "
              : "bg-zinc-200 dark:bg-zinc-800/30"
          }`}
        >
          15 mins
        </button>
        <button
          onClick={() => handleTimeoutChange(TIMEOUT_THIRTY)}
          className={` flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit  lg:w-auto  lg:rounded-xl lg:border  lg:p-4  ${
            timeout == TIMEOUT_THIRTY
              ? "bg-rose-500 "
              : "bg-zinc-200 dark:bg-zinc-800/30 "
          }`}
        >
          30 mins
        </button>
        <button
          onClick={() => handleTimeoutChange(TIMEOUT_FORTY_FIVE)}
          className={` flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit  lg:w-auto  lg:rounded-xl lg:border  lg:p-4  ${
            timeout == TIMEOUT_FORTY_FIVE
              ? "bg-rose-500 "
              : "bg-zinc-200 dark:bg-zinc-800/30"
          }`}
        >
          45 mins
        </button>
        <button
          onClick={() => handleTimeoutChange(TIMEOUT_SIXTY)}
          className={` flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800  dark:from-inherit  lg:w-auto  lg:rounded-xl lg:border  lg:p-4  ${
            timeout == TIMEOUT_SIXTY
              ? "bg-rose-500 "
              : "bg-zinc-200 dark:bg-zinc-800/30 "
          }`}
        >
          60 mins
        </button>
      </div>
      <div className="relative flex place-items-center ">
        <div>{success}</div>
      </div>

      <div className="relative ">
        {/* TODO move out */}
        <textarea
          autoFocus={true}
          className={`text-black w-[612px] h-[791px] p-[12px] ${computeBlur()}`}
          onChange={(val) => handleKeyDown(val.currentTarget.value)}
          value={text}
          placeholder="...."
        ></textarea>
        <div>time since last timeout = {timeSinceLasthandleKeyDown}</div>
        <div>
          uninterrupted time so far = {uninterruptedWriting} seconds / {timeout}{" "}
          seconds.
        </div>
        <div>
          Pressing the timer buttons at the top will reset all your text. Be
          careful!
        </div>
        <div> LOVE YOU XOXOXOXO</div>
      </div>
    </main>
  );
}
