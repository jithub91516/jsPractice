//generateInput(n: number): number [][]
function generateInput(n){
  let number = [];
  for (let i = 0; i<n ;++i){
    let arr = [];
    for (let j = 0 ; j<n ; ++j){
      arr.push(j);
    }
    arr = shuffle(arr);
    number.push(arr);
  }
  return number;
}

function shuffle(a) {
  for (let i = a.length - 1; i >= 1; --i) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function randomArray(n1, n2) {
  let n = Math.floor(Math.random() * n1);
  let a = [];
  for (let i = 0; i < n; ++i) {
    a.push(Math.floor(n2 * Math.random()));
  }
  return a;
}

function arrayE(arr1, arr2){
  if (arr1.length !== arr2.length){
    return false;
  }
  for (let i = 0; i < arr1.length; ++i){
    if (arr1[i] !== arr[i]){
      return false;
    }
  }
  return true;
}

function linkCompany(hires,companies,company,x){
  for(let i=0; i < company.length; ++i){
  let cur = hires[company[i]];
  let list = companies[company[i]];

  if (list.indexOf(x)<=list.indexOf(cur)){
    return false;
    }
  }
  return true;
}

function linkCandidate(hires,candidates,candidate,x){
  for(let i=0; i < candidate.length; ++i) {
      let cur = hires.indexOf(candidate[i]);
      let list = candidates[candidate[i]]

      if(list.indexOf(x)<=list.indexOf(cur)){ 
        return false; 
      }
    }
    return true;
}

function isStable(x,y,companies,candidates,hires){   
    
    let candidate=Prefer(x,y,companies);  
    let company=Prefer(y,x,candidates);
    if(candidate.length===0||company.length===0){
      return true;
    }

    if(!linkCompany(hires,companies,company,y)){
      return false;
    }
    
    if(!linkCandidate(hires,candidates,candidate,x)){
      return false;
    }
    return true;
}

function Prefer(x,y,list)
{
    let prefer=[];
    let rank=list[x].indexOf(y);

   
    for(let i=0;i<rank;++i)  
    {
      prefer.push(list[x][i]);      
    }
    return prefer;
}

// oracle(f: (candidates: number[][], companies: number[][]) => Hire[]): void)
function oracle(f){
  let numTests = 100; // Change this to some reasonably large value
    for (let i = 0; i < numTests; ++i) {
        let n = 10; // Change this to some reasonable size
        let companies = generateInput(n);
        let candidates = generateInput(n);
        let hires = f(companies, candidates);
        
       
          // test('Hires length is correct', function() {
          // assert(companies.length === hires.length);
          // });
          // Write your tests here

         let sortHire = hires.sort(function(x,y){return x.company-y.company});
         let sortH = sortHire.map(function(x){ return x.candidate});
              
            for(let i=0;i<hires.length;++i){
                test("isStable",function(){
                  assert(isStable(i,sortH[i],companies,candidates,sortH));
                })
              }            
      }
    }

    
    oracle(wheat1);
   
    
    
    