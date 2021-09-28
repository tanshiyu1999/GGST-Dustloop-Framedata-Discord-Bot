// Input is a single object
const makeFields = (matchedMoves) => {
  // generate a list of objects, if the value of object == "", convert to " ".
  // console.log(matchedMoves)
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

const makeInputFields = (matchedMoves) => {
  let tempObj = {};
  let output = [];
  
  for (let i = 0; i < matchedMoves.length; i++) {
    if (matchedMoves[i]['name']) {
      tempObj.name = `${i + 1}: ${matchedMoves[i]['name']}`;
    } else {
      tempObj.name = matchedMoves[i]['input'];
    }
    tempObj.value = matchedMoves[i]['input'];
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};
  }
  return output;
}






module.exports = {makeFields, makeInputFields};
