
const makeFields = (matchedMoves) => {
  // generate a list of objects, if the value of object == "", convert to " ".
  let keys = Object.keys(matchedMoves);

  let tempObj = {};
  let output = [];

  for (let i = 0; i < keys.length; i++) {
    if (matchedMoves[keys[i]] == "" || keys[i] == "name") {
      continue;
    } else {
      tempObj.value = matchedMoves[keys[i]];
    }
    tempObj.name = keys[i];
    tempObj.inline = true;
    output.push(tempObj);
    tempObj = {}
  }


  return output;

  
}

module.exports = {makeFields};
