/// Letter.js determines whether users guess is correct and what should be displayed (letter or underscore)


// CONSTRUCTOR FUNCTION
var Letter = function(ltr) {
	// property to store the letter
	this.letter = ltr;
	// property/boolean if the letter can be shown
	this.guessed = false;
	// function (method)
	this.letterDisplay = function() {
	    if(this.letter == ' '){ 
	      //makes sure that when the function checks if the word is found doesn't read the blank as false.
	      this.guessed = true;
	      return '  ';
	    // if it isn't guessed, it returns a ' _ '
	    }if(this.guessed === false){ 
	      return ' _ ';
	    // otherwise just displays letter 
	    } else{ 
	      return this.letter;
	    }
    }; // close letterDisplay() method
}; // close Letter function()

// export to use in word.js
module.exports = Letter;