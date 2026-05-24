const randomStringGenerator  = (length=100) => {
  const chars = "0987654321abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"  // ""
  const len = chars.length      // "".length => 62
  
  let random = "";            // random = ""
  for(let i = 0; i < length; i++) {     // i = 0 - 99
    // random chars pick 
    const posn = Math.ceil(Math.random() * (len-1))   // posn = Math.ceil(0-1 * 61) => 0
    random += chars[posn];                            // random = random + chars[0] => random = "a0"
  }
  return random;
}

module.exports = {
  randomStringGenerator
}