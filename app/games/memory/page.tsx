'use client';

import {useState} from 'react';
import {generateWords} from '@/lib/memory';
import {calculateSmartScore} from '@/lib/scoring';


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
   calculateSmartScore(
     answers,
     words
   )
 );

}



return (

<main className="min-h-screen bg-gray-50 p-8">

<div className="mx-auto max-w-3xl">

<h1 className="text-3xl font-bold mb-6">
  Memory Palace Training
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

<p className="mt-4 text-3xl font-bold">
{result.overall}%
</p>

<p className="mt-2">
Overall Recall Score
</p>


<h3 className="mt-6 text-xl font-semibold">
Details
</h3>


{result.details.map((item:any,index:number)=>(

<div
key={index}
className="mt-3 border rounded p-3"
>

<p>
<strong>{item.word}</strong>
</p>

<p>
Your answer: {item.answer || "(blank)"}
</p>

<p>
{item.feedback}
</p>

<p>
Score: {item.score}%
</p>

</div>

))}


</div>

)}



</div>

</main>

);

}
