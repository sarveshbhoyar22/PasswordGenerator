import { useState, useCallback, useEffect, useRef } from "react";
import Checkbox from "./components/checkbox";

function App() {
  const [length, setLength] = useState(15);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [UppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [LowercaseAllowed, setLowercaseAllowed] = useState(false);
  const [SymbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copi, setCopi] = useState("Copy");

  //
  // useRef Hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(
    function () {
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwxyz";
      if (NumberAllowed) {
        str += "0123456789";
      }
      if (UppercaseAllowed) {
        str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (LowercaseAllowed) {
        str += "abcdefghijklmnopqrstuvwxyz";
      }
      if (SymbolAllowed) {
        str += "!@#$%^&*()_+-=[]{}|;':\",./<>?";
      }

      for (let i = 1; i <= length; i++) {
        // pass += str.charAt(Math.floor(Math.random()*str.length));
        let char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char);
      }
      setPassword(pass);
    },
    [
      length,
      NumberAllowed,
      UppercaseAllowed,
      LowercaseAllowed,
      SymbolAllowed,
      setPassword,
    ]
  );

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password);
    setCopi("Copied");
    setTimeout(() => {
      setCopi("Copy");
    }, 2000);
  }, [setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    NumberAllowed,
    UppercaseAllowed,
    LowercaseAllowed,
    SymbolAllowed,
    passwordGenerator,
  ]);

  return (
    <>
      <div
        className="w-[450px] bg-gray-800  m-auto rounded-lg p-5  shadow-2xl shadow-black "
        // style={{ boxShadow: "1px 1px 10px 2px black" }}
      >
        {/* <h1 className="text-5xl rounded-xl p-4 font-mono text-white">Password Generator </h1> */}
        <div className="flex">
          <img className="w-20 ml-5" src="logo.svg" alt="" />
          <div className="w-full max-w-md mx-auto  rounded-lg text-4xl  p-6 my-4 text-white text-center ">
            Password Generator
          </div>
        </div>

        <div className="w-full max-w-md mx-auto shadow-lg bg-slate-900 rounded-lg  p-6 my-4 text-white text-center flex ">
          <input
            type="text"
            value={password}
            className="overflow outline-none bg-[#ffffff25] text-white w-full py-3 px-3 mt-4 rounded placeholder-gray-500 placeholder-opacity-50 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            id="copy"
            className="py-2 px-3 text-center mt-4 rounded ml-1 bg-blue-500 hover:scale-105 transition-all hover:bg-orange-500  active:bg-blue-500 active:scale-100"
          >
            {copi}
          </button>
        </div>
        <div className="w-full flex justify-between shadow-lg bg-slate-900 rounded-lg  p-6 my-4 text-white text-center ">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            id="range"
            className="cursor-pointer accent-blue-500 w-60 active:accent-orange-500"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="text-white rounded-full px-2 py-1 bg-slate-800 mx-2 w-[100px] flex justify-between" htmlFor="range">
            <div>Length: </div>
            <div>{length}</div>
          </label>
        </div>
        <div className=" justify-center w-full max-w-md mx-auto shadow-lg bg-slate-900 rounded-lg  p-6 my-4 text-white text-center gap-4 flex">
          <Checkbox
            name="Uppecase"
            onChange={() => {
              setUppercaseAllowed((prev) => !prev);
            }}
            id="uppercase"
            defaultChecked={false}
          />
          {/* <Checkbox
            name="Lowercase"
            onChange={() => {
              setLowercaseAllowed((prev) => !prev);
            }}
            id="lowercase"
            defaultChecked={false}
          /> */}
          <Checkbox
            name="Number"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            id="Number"
            defaultChecked={false}
          />
          <Checkbox
            name="Symbol"
            onChange={() => {
              setSymbolAllowed((prev) => !prev);
            }}
            id="Symbol"
            defaultChecked={false}
          />
        </div>
        {/* <div>
          <ServerCall />
        </div> */}
      </div>
    </>
  );
}
function ServerCall() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [ans, setAns] = useState(0);
  useEffect(() => {
    fetch("http://localhost:4000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a, b }),
    })
      .then((res) => res.json())
      .then((data) => setAns(data.sum));
  }, [a, b]);
  return (
    <div>
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
      <div className="text-white">{ans}</div>
    </div>
  );
}
export default App;
