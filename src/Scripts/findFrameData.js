const fs = require("fs");

// const name = "sol";

// // multiple spaces will be reduced to single space
// // space at the front will be reduced to 0 space
// // add \\ in front of '[' and ']'
// const move = "j.236K";

const handleMove = (matched, charData) => {
  if (matched.length == 0) {
    console.log(`${move} cannot be found.`)
  } else if (matched.length > 1) {
    console.log("Multiple moves found");
  } else {
    console.log(charData[matched]);
    return(charData[matched]);
  }
}
 
const regexFind = (charData, move) => {

  let matched = [];

  // optional space for everything
  // optional charge brackets.
  // will only match with the front with a letter. (Will not match with beginning space)
  let regex = `^[ \\[\\]\\.]?[${move[0]}][ \\[\\]\\.]?`; // this works with negative edge
  for (let i = 1; i < move.length; i++) {
    if (i == 1) {
      regex = regex + "[ \\[\\]\\.]?";
    }
    if (move[i] == ' ' || move[i] == '.') {
      continue;
    }
    regex = regex + move.substring(i , i + 1) + "[ \\[\\]\\.]?";
  }
  let moveRegex = new RegExp(regex, 'i');
  
  let moveNames = Object.keys(charData);

  moveNames.forEach(moveName => {
    if (moveName.match(moveRegex)) {
      matched.push(moveName, charData)
    }
  })
  console.log("Regex Match: ", matched)
  return handleMove(matched);
}

const absoluteFind = (charData, move) => {
  let matched = [];
  let moveNames = Object.keys(charData);
  let moveRegex = new RegExp("^(?:" + move + ")$", 'i');
  moveNames.forEach(moveName => {
    if (moveName.match(moveRegex)) {
      matched.push(moveName)
      console.log("Absolute Match: ", matched)
    }
  })
  if (matched.length == 0) {
    return regexFind(charData, move);
  } else {
    return handleMove(matched, charData);
  }
}

const parseJSON = (charName, move) => {
  let charData = require(`../Data/frameData/${charName}`);
  return absoluteFind(charData, move)
} 

const searchChar = (name, move) => {

  let regex = "\\b";
  for (let i = 0; i < name.length; i++) {
    regex = regex + name.substring(i , i + 1) + "[^ -']?"
  }

  const searchName = new RegExp(regex, 'i');

  const fileNames = fs.readdirSync("./src/Data/frameData").filter(file => file.endsWith(".json"));

  let matched = [];

  fileNames.forEach(element => {
    let match = element.match(searchName);
    if (match != null) {
      matched.push(match.input)
    }
  })
  

  if (matched.length == 1) {
    let matchedMoves = parseJSON(matched[0], move);
    
    return {
      name,
      matchedMoves
    }
  }
}

// command line instruction

module.exports = {searchChar};