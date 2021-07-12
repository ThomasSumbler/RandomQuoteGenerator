/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes = [
	{quote:"When you reach the end of your rope, tie a knot in it and hang on.",
		source:"Franklin D. Roosevelt",
		citation:"",
		year:""}, // https://www.brainyquote.com/quotes/franklin_d_roosevelt_101840
	{quote:"The world moves, and ideas that were good once are not always good.",
		source:"Dwight D. Eisenhower",
		citation:"The President's News Conference, August 31, 1956",
		year:"1956"}, // https://www.eisenhowerlibrary.gov/eisenhowers/quotes
	{quote:"If more politicians knew poetry, and more poets knew politics, I am convinced the world would be a little better place in which to live.",
		source:"John F. Kennedy",
		citation:"Speech at Harvard University, Cambridge, Mass., 14 June 1956.",
		year:"1956",
		tags: ["politics","poetry"]
		}, // https://www.jfklibrary.org/learn/about-jfk/life-of-john-f-kennedy/john-f-kennedy-quotations
	{quote:"I never sit on a fence. I am either on one side or another.",
		source:"Harry S. Truman",
		//citation:"", // comment out for test
		//year:""
		}, // https://www.trumanlibraryinstitute.org/truman/truman-quotes/
	{quote:"Yesterday is not ours to recover, but tomorrow is ours to win or lose.",
		source:"Lyndon B. Johnson",
		citation:"Public Papers of the Presidents of the United States: Lyndon B. Johnson, 1963-1964",
		year:""}, // https://www.azquotes.com/quote/148247
	/*
	{quote:"",
		source:"",
		citation:"",
		year:""},
		*/
];

// Test
//console.log(quotes);



/***
 * `getRandomQuote` function
***/

let excludeQuotesNumber = 2; // suppress this number of recently shown quotes; if you want to show all quotes without a repeat, use quotes.length-1
excludeQuotesNumber = Math.min(quotes.length-1, excludeQuotesNumber); // prevents errors from poor choice of excludeQuotesNumber
const intervalMilliseconds = 10000; // the page updates the quote automatically after this many milliseconds
let resetInterval = setInterval(printQuote,intervalMilliseconds);


const recentQuoteTable = []; // store recently used quotes
const eligibleQuoteTable = [...quotes]; // store quotes that can be selected to be displayed

function getRandomQuote() {
	let chosenIndex = Math.floor(Math.random()*(eligibleQuoteTable.length));
	let selectedQuote = eligibleQuoteTable[chosenIndex];
	// add quote to the recent quote table
	// use unshift, so pop can remove the oldest element below
	recentQuoteTable.unshift(selectedQuote);
	// remove quote from the eligible quote table
	eligibleQuoteTable.splice(chosenIndex,1);
	// Must check if recentQuoteTable has quotes that can be returned to eligibleQuoteTable
	// It already has the selectedQuote added, and we want to remove a quote if it 
	// already has the maximum number of quotes allowed.  if excludeQuotesNumber = 3, 
	// then we remove the oldest quote if the length is > 3 (since it now contains the
	// selectedQuote that will be returned).  This programming order accomodates
	// excludeQuotesNumber = 0
	if (recentQuoteTable.length > excludeQuotesNumber) {
		eligibleQuoteTable.push(recentQuoteTable.pop());
	}
	return selectedQuote;
}
	

// Test
/*
for (let i=0; i< 3*quotes.length; i++){
	console.log(getRandomQuote());
}
*/



/***
 * `printQuote` function
***/


function printQuote() {
	const nextQuote = getRandomQuote();
	let htmlString = 	`<p class="quote">${nextQuote.quote}</p>
				<p class="source">${nextQuote.source}`;
	if (typeof(nextQuote.citation)==="string" && (nextQuote.citation !== "")) {
		htmlString = htmlString + `<span class="citation">${nextQuote.citation}</span>`;
	}
	if (typeof(nextQuote.year)==="string" && (nextQuote.year !== "")) {
		htmlString = htmlString + `<span class="citation">${nextQuote.year}</span>`;
	}
	if (typeof(nextQuote.tags)==="object" && nextQuote.tags.length > 0) {
		let tagString = "";
		for (let i = 0; i < nextQuote.tags.length-1; i++) {
			tagString+=`${nextQuote.tags[i]}, `;
		}
		tagString +=nextQuote.tags[nextQuote.tags.length-1];
		htmlString = htmlString + `<p style="margin-right: 4em; text-align: right; ">Tags: ${tagString}</p>`;
	}
	htmlString = htmlString + "</p>";
	document.getElementById('quote-box').innerHTML = htmlString;
	// following line to change background color found here:
	// https://css-tricks.com/snippets/javascript/random-hex-color/
	document.body.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
	clearInterval(resetInterval);
	resetInterval = setInterval(printQuote,intervalMilliseconds);
	return htmlString;
}




/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
