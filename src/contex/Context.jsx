import React from "react";
const LevelContext = React.createContext();
const PromptContext = React.createContext();
const LevelProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [maxLevel, setMaxLevel] = React.useState(1);
  return (
    <>
      <LevelContext.Provider
        value={{ setCurrentLevel, currentLevel, maxLevel, setMaxLevel }}
      >
        {children}
      </LevelContext.Provider>
    </>
  );
};
const PromptProvider = ({ children }) => {
  const [showPrompt, setShowPrompt] = React.useState({
    state: false,
    content: "",
  });
  return (
    <>
      <PromptContext.Provider value={{ showPrompt, setShowPrompt }}>
        {children}
      </PromptContext.Provider>
    </>
  );
};

export { LevelProvider, LevelContext, PromptContext, PromptProvider };
