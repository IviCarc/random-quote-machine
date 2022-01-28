import { React,useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import { ReactComponent as TwLogo } from "./twitter-brands.svg";

function App() {
	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [quering, setQuering] = useState(false)

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const deleteQuote = async () => {
		
		const delay = 20

		let newAuthor = author;
		for (let i = 0; i < author.length; i++) {
			await sleep(delay)
			newAuthor = newAuthor.slice(0,-1)
			setAuthor(newAuthor + "|")
		}

		let newQuote = quote;
		for (let i = 0; i < quote.length; i++) {
			await sleep(delay)
			newQuote = newQuote.slice(0,-1)
			setQuote(newQuote + "|")
		}
				
	}

	const quoteAnimation = async (content, author) => {
		let newQuote = "";
		for (let i = 0; i < content.length; i++) {
			await sleep(25)
			newQuote += content[i];
			if (i === content.length - 1) {
			setQuote(newQuote)
			} else {
				setQuote(newQuote + "|")
			}
		}
				
		let newAuthor = "";
		for (let i = 0; i < author.length; i++) {
			await sleep(30)
			newAuthor += author[i];
			if (i === author.length - 1) {
			setAuthor(newAuthor)
			} else {
				setAuthor(newAuthor + "|")
			}
		}
	}

	const getRandomQuote = async () => {
		if (!quering) {
			try {
				setQuering(true)
				
				const { content, author }: {content:string, author : string} = await (
					await axios.get("https://api.quotable.io/random")
				).data;

				if (quote) {
					await deleteQuote()
				}

				quoteAnimation(content, author)

			} catch (err) {
				console.log(err);
			}
			setQuering(false)
		}
	};

	useEffect(() => {
		getRandomQuote();
		// DONT CHANGE THIS
		// eslint-disable-next-line
	}, []);

	return (
		<div className='app-container'>
			<div className='bg'></div>
			<div id='quote-box'>
				<div id='text-container'>
					<h1 id='text'>"{quote}"</h1>
					<div className="fade-div"></div>
				</div>

				<div id='author-container'>
					<h2 id='author'>{author}</h2>
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
