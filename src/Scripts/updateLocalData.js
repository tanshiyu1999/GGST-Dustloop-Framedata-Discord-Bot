const puppeteer = require("puppeteer");
const fs = require("fs");


const ITEM_URL = "https://dustloop.com/wiki/index.php?title=GGST/Frame_Data"

const saveData = (charFrameData, characterName) => {
  const finished = (error) => {
    if (error) {
      console.error(error);
      return;
    }
  }
  const jsonData = JSON.stringify(charFrameData, null, 2);
  if (fs.existsSync('./src/Data//tempFrameData')) {
    fs.writeFile(`./src/Data//tempFrameData/${characterName}.json`, jsonData, finished);
  } else {
    fs.writeFile(`./src/Data//frameData/${characterName}.json`, jsonData, finished);  
  }
  
}

const tempFrameTransf = () => {
  fs.readdir('./src/Data//tempFrameData/',(err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        fs.copyFile(`./src/Data//tempFrameData/${file}`, `./src/Data//frameData/${file}`, (err) => {
          
        })
      })
    }
  })
  fs.rm('./src/Data//tempFrameData', { recursive: true }, (err) => {
  })
}

const updateLocalData = async() => {
  // create directory if it does not exist
  if (!fs.existsSync('./src/Data//frameData')) {
    fs.mkdir("./src/Data//frameData", (error) => {
      if (error) {
        return console.error(error)
      }
    })
    console.log("frameData diretory created \n")
  } else if (fs.existsSync('./src/Data//frameData')) {
    fs.mkdir("./src/Data//tempFrameData", (error) => {
      if (error) {
        return console.error(error)
      }
    })
    console.log("tempFrameData diretory created \n")
  }

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.goto(ITEM_URL);
  let links = await page.$$eval("#mw-content-text > div > div > P > a", elements => elements.map(name => name.href));

  for (let i = 0; i < links.length; i++) {
    await page.goto(links[i], {waitUntil:"networkidle2"});

    // Global variable to store temperary data
    let data = {};

    let columnLabel = ["input", "name", "damage", "guard", "startup", "active", "recovery", "onBlock", "onHit", "riscGain", "level", "invuln", "prorate"];    

    // Generate character name
    let characterName = await page.$eval("tbody tr .field_name", element => element.innerText);

    // Store frame data of normal move in object
    let unsortedNormalMoves = await page.$$eval("#DataTables_Table_0_wrapper table tbody tr td:not(.details-control)", elements => elements.map(name => name.innerText))
    let normalMovesRowData = await page.$$eval("#DataTables_Table_0_wrapper table thead tr .sorting", elements => elements.map(name => name.innerText))
    let normalMoves = [];
    for (let j = 0; j < unsortedNormalMoves.length; j++) {
      data[normalMovesRowData[j%normalMovesRowData.length]] = unsortedNormalMoves[j];
      if (j % normalMovesRowData.length + 1 == normalMovesRowData.length && j != 0) {
        // data["name"] = data["input"];
        normalMoves.push(data);
        data = {};
      }
    }
    
    // store frame data of special move in object
    let unsortedSpecialMoves = await page.$$eval("#DataTables_Table_1_wrapper table tbody tr td:not(.details-control)", elements => elements.map(name => name.innerText));
    let specialMovesRowData = await page.$$eval("#DataTables_Table_1_wrapper table thead tr .sorting", elements => elements.map(name => name.innerText))
    let specialMoves = [];
    for (let j = 0; j < unsortedSpecialMoves.length;j++) {
      data[specialMovesRowData[j%specialMovesRowData.length]] = unsortedSpecialMoves[j];
      if (j % specialMovesRowData.length + 1 == specialMovesRowData.length && j != 0) {        
        specialMoves.push(data);
        data = {};
      }
    }

    // store frame data of supers in object
    let unsortedSupers = await page.$$eval("#DataTables_Table_2_wrapper table tbody tr td:not(.details-control)", elements => elements.map(name => name.innerText));
    let supersRowData = await page.$$eval("#DataTables_Table_1_wrapper table thead tr .sorting", elements => elements.map(name => name.innerText))
    let specialSupers = [];
    for (let j = 0; j < unsortedSupers.length;j++) {
      data[supersRowData[j%supersRowData.length]] = unsortedSupers[j];
      if (j % supersRowData.length + 1 == supersRowData.length && j != 0) {        
        specialSupers.push(data);
        data = {};
      }
    }

    let charFrameData = [
      ...normalMoves,
      ...specialMoves,
      ...specialSupers
    ]

    saveData(charFrameData, characterName);

    console.log(`${characterName} complete`)

  }

  browser.close();

  if (fs.existsSync('./src/Data//tempFrameData')) {
    tempFrameTransf();
  }
  
}


module.exports = {updateLocalData, tempFrameTransf, saveData, ITEM_URL};



