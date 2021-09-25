
const test1 = () => {
  console.log("test1")
}

const test2 = () => {
  console.log("test2")
  test1()
}

module.exports = {test2}