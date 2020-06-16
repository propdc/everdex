function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Which of the following Pokemon is not in generation 1?", ["Dracovish", "Ditto","Cloyster", "Dodrio"], "Dracovish"),
    new Question("Which Pokemon evolves into Toxtricity?", ["Koffing", "Toxicroak", "Toxel", "Toxapex"], "Toxel"),
    new Question("What is the mascot of Pokemon Red?", ["Charizard", "Moltres","Magmortar", "Magikarp"], "Charizard"),
    new Question("In Pokemon Emerald, Which legendary Pokemon appears the end of the game?", ["Kyogre", "Rayquaza", "Lord Helix", "Groudon"], "Rayquaza"),
    new Question("At what level does Magikarp evolve?", ["21", "33", "19", "20"], "20"),
    new Question("Which Pokémon is known for carrying a leek?", [ "Mr. Mime", "Jynx", "Farfetch'd", "Fearow"], "Farfetch'd"),
    new Question("Which of these Pokemon is NOT an electric type?", ["Voltorb", "Zapdos", "Plusle", "Porygon"], "Porygon"),
    new Question("Which of these abilities does NOT cause the sleep effect?", ["Lovely Kiss", "Supersonic", "Sing", "Hypnosis"], "Supersonic"),
    new Question("What effect does a rare candy have on Pokémon?", ["Clears status effects", "Completely restores HP", "Teaches a Pokémon a new move", "Raises a Pokémon's level"], "Raises a Pokémon's level"),
    new Question("The Pokédex that contains encyclopedic information about the Competitive Pokémon", ["EVERDEX", "Pokéweb", "Pokémon Encyclopedia", "Pokémon Index"], "EVERDEX")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();