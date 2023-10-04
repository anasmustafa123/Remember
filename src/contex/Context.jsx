import React from "react";
const LevelContext = React.createContext();
const LevelProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [maxLevel, setMaxLevel] = React.useState(1);
  return (
    <LevelContext.Provider
      value={{ setCurrentLevel, currentLevel, maxLevel, setMaxLevel }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export { LevelProvider, LevelContext };
