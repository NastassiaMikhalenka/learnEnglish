// функция для озвучки слов
export const speak = (word: string) => {
    const speakInstance = new SpeechSynthesisUtterance(word);
    speakInstance.voice = speechSynthesis.getVoices()[51];
    speechSynthesis.speak(speakInstance);
};