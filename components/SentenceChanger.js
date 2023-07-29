'use client'
import { GlobalContext } from "@/context/GlobalContext";
import React, { useContext, useEffect, useState } from "react";

export default function SentenceChanger() {
  const [sentence, setSentence] = useState("");
  const { frase, setFrase, curPanel, setCurPanel } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFrase(sentence);
    setCurPanel('none');
    
  };

  useEffect(() => {
    const input = document.getElementById('sentence_input_changer');
    input.value = frase;
  }, [])

  return (
    <div className={`${curPanel === 'pan.change' ? 'flex' : 'hidden'}  fixed w-full h-full bg-[#00000067] z-50 justify-center transition-opacity duration-200 items-center backdrop-blur-lg`}>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col bg-zinc-700 px-4 py-8 h-64 shadow items-center relative">
        <h2 className="text-white text-2xl capitalize">Cambiar Frase</h2>
        <input
          type="text"
          name="sentence"
          placeholder="Nueva frase"
          onChange={(e) => setSentence(e.target.value)}
          id="sentence_input_changer"
          className="m-2 my-5 p-1  w-full bg-transparent border-2 rounded-lg border-fuchsia-500 hover:border-fuchsia-400 font-semibold text-gray-200"
          autoFocus
        />
        <button type="submit" className="absolute bottom-4 text-white px-5 py-2 transition-all duration-300 hover:bg-green-500 bg-green-400 rounded-md">Cambiar</button>
        <div  className=" btn  absolute top-2 right-2 text-white w-8 h-8 transition-all duration-300 hover:bg-red-600 bg-[#a3a3a386] rounded-md cursor-pointer flex justify-center items-center" onClick={() => setCurPanel('none')}>x</div>
      </form>
    </div>
  );
}
