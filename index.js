// * **index.js**: This file contains the logic for running the game, which depends on `Word.js` and 'wordList.js' files. It will randomly select a word and uses the `Word` constructor to store it. Prompts the user for each guess and keeps track of the user's remaining guesses. 

// wrap everything in function begin()
function begin(){
	
	var Game = require('./wordList.js');
	// var for storing hangman body parts
	
	var hangman = {
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
	      		message: "Hangman?"
	    	}]).then(function(answer) {
	    		// if select yes, then call newGame() function
	      		if(answer.play){
	        	newGame();
	      		} else{
	        	console.log("Like you have something better to do");
	      		}
	    	})},
	  	// function starts new game
	  	newGame: function() {
	  		// if guess counter is 10 then pull new word from array using Word constructor
	    	if(this.guessesRemaining === 10) {
	      		;
	      		//displays current word as blanks.
	      		console.log(this.currentWord.wordDisplay());
	      		this.keepPromptingUser();
	      	// else call function to reset # guesses and re-call newGame function
	    	} else{
	      		this.resetGuessesRemaining();
	      		this.newGame();
	    
	        	

// call begin function when file loads
begin();
