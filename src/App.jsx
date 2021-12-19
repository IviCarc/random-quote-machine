import { React, useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import { ReactComponent as TwLogo } from "./twitter-square-brands.svg";

function App() {
	const [quote, setQuote] = useState(null);
	const [author, setAuthor] = useState(null);

	const getRandomQuote = async () => {
		try {
			const res = await (await axios.get("http://api.quotable.io/random")).data;
			setQuote(res.content);
			setAuthor(res.author);

			const colors = ["#5dade2", "#9cda29", "#FFC300", "#FF5733"]
			const random = Math.floor(Math.random() * (colors.length));

			document.body.style.backgroundColor = colors[random]
			document.getElementById('text').style.color = colors[random]
			document.getElementById('author').style.color = colors[random]
			document.getElementById('new-quote').style.backgroundColor = colors[random]
			console.log(colors[random], random)
			document.body.animate([
			// keyframes
			{ opacity :"0" },
			{ opacity : "1" }
			], {
			// timing options
			duration: 1000,
			});

		} catch (err) {
			console.log(err);
		}
	};



	useEffect(() => {
		getRandomQuote();
	}, []);

	return (
		<div id='quote-box'>
			<div id='text-container'>
				<p id='text' >
					"{quote}"
				</p>
			</div>

			<div id='author-container'>
				<p id='author' >
					{author}
				</p>
			</div>

			<div id='clickables-container'>
				<a target='_blank' href='twitter.com/intent/tweet' id='tweet-quote'>
					<TwLogo className='tw-logo'></TwLogo>
				</a>
				<button id='new-quote' onClick={() => { getRandomQuote()}}>
					New Quote
				</button>
			</div>
		</div>
	);
}

export default App;
