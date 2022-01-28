import { React,useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import { ReactComponent as TwLogo } from "./twitter-brands.svg";

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	
	const getRandomQuote = async () => {

		try {
			const { content, author }: {content:string, author : string} = await (
				await axios.get("https://api.quotable.io/random")
			).data;
			setAuthor(author);
			setQuote(content);
		} catch (err) {
			console.log(err);
			return;
		}

		document.querySelector(".anim-div").animate([
			{ transform: "translate(0px)", display:'block' },
			{ transform: "translate(100%)" , display:'block'}],
			{
			duration:1000
		})
	};

	
	useEffect(() => {
		getRandomQuote();
		document.getElementById('new-quote').style.height = '100%'
		// DONT CHANGE THIS
		// eslint-disable-next-line
	}, []);

	return (
		<div className='app-container'>
			<div className='bg'></div>
			<div id='quote-box'>

				<div className='data-container'>	
					<div id='text-container'>
						<h1 id='text'>{quote}</h1>
						<div className="anim-div"></div>
					</div>

					<div id='author-container'>
						<h2 id='author'>{author}</h2>
					</div>
				</div>

				<div id='clickables-container'>
					<div className='logo-container'>
						<a target='_blank' href='https://twitter.com/intent/tweet' id='tweet-quote'>
							<TwLogo className='tw-logo'></TwLogo>
						</a>
					</div>
					<button
						id='new-quote'
						onClick={getRandomQuote}
					>
						New Quote
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
