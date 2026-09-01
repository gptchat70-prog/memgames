'use client';

import { useState } from 'react';

const words = [
  "Lighthouse",
  "Mango",
  "Violin",
  "Bicycle",
  "Tiger",
  "Candle",
  "Telescope",
  "Pillow",
  "Hammer",
  "Snowman"
];

export default function MemoryPage() {

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [score, setScore] = useState<number | null>(null);


  function checkAnswers() {

    let correct = 0;

    answers.forEach((answer,index)=>{
      if(answer.trim().toLowerCase() === words[index].toLowerCase()){
        correct++;
      }
    });

    setScore(correct);
  }


  return (

    <main className="min-h-screen bg-gray-50 p-8">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-bold mb-6">
          ðŸ§  Memory Palace Training
        </h1>


        {!started && (

          <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold">
              Memorize these 10 words
            </h2>

            <ol className="mt-4 list-decimal pl-6">

            {words.map(word=>(
              <li key={word}>{word}</li>
            ))}

            </ol>


            <button
              onClick={()=>setStarted(true)}
              className="mt-6 rounded-lg bg-black px-5 py-2 text-white"
            >
              Begin Recall
            </button>

          </div>

        )}



        {started && score === null && (

          <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-xl font-semibold mb-4">
              Recall the words
            </h2>


            {answers.map((answer,index)=>(

              <input
                key={index}
                value={answer}
                onChange={(e)=>{
                  const copy=[...answers];
                  copy[index]=e.target.value;
                  setAnswers(copy);
                }}
                placeholder={Word }
                className="border rounded p-2 block w-full mb-3"
              />

            ))}


            <button
              onClick={checkAnswers}
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              Submit
            </button>


          </div>

        )}



        {score !== null && (

          <div className="bg-white rounded-xl p-6 shadow">

            <h2 className="text-2xl font-bold">
              Score
            </h2>

            <p className="mt-4 text-xl">
              {score} / 10
            </p>

          </div>

        )}

      </div>

    </main>

  );
}
