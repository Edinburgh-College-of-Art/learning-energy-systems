// CONSTANTS //
var _chartPaddingWidth = 25;
var _chartPaddingHeight = 75;
var _e_scaleTypes = { week: 0, month: 1};
var _weekLabels =[
	{
		text: "Monday",
		xPos: 0
	},
	{
		text: "Tuesday",
		xPos: 1
	},
	{
		text: "Wednesday",
		xPos: 2
	},
	{
		text: "Thursday",
		xPos: 3
	},
	{
		text: "Friday",
		xPos: 4
	}
];

var _energyTypes = ["computer", "heater", "light", "projector"];

// GLOBAL VARS //
var chartElem = d3.select("#canvasContainer");
var chartSVG = chartElem.append("svg").attr('width', $('#canvasContainer').width()).attr('height', $('#canvasContainer').height());

var svgHeight = chartSVG.node().getBoundingClientRect().height;
var svgWidth = chartSVG.node().getBoundingClientRect().width;
var questionData;
var energyData;
var energyData_subjects = [];

var SHOW_ALL = false;

var yAxis = { xMax: 0, xMin: 0, yMax: 0, yMin: 0};
var xAxis = { xMax: 0, xMin: 0, yMax: 0, yMin: 0};

// **** APP START **** //
var spinner = new Spinner(opts);
styleSelect();

getInitialData();

drawAxes(); // draw x/y axis
drawXScale(_e_scaleTypes.week); // draw week scale
drawSegments(_e_scaleTypes.week);

setupListeners();
getQuestions();


function styleSelect()
{
	$("input[type=checkbox]").each(function() {
		var $lbl = $("<label>");
		$lbl.attr("for", this.id);
		$(this).after($lbl);
	});

	$( "#selectWeeks" ).selectmenu();
	$( "#selectSubjects" ).selectmenu();

	$( "#selectWeeks" ).selectmenu( "option", "icons",
		{ button: "select-icon-arrow" }
	);
	$( "#selectSubjects" ).selectmenu( "option", "icons",
		{ button: "select-icon-arrow" }
	);
	$('.ui-selectmenu-text').css('padding', '5px 0 5px 5px');
	$('.ui-selectmenu-text').css('font-size', '14px');
}

function showWeekData(offset)
{
	removeCircles();

	var week = energyData.weeks[offset];

	for(var d=0; d<week.days.length; d++)
		{
			var day = week.days[d];

			for(var i=0; i<_energyTypes.length; i++)
			{
				var type = _energyTypes[i];
				var typeAmount = (day.type_totals[type]+10)*2;
				var percentage = getPercentage(typeAmount);
				var color = getColor(percentage);
				var maxRadius = rawSegLength(5) - 15;
				var radius = (maxRadius / 100) * percentage;

				var xPos = calculateSegCentre(5, d);
				// calculateCircleY(radius, d);
				drawCircle(xPos, calculateCircleY(radius, d), radius, color, d, typeAmount, type);
			}
		}
}

function showSubjectData(subjName)
{
	removeCircles();

	var dayTotals = [{},{},{},{},{}]; // one per day of the week
	for(var w=0; w<energyData.weeks.length; w++)
	{
		for(var d=0; d<energyData.weeks[w].days.length; d++)
		{
			var day = energyData.weeks[w].days[d];
			var daySubj = null;

			if( day.subjects[subjName] )
			{
				daySubj = day.subjects[subjName];
				for(var i=0; i<_energyTypes.length; i++)
				{
					var type = _energyTypes[i];
					if(!dayTotals[d][type])
					{
						dayTotals[d][type] = 0;
					}
					var typeAmount = daySubj[type];
					dayTotals[d][type] += typeAmount;
				}
			}
		}
	}
	console.log('adawd');
	console.log(dayTotals);

	for(var x=0; x<dayTotals.length; x++)
	{
		var thisDay = dayTotals[x];

		for(var y=0; y<_energyTypes.length; y++)
		{
			var typeName = _energyTypes[y];
			if(!thisDay[typeName])
			{
				continue;
			}
			var typeVal = (thisDay[typeName]+10)*2;
			var percentage = getPercentage(typeVal);
			var color = getColor(percentage);
			var maxRadius = rawSegLength(5) - 15;
			var radius = (maxRadius / 100) * percentage;

			var xPos = calculateSegCentre(5, x);
			// calculateCircleY(radius, d);
			drawCircle(xPos, calculateCircleY(radius, x), radius, color, x, typeVal, typeName);
		}
		
	}
}


