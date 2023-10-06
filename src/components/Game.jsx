import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getActorsData } from "../mock-api/mock-api";
import { useContext } from "react";
import { LevelContext, PromptContext } from "../contex/Context";
import { updateMaxLevel } from "../storage/storage";
import Prompt from "./Prompt";
import "./game.css";
import bg from "/bg.jpg"
export default function Game() {
  /* const { level } = useParams(); */
  const [actorData, setActorData] = useState([]);
  const [unGuessedActors, setUnGuessedActors] = useState([]);
  const [GuessedActors, setGuessedActors] = useState([]);
  const location = useLocation();
  const { currentLevel, setCurrentLevel, maxLevel, setMaxLevel } =
    useContext(LevelContext);
  const {showPrompt, setShowPrompt} = useContext(PromptContext)
  const navigate = useNavigate();

  const getEightRandom = () => {
    const randomUnGuessedActor =
      unGuessedActors[parseInt(Math.random() * (unGuessedActors.length - 1))];
    let randomIndex = parseInt(Math.random() * 7);
/*     console.log({ randomUnGuessedActor, randomIndex }); */
    return actorData
      .map((value, index) => {
        let oldRandomIndex = actorData.findIndex((actor) => {
          if (randomUnGuessedActor) {
            return actor.id === randomUnGuessedActor.id;
          } else {
            return false;
          }
        });
       /*  console.log({
          index,
          randomIndex,
          oldRandomIndex,
          randomUnGuessedActor,
        }); */
        if (index === randomIndex) {
          if (oldRandomIndex < 8) {
/*             console.log("value1"); */
            return value;
          } else {
/*             console.log("random"); */
            return randomUnGuessedActor;
          }
        } else {
/*           console.log("value2"); */
          return value;
        }
      })
      .slice(0, 8);
  };
  const handleClick = (currentActor) => {
    console.log({ GuessedActors, unGuessedActors, actorData });
    let isGuessed = GuessedActors.some((actor) => actor.id === currentActor.id);
    if (isGuessed) {
      setGuessedActors([])
      setUnGuessedActors(actorData);
      setShowPrompt({
        state: true,
        content: {
          result: false,
          score: GuessedActors.length,
          total: actorData.length,
        },
      });
    } else {
      if (GuessedActors.length + 1 === location.state.level * 8) {
        if (currentLevel + 1 > maxLevel) {
          setMaxLevel(currentLevel + 1);
          updateMaxLevel(currentLevel + 1);
        }
        setGuessedActors([]);
        setShowPrompt({
          state: true,
          content: {
            result: true,
            score: GuessedActors.length+1,
            total: actorData.length,
          },
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
      setCurrentLevel(location.state.level)
      setActorData(data);
      setUnGuessedActors(data);
    };
    getData();
  }, [location.state.level]);
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundColor: "transparent",
    backgroundSize: "cover"
  }
  return (
    <>
      {showPrompt.state && (
        <Prompt
          result={showPrompt.content.result}
          score={showPrompt.content.score}
          total={showPrompt.content.total}
        />
      )}
      <div style={style} className="w-screen min-h-screen flex items-center justify-center pt-10 pb-10">
        <div className="flib-card grid grid-cols-3 md:grid-cols-4 max-w-4xl gap-5">
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
