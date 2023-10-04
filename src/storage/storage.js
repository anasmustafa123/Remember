const updateMaxLevel = (newLevel) => {
  localStorage.setItem("maxLevel", newLevel);
};

const getMaxLevel = () => {
  let result;
  try {
    result = parseInt(localStorage.getItem("maxLevel"));
  } catch (error) {
    console.log(error + " in performing getMaxLevel");
  }
  return result ? result : 1;
};
export { updateMaxLevel, getMaxLevel };