function showInitial()
{
	var dayTotals = [{},{},{},{},{}]; // one per day of the week
	for(var w=0; w<energyData.weeks.length; w++)
	{
		for(var d=0; d<energyData.weeks[w].days.length; d++)
		{
			var day = energyData.weeks[w].days[d];

			for(var i=0; i<_energyTypes.length; i++)
			{
				var type = _energyTypes[i];
				if(!dayTotals[d][type])
				{
					dayTotals[d][type] = 0;
				}
				var typeAmount = day.type_totals[type];
				dayTotals[d][type] += typeAmount;
			}
		}
	}

	// console.log(dayTotals);

	for(var x=0; x<dayTotals.length; x++)
	{
		var thisDay = dayTotals[x];

		for(var y=0; y<_energyTypes.length; y++)
		{
			var typeName = _energyTypes[y];
			var typeVal = (thisDay[typeName]+10)*2;
			var percentage = getPercentage(typeVal);
			var color = getColor(percentage);
			var maxRadius = rawSegLength(5) - 15;
			var radius = (maxRadius / 100) * percentage;

			var xPos = calculateSegCentre(5, x);
			// calculateCircleY(radius, d);
			drawCircle(xPos, calculateCircleY(radius, x), radius, color, x, typeVal, typeName);
		}
		
	}
}

function getPercentage(val)
{
	return (val/2160) * 100;
}

function getColor(percent)
{
	var color;
	if(percent <10){
		color = "#46427e";
	}

	else if(percent <20){
		color = "#336C8C";
	}

	else if(percent <30){
		color = "#398E96";
	}

	else if(percent <40){
		color = "#38B58A";
	}

	else if(percent <50){
		color = "#B8D784";
	}

	else if(percent <60){
		color = "#F4F0AF";
	}

	else if(percent <70){
		color = "#EAA883";
	}

	else if(percent <80){
		color = "#E68287";
	}

	else if(percent <90){
		color = "#EA4575";
	}

	else{
		color = "#B65372";
	}

	return color;
}

function calculateCircleY(radius, dayIndex)
{
	var yMinimum = xAxis.yMax;
	var prevRad;

	chartSVG.selectAll('circle')
		.each(function(d, i)
		{
			var circle = d3.select(this);
			var column = circle.attr('column');
			var cY = circle.attr('cy');
			

			if(column == dayIndex)
			{
				if(cY < yMinimum)
				{
					yMinimum = cY;
					prevRad = circle.attr('r');
				}
				else
				{
					yMinimum = yMinimum;
				}
			}
		});
	// baseline - min gap - radius
	var padding = 10;
	var yPos;

	if(yMinimum == xAxis.yMax)
	{
		yPos = (yMinimum - padding) - (radius*1);
	}
	else
	{
		yPos = (yMinimum - padding) - radius - prevRad;
	}
	// console.log(yPos);
	return yPos;
}

function drawCircle(x, y, radius, color, index, absVal, type)
{
	var circle = chartSVG.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", radius)
		.attr('column', index)
		.attr('absVal', absVal)
		.attr('energyType', type)
		.style("fill", color);

	circle.on('click', function() {
		chartSVG.selectAll('circle').attr('class', '');
		$('#selectedCircleValue').text('Selected Value: '+circle.attr('absVal'));
		circle.attr('class', 'shadowed');
	});
}

function removeCircles()
{
	chartSVG.selectAll('circle').remove();
}

function removeCirclesNamed(name)
{
	chartSVG.selectAll('circle').filter(function(d) {
		var circle = d3.select(this);
		return (circle.attr('energyType') == name);
	})
	.style("fill", '#B8B6B6');
}

function showCirclesNamed(name)
{
	removeCircles();
	showInitial();
}

