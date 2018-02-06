// * **index.js**: This file contains the logic for running the game, which depends on `Word.js` and 'wordList.js' files. It will randomly select a word and uses the `Word` constructor to store it. Prompts the user for each guess and keeps track of the user's remaining guesses. 

// wrap everything in function begin()
function begin(){
	//require inquirer
	var inquirer = require('inquirer');
	//require word constructor function and require WordList array
	var Word = require('./Word.js');
	var Game = require('./wordList.js');
	// var for storing hangman body parts
	var hangManDisplay = Game.newWord.hangman;
	// object containing functions for running game
	var hangman = {
		// property holds array of possible words/answers
		word_List: Game.newWord.wordList,
		// counter for user guesses
		guessesRemaining: 10,
		// array to hold letters guessed by user
		guessedLetters: [],
		//counter for index of array that determines which hangman body parts to display
		display: 0,
		// property for storing the current word
		currentWord: null,
		//start game method prompts user to play game
		startGame: function() {
	    	var here = this;
	    	//clears guessedLetters before a new game starts
	    	if(this.guessedLetters.length > 0){
	      		this.guessedLetters = [];
	    	}
	    	// prompts user to play game using inquirer package
	    	inquirer.prompt([{
	      		name: "play",
	      		type: "confirm",
	      		message: "Hey you...yes you...wanna play Hangman?"
	    	}]).then(function(answer) {
	    		// if select yes, then call newGame() function
	      		if(answer.play){
	        	here.newGame();
	      		} else{
	        	console.log("Like you have something better to do");
	      		}
	    	})},
	  	// function starts new game
	  	newGame: function() {
	  		// if guess counter is 10 then pull new word from array using Word constructor
	    	if(this.guessesRemaining === 10) {
	      		console.log('\n');
	      		console.log("Good, I was getting bored. We are dealing with 90 Hip Hop artists:");
	      		console.log('\n----------------------------------------------');
	      		console.log('\n');
	      		//generates random number based on the word_List
	      		var randNum = Math.floor(Math.random()*this.word_List.length);
	      		this.currentWord = new Word(this.word_List[randNum]);
	      		this.currentWord.pushToLetterArray();
	      		//displays current word as blanks.
	      		console.log(this.currentWord.wordDisplay());
	      		this.keepPromptingUser();
	      	// else call function to reset # guesses and re-call newGame function
	    	} else{
	      		this.resetGuessesRemaining();
	      		this.newGame();
	    	}
	  	},
	  	// function resets user guess counter to 10
	  	resetGuessesRemaining: function() {
	    	this.guessesRemaining = 10;
	  	},
	  	// function prompts user to guess letter and takes in input
	  	keepPromptingUser : function(){
	    	var here = this;
	    	//prompts player to guess a letter using inquirer package
	    	inquirer.prompt([{
	      		name: "chosenLtr",
	      		type: "input",
	      		message: "Choose a letter:"
	    	}]).then(function(ltr) {
	      		// apply toUpperCase to ltr callback because words in wordList are all caps
	      		var letterReturned = (ltr.chosenLtr).toUpperCase();
	      		//adds to the guessedLetters array if it isn't already there
	      		var guessedAlready = false;
	        	for(var i = 0; i<here.guessedLetters.length; i++){
	          		if(letterReturned === here.guessedLetters[i]){
	            		guessedAlready = true;
	          		}
	        	}
	        	//if letter hasn't been guessed, then run through whole function  
	        	// else re-prompt user
	        	if(guessedAlready === false){
	          		here.guessedLetters.push(letterReturned);
	          		// var to store letter if it is a match in current word - (calls method checkLetterBeGuessed in Word.js file and passes user selected letter)
	          		var found = here.currentWord.checkLetterBeGuessed(letterReturned);
	          		//if checkLetterBeGuessed(letterReturned) resolves to false then user wrong
	          		if(found === 0){
	          			// decrement guesses remaining and increment display counter for hangman
	            		here.guessesRemaining--;
	            		here.display++;
	            		// displays appropriate hangman body parts depending on display counter
	            		console.log("NoPE, sorry - there aren't any " + letterReturned + "'s in this word. Keep Going.");
	            		console.log('\n---------------------');
	            		console.log('\n');
	            		console.log(here.currentWord.wordDisplay());
	            		console.log('\n---------------------');
	            		console.log('Remaining guesses: ' + here.guessesRemaining);
	            		console.log("Already guessed: " + here.guessedLetters);
	          		} else{
	          			console.log('\n---------------------');
	            		console.log("Yes! There's at least one " + letterReturned + " in the artists name!");
	          			console.log('\n');
	              		//checks to see if user won
	              		if(here.currentWord.checkWordBeGuessed() === true){
	              			// if so, log the word by calling function
	                		console.log(here.currentWord.wordDisplay());
	                		console.log("************************************************")
	                		console.log("Congratulations! You really know your 90s Hip Hop ");
	 			    		console.log('\n************************************************');
	              		} else{
	              			// display word (and _ as currently guessed)
	                		console.log(here.currentWord.wordDisplay());
	                		console.log('\n---------------------');
	                		// display number guesses remaining
	                		console.log('Remaining guesses: ' + here.guessesRemaining);
	                		// display letters guessed by user
	                		console.log("Already guessed: " + here.guessedLetters);
	              		}
	          		}
	          		if(here.guessesRemaining > 0 && here.currentWord.wordGuessed === false) {
	            		here.keepPromptingUser();

	          		}else if(here.guessesRemaining === 0){
	          			console.log("************************************************");
	            		console.log('Game over! Someone had a sheltered childhood.');
	            		console.log('The correct answer was: ' + here.currentWord.word);
	          			console.log("************************************************");
	          		}
	        	// otherwise reprompt user if letter was already guessed
	        	} else{
	            	console.log("You've already guessed this letter. Hurry up and pick another letter!");
	            	here.keepPromptingUser();
	          	}
	    	});  // close .then function from inquirer response
	  	} // close keepPromptingUser function
	} // close hangman object

	// calls startGame method in hangman object
	hangman.startGame();

}; // close function begin()

// call begin function when file loads
begin();