// require Letter.js so can use Letter constructor
var Letter = require("./Letter");

// constructor function for checking letters guessed by user with randomly generated word
var Word = function(werd) {
	// store word as string
	var here = this;
	this.word = werd;
	// console.log(this.word);
	this.letterArray = [];
	this.wordGuessed = false;
	// take new letter and push into array representing underlying word
	this.pushToLetterArray = function() {
		for (var i = 0; i < this.word.length; i++) {
			var newLetter = new Letter(this.word[i]);
			this.letterArray.push(newLetter);
		}
	}
	// method here checks each letter in word to see if all letters have been guessed
	this.checkWordBeGuessed = function() {
		if(this.letterArray.every(function(lttr) {
			return lttr.guessed === true;
		})) {
			this.wordGuessed = true;
			return true;
		}
	}
	// methods takes user letter guess and checks against letters in word for match
	this.checkLetterBeGuessed = function(guessedLetter) {
		var whatToReturn = 0;
		//iterates through each letter to see if it matches the guessed letter
		this.letterArray.forEach(function(lttr){
	  		if(lttr.letter === guessedLetter){
	    		lttr.guessed = true;
	    		whatToReturn++;
	  		}
		})
		//if guessLetter matches Letter property, the letter object should be shown
		return whatToReturn;
	}
	// method displays the letters and underscores in console
	this.wordDisplay = function() {
		var display = '';
		//render the word based on if letters are found or not
		here.letterArray.forEach(function(lttr){
			var currentLetter = lttr.letterDisplay();
			display+= currentLetter;
		});
		return display;
	}
}

// exports this Word constructor function so can be used in index.js file
module.exports = Word;