function populateSubjects()
{
	for(var i=0; i<energyData_subjects.length; i++)
	{
		var thisval = energyData_subjects[i];
		$("#selectSubjects").append("<option value='"+thisval+"'>"+thisval+"</option>");
	}
	$("#selectSubjects").selectmenu("refresh");

	$("#selectSubjects").selectmenu({
		change: function( event, ui ) {
			var newSubject = ui.item.label;
			if(newSubject == "All Subjects")
			{
				removeCircles();
				showInitial();
				$("#selectWeeks").selectmenu('destroy');
				$("#selectWeeks").prop('selectedIndex',0);

				$( "#selectWeeks" ).selectmenu();
				$( "#selectWeeks" ).selectmenu( "option", "icons",
					{ button: "select-icon-arrow" }
				);
				$('.ui-selectmenu-text').css('padding', '0 0 0 2px');
			}
			else
			{
				showSubjectData(newSubject);
			}
		}
	});
}

function populateWeeks()
{
	$("#selectWeeks").append("<option value='This Week'>This Week</option>");
	$("#selectWeeks").append("<option value='Last Week'>Last Week</option>");
	$("#selectWeeks").append("<option value='Two Weeks Ago'>Two Weeks Ago</option>");
	

	$( "#selectWeeks" ).selectmenu({
		change: function( event, ui ) {
			var weekVal = ui.item.label;
			var weekOffset;
			if(weekVal == "This Week")
			{
				weekOffset = 0;
				showWeekData(weekOffset);
			}
			else if(weekVal == "Last Week")
			{
				weekOffset = 1;
				showWeekData(weekOffset);
			}
			else if(weekVal == "Two Weeks Ago")
			{
				weekOffset = 2;
				showWeekData(weekOffset);
			}
			else if(weekVal == "All Weeks")
			{
				$("#selectSubjects").selectmenu('destroy');
				$("#selectSubjects").prop('selectedIndex',0);

				$( "#selectSubjects" ).selectmenu();
				$( "#selectSubjects" ).selectmenu( "option", "icons",
					{ button: "select-icon-arrow" }
				);
				$('.ui-selectmenu-text').css('padding', '0 0 0 2px');

				removeCircles();
				showInitial();
			}
		}
	});

}



