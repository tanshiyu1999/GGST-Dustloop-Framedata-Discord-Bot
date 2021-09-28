const fs = require("fs");

const handleMove = (matched, charData, move) => {
  if (matched.length == 0) {
    console.log(`${move} cannot be found.`)
  } else if (matched.length > 1) {
    console.log("Multiple moves found");
    return matched;
  } else {
    console.log("Matched input: " + matched[0]['input']);
    return(matched);
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

  charData.forEach(singleMove => {
    if (singleMove['name']) {
      if (singleMove['name'].match(moveRegex) || singleMove['input'].match(moveRegex)) {
        matched.push(singleMove);
        console.log("Regex Match: ", matched[matched.length - 1]['input']);
      }
    } else {
      if (singleMove['input'].match(moveRegex)) {
        matched.push(singleMove);
        console.log("Regex Match: ", matched[matched.length - 1]['input']);
      }
    }
  })

  return handleMove(matched, charData, move);
}

const absoluteFind = (charData, move) => {
  let matched = [];
  let moveRegex = new RegExp("^(" + move + ")\\b", 'i');
  charData.forEach(singleMove => {
    if (singleMove['name']) {
      if (singleMove['name'].match(moveRegex) || singleMove['input'].match(moveRegex)) {
        matched.push(singleMove);
        console.log("Absolute Match: ", matched[matched.length - 1]['input']);
      }
    } else {
      if (singleMove['input'].match(moveRegex)) {
        matched.push(singleMove);
        console.log("Absolute Match: ", matched[matched.length - 1]['input']);
      }
    }
  })
  if (matched.length == 0) {
    return regexFind(charData, move);
  } else {
    return handleMove(matched, charData, move);
  }
}

const parseJSON = (charName, move) => {
  let charArray = require(`../Data/frameData/${charName}`);
  let charData = charArray;

  return absoluteFind(charData, move)
} 

const searchChar = (name, move) => {

  let regex = "\\b";
  for (let i = 0; i < name.length; i++) {
    regex = regex + name.substring(i , i + 1) + "[^ -']?"
  }

  const searchName = new RegExp(regex, 'i');

  const fileNames = fs.readdirSync("./src/Data/frameData").filter(file => file.endsWith(".json"));

  let matchedName = [];

  fileNames.forEach(element => {
    let match = element.match(searchName);
    if (match != null) {
      matchedName.push(match.input)
    }
  })  

  if (matchedName.length == 1) {
    let matchedMoves = parseJSON(matchedName[0], move)//[0]; // This is an object in an array
    
    return {
      name,
      matchedMoves
    }
  }
}

// command line instruction

module.exports = {searchChar};