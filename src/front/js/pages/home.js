import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { WordDefinition } from "../component/wordDefinition.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [word, setWord] = useState('')
	const [firstRender, setFirstRender]= useState(true)
	const handlesubmit = e => {
		e.preventDefault()
		if (word.length < 2) return alert('A word must be provided')
		setFirstRender(false)
		actions.getWord(word)
	}
	if (firstRender)alert('remember, use googletrans version googletrans==3.1.0a0')
	return (
		<div className="text-center mt-5 ">

			<form className="card w-50 mx-auto" onSubmit={handlesubmit}>
				<input className="form-control" type="text" placeholder="desired word..." value={word} onChange={e => setWord(e.target.value)} />
				<input type="submit" className="btn btn-success" value={'Send'} />
			</form>

			{
				store.word ? <WordDefinition/> : ''
			}


		</div>
	);
};
