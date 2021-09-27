// First word is consistent, it is the command
const fs = require("fs");


const inputParser = (message) => {
  let args = message.split(/ +/);
  let cmd = args.shift();
  let tempName = `${args[0]} ${args[1]}`;

  let moveRegex = new RegExp("^(" + tempName + ")\\b", 'i');

  const fileNames = fs.readdirSync("./src/Data/frameData").filter(file => file.endsWith(".json"));
  const charNames = fileNames.map(fileName => {
    return fileName.replace(".json", "")
  })

  charNames.forEach(charName => {
    let match = charName.match(moveRegex);
    if (match) {
      let firstArg = args.shift();
      let secondArg = args.shift();
      let nameArg = `${firstArg} ${secondArg}`
      args.splice(0,0, nameArg)
    }
  });  

  let inputName = args.shift();
  let inputMove = args.join(' ');

  let outputArgs = [cmd, inputName, inputMove];

  console.log(`Output arguments: ${outputArgs}`)
  return outputArgs;
}

module.exports = {inputParser};