function getInitialData()
{
	$("#canvasContainer").css('visibility', 'hidden');
	spinner.spin($('#canvasContainer')[0]);
	$(".spinner").css('visibility', 'visible');
	$.ajax({
		url: 'http://localhost/dashboard/app_data/all.json',
		type: 'GET',
		dataType: 'json',
		data: {}
	})
	.done(function(data)
	{
		energyData = data.appData;
		energyData.weeks = [];

		for(var w=0; w<3; w++)
		{
			energyData.weeks.push({
				days:[{},{},{},{},{}],
				type_totals: {},
				subjects: {}
			});
		}

		

		for(w=0; w<energyData.weeks.length; w++)
		{
			var week = energyData.weeks[w];

			for(var t=0; t<_energyTypes.length; t++)
			{
				var energyType = _energyTypes[t];
				for(var d=0; d<week.days.length; d++)
				{
					if(!week.days[d].type_totals)
					{
						week.days[d].type_totals = {};
						week.days[d].subjects= {};
					}
					week.days[d].type_totals[energyType] = 0;
				}
				week.type_totals[energyType] = 0;
			}
		}

		energyData.type_totals = {};
		
		for(var i=0;i<energyData.length;i++)
		{
			$("#canvasContainer").css('visibility', 'visible');
			spinner.stop();

			var e = energyData[i];
			e.date = moment(e.date);

			var subj = e.subject;

			if($.inArray(subj, energyData_subjects) === -1)
			{
				energyData_subjects.push(subj);
			}

			var weekday = e.date.isoWeekday();
			if(weekday <= 5)
			{
				var thisWeekNumber = moment().isoWeek();
				var weekOffset = thisWeekNumber - e.date.isoWeek();
				if(weekOffset > 2) { continue; }
				var eWeek = energyData.weeks[weekOffset];
				// console.log(weekOffset);
				eWeek.offset = weekOffset;
				var eDay = eWeek.days[weekday-1];


				for(var x=0; x<_energyTypes.length; x++)
				{
					var eType = _energyTypes[x];

					for(var y=0; y<energyData_subjects.length; y++)
					{
						var subject = energyData_subjects[y];
						if(eWeek.subjects[subject] === undefined)
						{
							eWeek.subjects[subject] = {};
						}
						if(eDay.subjects[subject] === undefined)
						{
							eDay.subjects[subject] = {};
						}

						if(!eWeek.subjects[subject][eType])
						{
							eWeek.subjects[subject][eType] = 0;
						}
						if(!eDay.subjects[subject][eType])
						{
							eDay.subjects[subject][eType] = 0;
						}

						eDay.subjects[subject][eType] += e[eType];
						eWeek.subjects[subject][eType] += e[eType];
					}


					if(!energyData.type_totals[eType])
					{
						energyData.type_totals[eType] = 0;
					}

					if(e[eType])
					{
						energyData.type_totals[eType] += e[eType];
						$("p[labelfor='"+eType+"']").text(energyData[eType+"_total"]);
						eWeek.type_totals[eType] += e[eType];
						eDay.type_totals[eType] += e[eType];
					}

					$('p[labelfor="'+eType+'"]').text(energyData.type_totals[eType]);
				}

					// if(e[e.subject])
					// {
					// 	if(!eDay.subjects[e].subject[eType])
					// 	{
					// 		eDay.subjects[e.subject][eType] = 0;
					// 	}
						
					// 	eDay[e.subject][eType] += +e[eType];
					// }
					// else
					// {
					// 	eDay.subj_totals[e.subject] = {};
					// 	eDay[e.subject][eType] = 0;
					// 	eDay[energyData[i].subject][eType] += +energyData[i][eType];
					// }

				
			}
		}

		// console.log(energyData);

		showInitial();

		populateSubjects();
		populateWeeks();
	});
}

function setupListeners()
{
	$("label[for='show_total_check']").click(function(event) {
		SHOW_ALL = !SHOW_ALL;
		console.log(SHOW_ALL);
		if(SHOW_ALL)
		{
			$("#energyIcons p.label").css('visibility', 'visible');
		}
		else
		{
			$("#energyIcons p.label").css('visibility', 'hidden');
		}
	});


	$('.addButton').click(function(event) {
		event.preventDefault();

		// check q AND a
		var question = $.trim($("#questionTextArea").val());
		var answer = $.trim($("#answerTextArea").val());
		var questionID;
		if ( (question === "") || (answer === "") )
		{
			alert("Don't forget both the question and the answer");
			return;
		}
		// send
		$.ajax({
			url: 'http://localhost/dashboard/app_questions/add',
			type: 'POST',
			dataType: 'json',
			data: {school_id: 5, question: question, answer: answer}
		})
		.done(function(e) {
			questionID = e.data.id;
			questionData.push({'id':questionID, 'question': question, 'answer': answer, 'app_school_id': 0});

			var numElements = $('#questionsWrapper').find('span.questionRow').length;
			$('#questionsWrapper').append("<span class='questionRow'><span class='qNumber'>"+(numElements+1)+"</span><span class='questionText'>"+question+"</span><img class='deleteButton' questionID="+questionID+" src='img/deleteButton.png' alt='delete question' height='20px' width='20px' /><p questionID="+questionID+" class='revealButton'>Reveal Answer</p></span");
			$('.revealButton').last().click(function(event)
			{
				var questionID = $(event.currentTarget).attr('questionid');

				if($(event.currentTarget).text() === "Reveal Answer")
				{
					var theAnswer;
					$(event.currentTarget).text("Hide Answer"); // change the button
					for(var i=0;i<questionData.length; i++)
					{
						if(questionData[i].id === +questionID)
						{
							theAnswer = questionData[i].answer;
						}
					}
					if($(event.currentTarget).parent().find('hr').length > 0)
					{
						$(event.currentTarget).parent().find('hr').last().before("<p class='answer'>"+theAnswer+"</p>");
					}
					else
					{
						$(event.currentTarget).parent().append("<p class='answer'>"+theAnswer+"</p>");
					}
					
				}
				else
				{
					$(event.currentTarget).text("Reveal Answer");
					$(event.currentTarget).parent().find('.answer').remove();
				}
			});

			$('.deleteButton').last().click(function(event)
			{
				/* Act on the event */
				var deleteConfirm = confirm("Are you sure you want to delete this question? (no way back!)");

				if(deleteConfirm)
				{
					var questionID = $(event.currentTarget).attr('questionid');
					// grey until gone
					$(event.currentTarget).parent().css('color', 'rgb(225,225,225');
					$(event.currentTarget).parent().find('.revealButton').css('color', 'rgb(225,225,225');

					// send query
					$.ajax({
						url: 'http://localhost/dashboard/app_questions/delete/'+questionID,
						type: 'DELETE',
						dataType: 'json',
						data: {},
					})
					.done(function() {
						console.log("success");
						$(event.currentTarget).parent().remove();
						reflowListNumbers();
					})
					.fail(function(e) {
						console.log(e);
					});
					
				}
			});
		})
		.fail(function() {
			alert('Failed to connect to the database - send Chris an angry email');
		});
	});


	$('#energyIcons img').click(function(event) {
		
		if($(event.currentTarget).hasClass('isSelected'))
		{
			removeCirclesNamed($(event.currentTarget).attr('name'));
		}
		else
		{
			showCirclesNamed($(event.currentTarget).attr('name'));
		}
		$(event.currentTarget).toggleClass('isSelected');
	});
}

