"use client";
import React, { useContext, useEffect } from "react";
import "./velocidad.css";
import { useState } from "react";
import  { GlobalContext } from "@/context/GlobalContext";
import SentenceChanger from "@/components/SentenceChanger";
import axios from "axios";
import { Login } from "@/components/LoginChanger";
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';



export default function Home() {
  const [mal, setMal] = useState(false); //para cuando hay errores de pasarse de letras de la frase
  const [trampa, setTrampa] = useState(false); //cuando hay trampas de copiar y pegar
  const [hora, setHora] = useState([]); //arreglo de intentos pasados
  const [valor, setValor] = useState(""); //string del input principal
  const [isActive, setIsActive] = useState(false); //alternador entre play pause
  const [isPaused, setIsPaused] = useState(true); //alternador entre play pause
  const [time, setTime] = useState(0); //tiempo en milisegundos del timer
  const [guardado, setGuardado] = useState(true); //avisar q ya hay partidas anteriores
  const [cantidad, setCantidad] = useState(0); //cantidad de teclas pra verificaciones
  const [win, setWin] = useState(false); // Hook para la comprobacion de ganar y evitar bugs :DYW
  const[attemps, setAttemps] = useState(0) //intentos
const[cargado,setCargado] = useState(false) //si ya hay tiempos anterirors
  const[info,setInfo] = useState([])
  const[id,setID] = useState("")  //nombdre del logeado
  const [cookies, setCookie] = useCookies(['token']); //token guardado en cookies
const[iduser,setIduser] = useState("")

  const { frase, setCurPanel } = useContext(GlobalContext); // Contexto global donde se almacenara la informacion que debe ser compartida entre componentes :DYW

  // Transforma Milisengundos a formato sec:milisec :GUILLE
  const timeFormat = time => {
    return `${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${(
      "0" + Math.floor((time / 1000) % 60)
    ).slice(-2)}.${("0" + ((time / 10) % 100)).slice(-2)}`
  }

  // Ordena un arreglo numerico (La funcion pasa como callback es la que usara para comparar) :DYW
  const sort = array => {
    return [...array].sort((a, b) => a - b);
  }

  useEffect(() => {
    let interval = null;
    if (isPaused && valor === frase && win === false) {
      setGuardado(true);
      setWin(true);
      if (!trampa) {
        setAttemps(attemps + 1);
        setHora([
          time,
          ...hora,
        ])
        mandarHora();
        
        ;
        
      }
    }

    
    if (isActive && isPaused === false && !win) {
      interval = setInterval(() => {
        //useeffect para pause o activo  ,tiene el timer y anade al arreglo si no es trampa y tiene el limiador de intervalo
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

 
  useEffect(() => {
    if (valor === "") {
      setIsActive(false);
      setTime(0); //revisa el input si esta vacio restablece y si esta completo pone pause
      setValor("");
      setCantidad(0);
      setMal(false);
      setTrampa(false);
      setWin(false);
    } else if (!win) {
      setCantidad(cantidad + 1);
      const complete = valor === frase;
      const difference = frase.length - valor.length;

      if (difference < 0 || (difference == 0 && !complete)) {
        setMal(true);
      }
      if (difference > 0) {
        setMal(false);
      }
      if (difference === 0 && cantidad + 1 < frase.length) {
        setTrampa(true); //revisa el porciento con cantidad de letras como verificaion
        setTime(0);
        console.log(`${cantidad}  ${frase.length}`);
      }

      if (complete) {
        setIsPaused(true);
      }
    }
  }, [valor]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  //los handles de botones

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setValor("");
    setCantidad(0);
    setTrampa(false);
    setMal(false);
  };

  const handleChangeSentence = () => {
    // Activa la ventana para cambiar la frase :DYW
    setCurPanel("pan.change");
  };

  const percentage = ((valor.length / frase.length) * 100).toFixed(2);

  if(cookies.token!==null && cookies.token!==""&&cookies.token !== undefined  ){
  
useEffect(()=>{

    const tokenaenviar = cookies.token;
    const {uid} = jwt_decode(tokenaenviar);
 const res2 = axios.get(`http://localhost:4000/api/events/${uid}`, {
  headers: {
    "Content-Type": "application/json",
    "x-token" : `${cookies.token}`
}
  }).then((response) => {
    setHora(response.data.eventos[0].tiempos);
    setID(response.data.eventos[0].id);
    setIduser(response.data.eventos[0].user._id);
console.log(response);
  })



    .catch(console.error)

  
},[cookies.token])
  }



function mandarHora(){
  const URL =`http://localhost:4000/api/events/${id}`
const resp= axios.put(URL,{

tiempos:[time,
...hora]

},{
  headers: {
    "Content-Type": "application/json",
    "x-token" : `${cookies.token}`
  }
  }).then((response)=>{console.log(response)})
}


  return (
    <main className="flex min-h-screen flex-col items-center  justify-center  bg-zinc-800">
      <SentenceChanger />
      <div className="cronometro_container p-4">
        <h1 className="text-cyan-50 text-3xl font-sans">Cronometro </h1>
        <div className="rounded-md    shadow-lg h-auto w-auto m-6  p-10">
          <h2 className="text-stone-300 font-bold ">{frase}</h2>

          <input
            value={valor}
            onChange={(e) => {
              setIsActive(true);
              setIsPaused(false);
              setValor(e.target.value);
            }}
            placeholder="Escriba el anterior texto lo mas rapido posible"
            className="m-2 my-5 p-1  w-full bg-transparent border-2 rounded-lg border-fuchsia-500 hover:border-fuchsia-400 font-semibold text-gray-200"
            type="text"
          />
          <div>
            <div className="text-green-600 flex justify-between gap-2 mb-4 items-center  text-center w-full">
              <div className="text-xl ">
                <span>
                  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
              </div>
              {!trampa && !mal && (
                <p className="text-green-800">
                  {percentage}% de la frase ha sido escrita
                </p>
              )}
              {trampa && (
                <div className="flex items-center rounded shadow-md overflow-hidden w-44 relative dark:bg-gray-900 dark:text-gray-100">
                  <div className="self-stretch flex items-center px-1 flex-shrink-0 dark:bg-gray-700 dark:text-violet-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 text-red-950 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="p-2 flex-1">
                    <h3 className="text-sm font-bold text-red-700">Error</h3>
                    <p className="text-[0.5rem] text-red-400">
                      SIN HACER TRAMPAS
                    </p>
                  </div>
                </div>
              )}
              {mal && (
                <div className="flex items-center rounded shadow-md overflow-hidden w-44 relative dark:bg-gray-900 dark:text-gray-100">
                  <div className="self-stretch flex items-center px-1 flex-shrink-0 dark:bg-gray-700 dark:text-violet-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 text-red-950 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="p-2 flex-1">
                    <h3 className="text-sm font-bold text-red-700">Mal</h3>
                    <p className="text-[0.5rem] text-red-400">
                      Tienes algo mas escrito
                    </p>
                  </div>
                </div>
              )}

              <div className="loader"></div>
            </div>

            <div className="flex w-full justify-evenly items-center">
              <button
                className=" bg-slate-600 border-2 text-slate-300 rounded-md p-1 px-4 sm:px-4 hover:bg-slate-500 border-slate-500"
                onClick={() => {
                  setIsActive(true);
                  setIsPaused(false);
                }}
              >
                Start
              </button>
              <button
                className=" bg-slate-600 border-2 rounded-md p-1 px-0 sm:px-4 text-slate-300 hover:bg-slate-500 border-slate-500"
                onClick={handlePauseResume}
              >
                Pause
              </button>
              <button
                className=" bg-slate-600 border-2 rounded-md p-1 px-0 sm:px-4 text-slate-300 hover:bg-slate-500 border-slate-500"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className=" bg-slate-600 border-2 rounded-md p-1 px-0 sm:px-4 text-slate-300 hover:bg-slate-500 border-slate-500"
                onClick={() => handleChangeSentence()}
                name="change_sentence"
              >
                Frase
              </button>
             
        <Login   ></Login>
            </div>
          </div>
          
        </div>
              
        <div className=" flex  justify-around  text-stone-300">
          <div>
          {guardado && <h3 className="text-xl">Velocidades Anteriores</h3>}
          <ul>
            {sort(hora).map((h, i) => {
              return <li key={i}> 
              <span className="text-zinc-600 text-sm mr-2">#{i + 1}</span>
              {timeFormat(h)}

              {h === hora[0] ? <span className="text-zinc-600 text-sm mx-2">(Actual)</span> : ''}
              </li>;
            })}
          </ul>
          </div>

            <div>
              <h4 className="text-xl mb-2">Records</h4>
              <ul>
              {cargado&&info?.nombre.map((n,i)=>{ return <li key={i}>{n} {info?.tiempo[i]}</li>})}
              </ul>

            </div>


        </div>
      </div>
    </main>
  );
}
