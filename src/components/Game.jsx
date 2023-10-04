import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getActorsData } from "../mock-api/mock-api";
import { useContext } from "react";
import { LevelContext } from "../contex/Context";
import { updateMaxLevel } from "../storage/storage";
import Prompt from "./Prompt";
import "./game.css";
export default function Game() {
  /* const { level } = useParams(); */
  const [actorData, setActorData] = useState([]);
  const [unGuessedActors, setUnGuessedActors] = useState([]);
  const [GuessedActors, setGuessedActors] = useState([]);
  const location = useLocation();
  const { currentLevel, setCurrentLevel, maxLevel, setMaxLevel } =
    useContext(LevelContext);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState({ state: false, content: "" });

  const getEightRandom = () => {
    const randomUnGuessedActor =
      unGuessedActors[parseInt(Math.random() * (unGuessedActors.length - 1))];
    let randomIndex = parseInt(Math.random() * 7);
    console.log({ randomUnGuessedActor, randomIndex });
    return actorData
      .map((value, index) => {
        let oldRandomIndex = actorData.findIndex((actor) => {
          if (randomUnGuessedActor) {
            return actor.id === randomUnGuessedActor.id;
          } else {
            return false;
          }
        });
        console.log({
          index,
          randomIndex,
          oldRandomIndex,
          randomUnGuessedActor,
        });
        if (index === randomIndex) {
          if (oldRandomIndex < 8) {
            console.log("value1");
            return value;
          } else {
            console.log("random");
            return randomUnGuessedActor;
          }
        } else {
          console.log("value2");
          return value;
        }
      })
      .slice(0, 8);
  };
  const handleClick = (currentActor) => {
    console.log({ GuessedActors, unGuessedActors, actorData });
    let isGuessed = GuessedActors.some((actor) => actor.id === currentActor.id);
    if (isGuessed) {
      setShowPrompt({
        state: true,
        content: {
          result: false,
          score: GuessedActors.length,
          total: actorData.length,
        },
      });
    } else {
      console.log(GuessedActors.length + 1);
      if (GuessedActors.length + 1 === location.state.level * 8) {
        alert(currentActor.name);
        console.log(GuessedActors);
        setGuessedActors([]);
        alert("go to next level");
        if (currentLevel + 1 > maxLevel) {
          setMaxLevel(currentLevel + 1);
          updateMaxLevel(currentLevel + 1);
        }
        setCurrentLevel(currentLevel + 1);
        navigate(`/game/${parseInt(location.state.level) + 1}`, {
          state: { level: parseInt(location.state.level) + 1 },
        });
      } else {
        setGuessedActors([...GuessedActors, currentActor]);
        setUnGuessedActors(
          unGuessedActors.filter((actor) => actor.id !== currentActor.id)
        );
        setActorData((prevActorData) => {
          return prevActorData
            .map((actor) => {
              return { ...actor, key: parseInt(Math.random() * 15) };
            })
            .sort((a, b) => a.key - b.key);
        });
      }
    }
  };
  useEffect(() => {
    console.log("level changed");
    const getData = async () => {
      const data = await getActorsData(
        location.state.level * 8,
        Math.ceil((location.state.level * 8) / 16) || 1
      );
      setActorData(data);
      setUnGuessedActors(data);
    };
    getData();
  }, [location.state.level]);

  return (
    <>
      {showPrompt.state && (
        <Prompt
          result={showPrompt.content.result}
          score={showPrompt.content.score}
          total={showPrompt.content.total}
        />
      )}
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flib-card grid grid-cols-4 max-w-4xl gap-5">
          {getEightRandom().map((value) => (
            <div
              onClick={() => {
                handleClick(value);
              }}
              key={value.id}
              className="inner-card"
            >
              <div className="back">
                <p className="text-center">{value.name}</p>
              </div>
              <div className="front">
                <img src={value.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
