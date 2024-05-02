# **WorkShop_6**

**Link = https://nech691.github.io/WorkShop_6/**

# Tasks 
	
- Create an interactive nonsense poem generator using the rita.js library.
- Use at least three different functions from the rita.js library to process the user's input.
	

## Project 
- **Goal:** Poem generator that takes user's inputs, tokenizes them, finds verbs, changes verbs, and adds a new line with a random new verb and a rhyme at the end, drawing the original line and the new response line on the canvas as two different lines
	
- **Poem Maker:**
  - Tokenize
  - Verb
  - Rhyme at the end = Random word 
		
1. Included the RiTa file inside the index.html file by adding `<script src="https://unpkg.com/rita"></script>` under the other libraries  
2. Added an .otf file into the project folder (this is the font that will be used for the whole sketch) 
3. Changed the canvas size to fit the user's window and set the variables, arrays, and strings needed for this project
4. Created an input bar and button inside the set-up function and added a .mousePressed to the button (linking it to a newLines function)
5. Created a skateboard version of the project:
   - Added a newLines function and a writePoem function to add the poem array to canvas by just adding the user's input to the canvas, one line under the previous line
   - Added the writePoem function to the draw function
6. Built on the skateboard model and added to it
7. Added the font to the setup function
8. Modified the newLines function to:
   - Print the original inputted text 
   - Tokenize the user's input 
   - Change the last word to a random rhyming word 
9. Modified it again to find if there are verbs that are not the last word [as that has to rhyme]:
   - If so, substitute it by a new random verb and add that as a response
10. Made it pretty and added instructions 

### Issues 	Solutions 
- Didn't know how to generate random verbs instead of nouns	- Chat GPT helped me find that I could use "vb" instead of "nn" to achieve this
- Last word of third line doesn't rhyme with last inputted word	- Modify newLines function with the help of Chat GPT


## Workshop Notes
	
### Working with text and language 
	
- **How to add a font:**
  1. Make a variable for your font 
  2. Load your font (.otf) with the function preload 
     i.e., `font1 = loadFont('Foglihtenno07calt-WpzEA.otf')`
  3. Set this font as the one to be used in the sketch 
     - You can do this inside the setup function to set it for everything in the sketch or somewhere else
     - i.e., `textFont(font1)`
     - Then, you can test this process, by adding a text (string) to the canvas using
        - `text('your text here', x, y)`
        - Or by setting up a variable for your string
        - `text('variable name', x, y)`
				
- **Recapping user input bar + button:**
  - Remember, to add and input bar and button we:
    1. Set up variables for the input bar and button 
    2. Initialise the variables inside the function setup 
       - I.e., `createInput();`
    3. Use the "." operator to change the position of these elements
    4. Use the "." operator by using a `mousePressed(name of your function)` to give functionality to the button
    5. Then, we set up that function we just used for .mousePressed going over the list of the words array (i.e., poem.lenght), adding it to canvas according to the index position (`text(poem[x], 40, 180 + x * 20)`), and calling the function in draw
  - This is the skateboard version of the poem generator 

### Using the RiTa toolkit 
	
- This is an additional library that we can use by adding `<script src="https://unpkg.com/rita"></script>` to the "index.html" file of your project under the other pre-existing libraries.
		
- **To use RiTa in your code to alter user input:**
  1. In your .mousePressed function, add `let word = RiTa.tokenize(userLine)` to store the user's input as an array
     - This will analyze each word in the inputted string/text and store it in the "words" array 
     - *NOTE THAT "tokenize" IS WITH A "Z" IN THIS CASE*
  2. Then you can use another local variable to select a random word from that array (`let r = floor(random(0, words.length))`)
  3. Then we can use RiTa to add another word that rhymes with the random word selected
     - i.e., `let rhymes = RiTa.ryhmesSync(words[r]);`
     - `let changedWord = random(rhymes);`
  - You can then replace one of that random selected word with a random rhyme 
     - i.e., `words[r] = changedWord`
     - Then you can return the array back to string form and push it into the poem:
       - i.e., `userLine = RiTa.untokenize(words);`
          `poem.push(userLine);`
- **Issues**:
  - If RiTa can't find any rhymes for the randomly selected word, it does nothing 
  - To fix this, we add some conditionals:
    1. Add an if loop where if the length of the rhymes found array is equal to exactly 0, simply push the user's input into the poem
       - Add this after the line where RiTa creates the rhymes array
    2. Then, add an else condition with the remaining of the .mousePressed function 
       - i.e. `let changedWord = random(rhymes);`    
          `words[r] = changedWord;` 
          `userLine = RiTa.untokenize(words);`    
          `poem.push(userLine);`
- **Another approach to using RiTa is using creating machine-generated text:**
  - The command `RiTa.isNoun()` checks for nouns in the given array or string  
  1. To add a second line of machine-generated text along with the user's inputted words, we must do a loop and a conditional statement as follows 
  2. First, initialize the response variable 
     - E.g., `response = ' ' `
  3. Then, add a for loop to go through the "words" array 
  4. Inside that loop, create an if statement to check for nouns and, if so, add

