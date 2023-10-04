import React from "react";
import { Link } from "react-router-dom";
import { LevelContext } from "../contex/Context";
import { useContext } from "react";
export default function Prompt(props) {
  const { currentLevel } = useContext(LevelContext);
  return (
    <div className="w-screen h-screen flex justify-center items-center pointer-events-none">
      <div
        className={
          (props.result
            ? "border-green-400 bg-green-100 "
            : "border-red-400 bg-red-100 ") +
          "flex flex-col items-center border-8 rounded-tr-2xl rounded-bl-2xl p-4 gap-7 w-[35rem]"
        }
      >
        {props.result ? (
          <h1 className="text-5xl text-center">
            Level
            <br />
            Complete!
          </h1>
        ) : (
          <h1 className="text-5xl">Game Over!</h1>
        )}
        <h2 className="text-3xl text-center">{`${props.score} / ${props.total}`}</h2>
        <div className="flex gap-10 items-center justify-around text-4xl w-full">
          {props.result && currentLevel <= 12 (
            <Link
              to={{
                pathname: `/game/${currentLevel + 1}`,
                state: { level: currentLevel + 1 },
              }}
              className={
                (props.result
                  ? "hover:text-green-400 hover:border-green-400 "
                  : "hover:text-red-400 hover:border-red-400 ") +
                "border-2 rounded border-black cursor-pointer"
              }
            >
              <i class="bx bx-skip-next"></i>
            </Link>
          )}

          <Link
            to={`/level`}
            className={
              (props.result
                ? "hover:text-green-400 hover:border-green-400 "
                : "hover:text-red-400 hover:border-red-400 ") +
              "border-2 rounded border-black cursor-pointer"
            }
          >
            <i class="bx bx-home"></i>
          </Link>

          <Link
            to={{
              pathname: `/game/${currentLevel}`,
              state: { level: currentLevel },
            }}
            className={
              (props.result
                ? "hover:text-green-400 hover:border-green-400 "
                : "hover:text-red-400 hover:border-red-400 ") +
              "border-2 rounded border-black cursor-pointer"
            }
          >
            <i class="bx bx-redo"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
