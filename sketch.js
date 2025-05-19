// MIP = Make It Pretty

// -> Setting up variables
let font1;
let userInput;
let button;
let userLines 
let response;
let poem = [];
let P0;

// -> Preloading the font 
function preload(){
  font1 = loadFont('Foglihtenno07calt-WpzEA.otf')
  P0 = loadImage('P0.png');
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // -> Add font 
  textFont(font1);
  textSize(25)
  // -> Input bar and button 
  userInput = createInput(); 
  userInput.position(80, 10); // - input bar position
  userInput.style('background','linear-gradient(to bottom, #F1DDB0, #D1A543') // - MIP
  userInput.style('border', '1px solid #927128'); // - MIP
  userInput.style('color', '#533D0D'); // - MIP
 

  button = createButton('Add to the poem'); // - button name
  button.position(userInput.x + userInput.width, userInput.y); // - button under bar
  button.style('background','linear-gradient(to bottom, #F1DDB0, #D1A543') // - MIP
  button.style('border', '1px solid #927128'); // - MIP
  button.style('color', '#533D0D'); // - MIP
  button.mousePressed(newLines); // - Run newLines when button is clicked
  userInput.changed(newLines); // -Run newLines with other user input 
  userInput.input(() => { 
    if (keyCode === 13) { // - If "enter" key is pressed
    newLines(); // - Run function 
  }
});
}


function newLines() {
  userLines = userInput.value();
  userInput.value('');
  poem.push(userLines); // Always push original line

  let words = RiTa.tokenize(userLines);
  let last = words.length - 1;
  let lastWord = words[last].replace(/[.,!?;:]+$/, '').toLowerCase();

  let rhymes = [];
  try {
    rhymes = RiTa.rhymesSync(lastWord);
  } catch (err) {
    console.error("Rhyme error for:", lastWord, err);
  }

  if (rhymes.length > 0) {
    let changedWord = random(rhymes);
    words[last] = changedWord;
  }

  let rhymedLine = RiTa.untokenize(words);
  poem.push(rhymedLine); // Always push second line

  // Third line: generated with verbs changed
  let lastWordSecondLine = rhymedLine.split(' ').pop();
  response = '';
  for (let x = 0; x < words.length - 1; x++) {
    if (RiTa.isVerb(words[x])) {
      response += RiTa.randomWord({ pos: "vbd" }) + ' ';
    } else {
      response += words[x] + ' ';
    }
  }
  response += lastWordSecondLine;
  poem.push(response); // Machine-generated line

  console.log("Poem lines:", poem.length, poem); // For debug
}

function writePoem(){ // setting up poem drawing
  for (x = 0; x < poem.length; x++){ // - Go through array
    text(poem[x], 50, 90 + x * 20) // - Poem array, 20 pixels under last line
  }
}

function draw() {
  background('#F2E6CA')
  image(P0, 20, 40, P0.width - 20, P0.height -20); // Image on background
  writePoem(); // - Draw poem on background

  // Draw instructions
  fill('#533D0D'); // Text color
  textSize(18); // Text size
  textAlign(LEFT, TOP); // Text alignment
  text("Welcome to our Poem Generator!", 520, 20); // Welcome message
  text("How to Use:", 520, 60); // How to use section
  text("1. Input: Type your line of poetry into the text bar located at the top.", 520, 90, 400); // Input instruction
  text("2. Generate: Click the 'Add to the poem' button or press Enter after typing your small line.", 520, 140, 400); // Generate instruction
  text("4. View: See your poem take shape below the input area.", 520, 285, 400); // View instruction
  textSize(14); // Text size
  text("2.1. The code will return your original sentence, one sentence with a different last word that rhymes with the first, and a third sentence with the verbs randomised.", 540, 210, 360); // View instruction

}
