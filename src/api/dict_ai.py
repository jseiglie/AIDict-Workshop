import openai
from googletrans import Translator

#llave de openAI
openai.api_key=''

def translate_word(word):
    translator = Translator()
    languages = ['es', 'en', 'ru', 'pt', 'fr', 'ko', 'de']
    translation = {}
    for lang in languages:
        translation[lang] = translator.translate(word, dest=lang).text
    
    return translation

def get_word_info(word):
    prompt = f"Provide the definition and a usage example for the word {word}"
    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'system', 'content': 'You are a helpful assistant'},
                {'role': 'user', 'content': prompt}
            ],
            max_tokens=100
        )
        definition_and_usage = response.choices[0].message['content'].strip()

        result = {
            'word': word,
            'definition_and_usage': definition_and_usage,
            'translations': translate_word(word)
        }    
        return result
    except openai.error.RateLimitError:
        return 'Rate Limit Exceed'
    except openai.error.OpenAIError as e:
        return f'Error: {e}'
