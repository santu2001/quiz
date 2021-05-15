
var questions = [{
    question: "1. Evaluate the expression 15.987 + 82.713 ?",
    choices: ["94.693", "98.700", "89.040", "97.713"],
    correctAnswer: 1
}, {
    question: "2 Find the value of 5x - 6y - 8z if x = 2, y = 3 and z = -2",
    choices: ["5", "8", "-18", "0"],
    correctAnswer: 1
}, {
    question: "3. 60% from 60 is:",
    choices: ["3.6", "60 3/5", "36", "6"],
    correctAnswer: 2
}, {
    question: "4. The multiplication of 2xy²⋅(-3x²y) is equal to:",
    choices: ["6x³y² ", "-x²y", "-xy", "-6x³y³"],
    correctAnswer: 3
}, {
    question: "5. 3x² - 3x(x - 1) - x(3 - x) is equal to:;",
    choices: ["x² - 6x", "x²", "-x²", "-x² - 6x"],
    correctAnswer: 1
},{
	question: "6.  Solve for x: 2x²=16",
    choices: ["x²=8", "x=4", "x=14", "x=0"],
    correctAnswer: 0
},{
	question: "7.  Find the square root of 98464",
    choices: ["272", "242", "221", "246"],
    correctAnswer: 0
},{
	question: "8.  Sum of 2/5 + ( (- 4)/15 ) ______________.",
    choices: ["6/15", "-2/15", "2/15", "-6/15"],
    correctAnswer: 2
},{
	question: "9.  Simplify [ 3/5 x 2/15 ] + [ 2/5 x 2/15 ] (use property )",
    choices: ["3/15", "1", "2/15", "1/15"],
    correctAnswer: 2
},{
	question: "10. What should be added to -7/8 to get -3/2;",
    choices: ["-5/8", "5/8", "1/4", "-1/4"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=180;
	var t;
$(document).ready(function () 
{
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".preButton").on("click", function () 
	{		
		
        if (!quizOver) 
		{
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $(".preButton").attr('disabled', 'disabled');
			}
			
				currentQuestion--; // Since we have already displayed the first question on DOM ready
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();		
		}
    });

	
	// On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else 
				{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					c=185;
					$(document).find(".preButton").//text("View Answer");
					$(document).find(".nextButton").//text("Play Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		
    });
});

function startTimer(duration,display){
    var timer = duration, minutes, seconds;
    setInterval(function(){
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if(--timer < 0){
            timer = 0;
        }

    }, 1000);
}
window.onload = function(){
    var time = 60 * 10, //time in seconds here
    display = document.querySelector('#setTimerDisplay');
    startTimer(time, display);
};


function timedCount()
	{
		if(c == 60*10) 
		{ 
			return false; 
		}
		
		
		
		if(c == 0 )
		{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					c=60*10;
					$(document).find(".preButton").//text("View Answer");
					$(document).find(".nextButton").//text("Play Again?");
					quizOver = true;
					return false;
					
		}
		
		
        
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(c == 60*10) { c = 60*10; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}



function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// This displays the current question AND the choices

function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:25px; display:none;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:25px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:25px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}
