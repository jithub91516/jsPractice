// Given a state object and an AST of an expression as arguments,
// interpExpression returns the result of the expression (number or boolean)
//interpExpression(state: State, e: Expr): number | boolean
function interpExpression(state, e){
  if (e.kind === 'operator'){
    if (e.op === '+'){
      return interpExpression(state, e.e1) + interpExpression(state, e.e2);
    }
    else if (e.op === '*'){
      return interpExpression(state, e.e1) * interpExpression(state, e.e2);
    }
     else if (e.op === '-'){
       return interpExpression(state, e.e1) - interpExpression(state, e.e2);
    }
    else if (e.op === '/'){
      return interpExpression(state, e.e1) / interpExpression(state, e.e2);
    }
    else if (e.op === '&&'){
      return interpExpression(state, e.e1) && interpExpression(state, e.e2);
    }
    else if (e.op === '||'){
      return interpExpression(state, e.e1) || interpExpression(state, e.e2);
    }
    else if (e.op === '<'){
      return interpExpression(state, e.e1) < interpExpression(state, e.e2);
    }
    else if (e.op === '>'){
      return interpExpression(state, e.e1) > interpExpression(state, e.e2);
    }
    else if (e.op === '==='){
      return interpExpression(state, e.e1) === interpExpression(state, e.e2);
    }
    else {
      assert(false);
    }
  }
  else if (e.kind === 'boolean'){
    return e.value;
  }
  else if (e.kind === 'number'){
    return e.value;
  }
  else if (e.kind === 'variable'){
    return lib220.getProperty(state, e.name).value;
  }
  else {
    assert(false);
  }
}

//interpBlock(state, b): T
function interpBlock(state, b){
  for (let i = 0; i < b.length; ++i){
    state = interpStatement(state, b[i]);
  }
  return state;
}

// The State type is explained further down the document.
// Given a state object and an AST of a statement,
// interpStatement updates the state object and returns nothing
//interpStatement(state: State, p: Stmt): void
function interpStatement(state, s){
  if (s.kind === 'let'){
    let value = interpExpression(state, s.expression);
    lib220.setProperty(state, s.name, value);
    }
  else if (s.kind === 'assignment'){
    let value = interpExpression(state, s.expression);
    lib220.setProperty(state, s.name, value);
  }
  else if (s.kind === 'if'){
    let testValue = interpExpression(state, s.test);
    if(testValue){
      state = interpBlock(state, s.truePart);
    } else {
      state = interpBlock(state, s.falsePart);
    }   
  }
  else if (s.kind === 'while'){
    let iop = {
      kind: 'if',
      test: s.test,
      truePart: s.body.concat(s),
      falsePart: []
    };
    state=interpBlock(state, [iop]);
  }
  else if(s.kind === 'print'){
    let Value = interpExpression(state, s.expression);
    console.log(Value);
  }
  else {
    assert(false);
  }
  return state;
}


// let init = { };
// interpBlock(init, parser.parseProgram("let x = 10; let y = 1+x;").value);


// Given the AST of a program,
// interpProgram returns the final state of the program
//interpProgram(p: Stmt[]): State
function interpProgram(p){
  let init = {};
  return interpBlock(init, p);
}

/*
test("multiplication with a variable", function() {
let r = interpExpression({ x: 10 }, parser.parseExpression("x * 2").value);
assert(r === 20);
});
*/

/*
test("assignment", function() {
let e=parser.parseProgram("let i=0; if(true && false || false && true) {i=100;print(i);}else{while(i<3){print(i);i=i+1;let j=3; while(j<6){print(j);j=j+1;}}}").value
let re = interpProgram(e);
assert(re.i===3&& re.j=== 6);
});
*/

