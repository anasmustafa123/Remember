import { useNavigate } from "react-router-dom";
import { LevelContext } from "../contex/Context";
import { useContext, useEffect } from "react";
import { getMaxLevel } from "../storage/storage";
import bgImg from "/levels-bg.jpg";
export default function Level() {
  const navigate = useNavigate();
  const { maxLevel, setMaxLevel, setCurrentLevel } = useContext(LevelContext);
  useEffect(() => {
    setMaxLevel(getMaxLevel());
  }, []);
  const bgStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundColor: "transparent",
    backgroundSize: "cover"
  }
  return (
    <div style={bgStyle}  className="w-screen  min-h-screen overflow-scroll flex items-center justify-center text-white p-10">
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3  max-w-4xl gap-5">
        {[...Array(12)].map((value, index) => (
          <div
            key={index}
            onClick={() => {
              if (maxLevel > index + 1) {
                alert(`you want to play level ${index + 1} again?`);
                setCurrentLevel(index + 1);
                navigate(`/game/${index + 1}`, { state: { level: index + 1 } });
              } else if (maxLevel == index + 1) {
                setCurrentLevel(index + 1);
                navigate(`/game/${index + 1}`, { state: { level: index + 1 } });
              }
            }}
            className={
              "flex flex-col items-center gap-3 border-black border-2 p-5  rounded-3xl border-white " +
              (index + 1 <= maxLevel ? "cursor-pointer" : "cursor-not-allowed")
            }
          >
            <div className=" text-9xl">
              {index + 1 <= maxLevel ? (
                index + 1
              ) : (
                <i class="bx bx-lock-alt"></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