function getQuestions()
{
	// all questions pertaining to a certain school
	d3.json("http://localhost/dashboard/app_questions.json", function(error, json) {
		if (error) return console.log(error);
		questionData = json.appQuestions;
		displayQuestions();
	});
}

function displayQuestions()
{
	for(var i=0;i<questionData.length; i++)
	{
		var thisQuestion = questionData[i];
		$('#questionsWrapper').append("<span class='questionRow'><span class='qNumber'>"+(i+1)+"</span><span class='questionText'>"+thisQuestion.question+"</span><img class='deleteButton' questionID="+thisQuestion.id+" src='img/deleteButton.png' alt='delete question' height='20px' width='20px' /><p questionid="+thisQuestion.id+" class='revealButton'>Reveal answer</p></span");
		if(i % 2 !== 0)
		{
			$('span.questionRow').eq(i).append("<hr/>");
			$('span.questionRow').eq(i).prepend("<hr/>");
		}
	}

	setupQuestionListeners();
}

function deleteQuestion()
{

}

function drawAxes()
{
	// Y AXIS
	yAxis.xMax = 0 + _chartPaddingWidth;
	yAxis.xMin = 0 + _chartPaddingWidth;
	yAxis.yMax = 0 + _chartPaddingWidth;
	yAxis.yMin = +chartSVG.attr('height') - _chartPaddingHeight;

	chartSVG.append("line")
		.attr('x1', yAxis.xMax)
		.attr('y1', yAxis.yMin)
		.attr('x2', yAxis.xMin)
		.attr('y2', yAxis.yMax)
		.attr('stroke-width', 2)
		.attr('stroke', '#A8A6A6');

	// X AXIS
	xAxis.xMax = +chartSVG.attr('width') - _chartPaddingWidth;
	xAxis.xMin = 0 + _chartPaddingWidth;
	xAxis.yMax = +chartSVG.attr('height') - _chartPaddingHeight;
	xAxis.yMin = +chartSVG.attr('height') - _chartPaddingHeight;

	chartSVG.append("line")
		.attr('x1', xAxis.xMin)
		.attr('y1', xAxis.yMin)
		.attr('x2', xAxis.xMax)
		.attr('y2', xAxis.yMax)
		.attr('stroke-width', 2)
		.attr('stroke', '#A8A6A6');
}

