# MemGames Milestone 4
# Memory Palace v2

Write-Host "Building Memory Palace v2..."


New-Item -ItemType Directory -Force -Path "lib"
New-Item -ItemType Directory -Force -Path "data"


# Word bank

@"
export const words = [
  "Tiger",
  "Lighthouse",
  "Mango",
  "Violin",
  "Bicycle",
  "Candle",
  "Telescope",
  "Pillow",
  "Hammer",
  "Snowman",
  "Rocket",
  "Castle",
  "Mountain",
  "Camera",
  "Bridge",
  "Apple",
  "River",
  "Forest",
  "Ocean",
  "Clock"
];
"@ | Out-File data\words.ts -Encoding utf8



# Memory engine

@"
import { words } from "@/data/words";


export function generateWords(count:number = 10){

 const shuffled=[...words]
   .sort(()=>Math.random()-0.5);

 return shuffled.slice(0,count);

}


export function calculateScore(
 answers:string[],
 correct:string[]
){

 let score=0;

 answers.forEach((answer,index)=>{

   if(
     answer.trim().toLowerCase()
     ===
     correct[index].toLowerCase()
   ){
     score++;
   }

 });


 return {
   correct:score,
   total:correct.length,
   percentage:
     Math.round((score/correct.length)*100)
 };

}
"@ | Out-File lib\memory.ts -Encoding utf8



# Memory game page

@"
'use client';

import {useState} from 'react';
import {generateWords,calculateScore} from '@/lib/memory';


export default function MemoryPage(){

const [words,setWords]=useState<string[]>([]);
const [started,setStarted]=useState(false);
const [answers,setAnswers]=useState<string[]>(
 Array(10).fill('')
);

const [result,setResult]=useState<any>(null);


function start(){

 setWords(generateWords(10));
 setStarted(true);

}


function submit(){

 setResult(
   calculateScore(
     answers,
     words
   )
 );

}



return (

<main className="min-h-screen bg-gray-50 p-8">

<div className="mx-auto max-w-3xl">

<h1 className="text-3xl font-bold mb-6">
🧠 Memory Palace Training
</h1>


{!started && (

<div className="bg-white p-6 rounded-xl shadow">

<p>
Prepare your memory palace.
</p>

<button
onClick={start}
className="mt-5 bg-black text-white px-5 py-2 rounded"
>
Start Training
</button>

</div>

)}



{started && !result && (

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-semibold">
Memorize these words
</h2>


<ol className="mt-4 list-decimal pl-6">

{words.map(word=>(
<li key={word}>
{word}
</li>
))}

</ol>



<h2 className="mt-8 text-xl font-semibold">
Recall
</h2>


{answers.map((answer,index)=>(

<input
key={index}
value={answer}
placeholder={`Word ${index+1}`}
onChange={(e)=>{

const copy=[...answers];
copy[index]=e.target.value;
setAnswers(copy);

}}
className="border p-2 rounded w-full mt-2"
/>

))}



<button
onClick={submit}
className="mt-5 bg-black text-white px-5 py-2 rounded"
>
Submit
</button>


</div>

)}



{result && (

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-2xl font-bold">
Your Score
</h2>


<p className="mt-4 text-xl">
{result.correct}/{result.total}
</p>


<p>
Accuracy:
{result.percentage}%
</p>


</div>

)}



</div>

</main>

);

}
"@ | Out-File app\games\memory\page.tsx -Encoding utf8


Write-Host "Memory Palace v2 complete."