import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const WordDefinition = () => {
    const { store } = useContext(Context)

    const word = store.word?.definition_and_usage.split('.')
    let translations = []
    for (let el in store.word.translations) {
        translations.push(store.word.translations[el]);
    }

    return (
        <div className="container d-flex my-5">
            <div className="w-75 text-start">
                <h2 className="mb-5">Palabra: {store.word?.word.toUpperCase()}</h2>
                {word.map((el,i )=> <p key={i}>{el}</p>)}
            </div>
            <div className="w-25 text-end">
                <h3 className="mb-5">Translations</h3>
                {Object.keys(store.word.translations).map((el, i) => <p key={i}>{el}: {translations[i]}</p>)}
            </div>

        </div>

    )
}