function drawSegments(segs)
{
	var numSegs;
	if(segs === _e_scaleTypes.week)
	{
		numSegs = 5;
	}
	else if(segs === _e_scaleTypes.month)
	{
		numsegs = 30;
	}

	for(var i=0; i<numSegs; i++)
	{
		var x = calculateSegLengths(5,i+1);
		chartSVG.append("line")
			.attr('x1', x)
			.attr('y1', yAxis.yMin)
			.attr('x2', x)
			.attr('y2', yAxis.yMax)
			.attr('stroke-width', 2)
			.attr('stroke', '#A8A6A6');
	}
}

function drawXScale(type)
{
	var labelSource;

	if(type === _e_scaleTypes.week)
	{
		// use week
		labelSource = _weekLabels;
	}
	else if(type === _e_scaleTypes.month)
	{
		// use month
	}

	var text = chartSVG.selectAll("text")
		.data(labelSource)
		.enter()
		.append("text");

	var xPos = 0;
	var textLabels = text
		.attr("x", function(d, i){ return ((xAxis.xMax / 5) * d.xPos) + xAxis.xMin*2+5; })
		.attr("y", xAxis.yMax + 20)
		.text(function(d){ return d.text; })
		.attr("font-family", "TTRounds")
		.attr("font-weight", "bold")
		.attr("font-size", "14px")
		.attr("fill", "#A8A6A6");
}

function calculateSegCentre(numSegs, index)
{
	var segLength = rawSegLength(numSegs);

	// times index
	return xAxis.xMin + (index*segLength) + (segLength / 2);
}

function rawSegLength(numSegs)
{
	var lineLength = xAxis.xMax - xAxis.xMin;
	return lineLength / numSegs;
}

function calculateSegLengths(numSegs, index)
{
	// line length / numsegs
	var lineLength = xAxis.xMax - xAxis.xMin;
	var segLength = lineLength / numSegs;
	return (segLength*index)+_chartPaddingWidth;
}

function checkLogin()
{
	var schoolID = localStorage["les_school_id"];
	if(schoolID === undefined)
	{
		// redirect to login.html
	}
}

function setupQuestionListeners()
{
	$('.deleteButton').click(function(event)
	{
		/* Act on the event */
		var deleteConfirm = confirm("Are you sure you want to delete this question? (no way back!)");

		if(deleteConfirm)
		{
			var questionID = $(event.currentTarget).attr('questionid');
			// grey until gone
			$(event.currentTarget).parent().css('color', 'rgb(225,225,225');
			$(event.currentTarget).parent().find('.revealButton').css('color', 'rgb(225,225,225');

			// send query
			$.ajax({
				url: 'http://localhost/dashboard/app_questions/delete/'+questionID,
				type: 'DELETE',
				dataType: 'json',
				data: {},
			})
			.done(function() {
				console.log("success");
				$(event.currentTarget).parent().remove();
				reflowListNumbers();
			})
			.fail(function(e) {
				console.log(e);
			});
			
		}
	});

	$('.revealButton').click(function(event)
	{
		var questionID = $(event.currentTarget).attr('questionid');
		
		console.log($(event.target).text());
		if($(event.target).text().toLowerCase() === "reveal answer")
		{
			var theAnswer;

			$(event.currentTarget).text("Hide Answer"); // change the button
			for(var i=0;i<questionData.length; i++)
			{
				if(questionData[i].id === +questionID)
				{
					theAnswer = questionData[i].answer;
				}
			}
			if($(event.currentTarget).parent().find('hr').length > 0)
			{
				$(event.currentTarget).parent().find('hr').last().before("<p class='answer'>"+theAnswer+"</p>");
			}
			else
			{
				$(event.currentTarget).parent().append("<p class='answer'>"+theAnswer+"</p>");
			}
		}
		else
		{
			$(event.currentTarget).text("Reveal Answer");
			$(event.currentTarget).parent().find('.answer').remove();
		}
	});
}

function reflowListNumbers()
{
	var rows = $('#questionsWrapper').find('span.questionRow');
	for(var i=0; i<rows.length; i++)
	{
		$(rows[i]).find('.qNumber').text(i+1);
		if($(rows[i]).find('hr').length > 1)
		{
			$(rows[i]).find('hr').eq(0).remove();
		}
	}
}
