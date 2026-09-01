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
