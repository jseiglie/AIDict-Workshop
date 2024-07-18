const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			word: {
				"definition_and_usage": "Definition: Prueba is a Spanish term that translates to \"test\" or \"proof\" in English. It is commonly used to refer to a trial, exam, or evidence that demonstrates the truth or validity of a statement or claim.\n\nUsage example: \"Durante la clase de matem\u00e1ticas, los estudiantes tuvieron que completar una prueba para demostrar su comprensi\u00f3n de los conceptos aprendidos.\" (Translation: \"During math class, the students had to take a test to",
				"translations": {
				  "de": "nachweisen",
				  "en": "proof",
				  "es": "prueba",
				  "fr": "test",
				  "ko": "\uc99d\uac70",
				  "pt": "prova",
				  "ru": "\u0434\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e"
				},
				"word": "prueba"
			  },
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getWord: async (word) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/definition/"+word)
					const data = await resp.json()
					setStore({ word: data.data })
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
