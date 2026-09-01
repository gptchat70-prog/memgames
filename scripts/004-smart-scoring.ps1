# MemGames Milestone 4.1
# Intelligent Recall Scoring

Write-Host "Building intelligent recall scoring..."


New-Item -ItemType Directory -Force -Path "lib"


@"
export type RecallResult = {
  score: number;
  type: string;
  feedback: string;
};


function normalizeWord(word:string){

  return word
    .toLowerCase()
    .replace(/[\s-]/g,'')
    .replace(/[^a-z]/g,'');

}


function levenshtein(a:string,b:string){

  const matrix:number[][]=[];


  for(let i=0;i<=b.length;i++){
    matrix[i]=[i];
  }


  for(let j=0;j<=a.length;j++){
    matrix[0][j]=j;
  }


  for(let i=1;i<=b.length;i++){

    for(let j=1;j<=a.length;j++){

      if(b[i-1]===a[j-1]){

        matrix[i][j]=matrix[i-1][j-1];

      } else {

        matrix[i][j]=Math.min(
          matrix[i-1][j-1]+1,
          matrix[i][j-1]+1,
          matrix[i-1][j]+1
        );

      }

    }

  }


  return matrix[b.length][a.length];

}



export function evaluateRecall(
 expected:string,
 actual:string
):RecallResult{


const original=normalizeWord(expected);
const answer=normalizeWord(actual);


if(!answer){

 return {
   score:0,
   type:"NO_ANSWER",
   feedback:"No recall."
 };

}



if(original===answer){

 return {
   score:100,
   type:"PERFECT",
   feedback:"Perfect recall."
 };

}



const distance=levenshtein(original,answer);


if(distance<=2){

 return {
   score:90,
   type:"SPELLING_VARIATION",
   feedback:"Great recall. Minor spelling difference."
 };

}



return {
 score:0,
 type:"INCORRECT",
 feedback:"Memory not recalled."
};


}



export function calculateSmartScore(
answers:string[],
expected:string[]
){

let total=0;

const details=answers.map(
(answer,index)=>{

const result=evaluateRecall(
 expected[index],
 answer
);


total += result.score;


return {
 word:expected[index],
 answer,
 ...result
};


});


return {

overall:
Math.round(total/expected.length),

details

};


}
"@ | Out-File lib\scoring.ts -Encoding utf8



Write-Host "Updating memory page..."



(Get-Content app\games\memory\page.tsx) `
-replace "import \{generateWords,calculateScore\} from '@/lib/memory';",
"import {generateWords} from '@/lib/memory';`nimport {calculateSmartScore} from '@/lib/scoring';" `
-replace "calculateScore\(",
"calculateSmartScore(" `
-replace "placeholder=\{Word\}",
"placeholder={`Word ${index+1}`}" |
Out-File app\games\memory\page.tsx -Encoding utf8



Write-Host "Smart scoring complete."