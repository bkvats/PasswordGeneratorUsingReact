import { useState, useCallback, useEffect, useRef } from "react";
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(14);
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false);
  const [isCharactersAllowed, setIsCharactersAllowed] = useState(false);
  const passwordField = useRef()
  const getPassword = useCallback(function(){
    let passwordarray = [];
    for (let i = 0; i < passwordLength; i++) {
      passwordarray.push("");
    }
    let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "1234567890";
    let characters = "!@#$&*";
    if (isNumbersAllowed) {
      let randomIndex = Math.floor(Math.random() * passwordarray.length);
      passwordarray[randomIndex] = numbers[Math.floor(Math.random() * numbers.length)];
      words += numbers;
    }
    if (isCharactersAllowed) {
      let randomIndex = Math.floor(Math.random() * passwordarray.length);
      passwordarray[randomIndex] = characters[Math.floor(Math.random() * characters.length)];
      words += characters;
    }
    for (let i = 0; i < passwordLength; i++) {
      if (passwordarray[i] === "") {
        passwordarray[i] = words[Math.floor(Math.random() * words.length)]
      }
    }
    setPassword(passwordarray.join(""));
  }, [passwordLength, isNumbersAllowed, isCharactersAllowed]);
  useEffect(() => {
    getPassword();
  }, [passwordLength, isNumbersAllowed, isCharactersAllowed]);
  const copyToClipBoard = useCallback(function() {
    passwordField.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <h1>Password Generator</h1>
      <div className="show">
        <input
        type="text"
        id="password"
        value={password}
        ref={passwordField}
        readOnly />
        <button id="copy" onClick={copyToClipBoard}>Copy</button>
        <div className="tools">
          <input type="range"
            className="cursor-pointer"
            name="length"
            id="length"
            min={8}
            max={20}
            value={passwordLength}
            onChange={(event) => {
              setPasswordLength(event.target.value);
            }}
          />
          <div className="showlength">
            <p>Length:</p>
            <p id="numberLength">{passwordLength}</p>
          </div>
          <div className="options">
            <input
              type="checkbox"
              name="numbersAllowed"
              id="numbersAllowed"
              checked={isNumbersAllowed}
              onChange={(event) => {
                setIsNumbersAllowed(event.target.checked);
              }}
            />
            <label htmlFor="numbersAllowed">Numbers</label>
            <input
              type="checkbox"
              name="charactersAllowed"
              id="charactersAllowed"
              checked={isCharactersAllowed}
              onChange={(event) => {
                setIsCharactersAllowed(event.target.checked);
              }}
            />
            <label htmlFor="charactersAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
