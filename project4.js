let data = lib220.loadJSONFromURL(
 'https://people.cs.umass.edu/~joydeepb/yelp.json');

class FluentRestaurants {
  constructor(data){
    this.data = data;
  }

  fromState(state){
    let arr = this.data.filter(function(x){if(x.state===state){return true;}return false;}); 
    return new FluentRestaurants(arr);
  }

  ratingLeq(rating1){
    let arr = this.data.filter(function(x){if(x.stars<=rating1){return true;}return false;});
    return new FluentRestaurants(arr);
  }

  ratingGeq(rating2){
    let arr = this.data.filter(function(x){if(x.stars>=rating2){return true;}return false;});
    return new FluentRestaurants(arr);
  }

  category(categoryStr){
    let arr = this.data.filter(function(x){if(x.categories.includes(categoryStr)){return true;}return false;});
    return new FluentRestaurants(arr);
  }

  hasAmbience(ambienceStr){
      let arr = this.data.filter(function(x){
        let iop = x.attributes;
        if(lib220.getProperty(iop, 'Ambience').found === true){
          let qwe = iop.Ambience;
          if(lib220.getProperty(qwe, ambienceStr).found === true){
             if(lib220.getProperty(qwe, ambienceStr).value === true){
              return true;
            }
          }
        }else{
          return false;
      }
    });
    return new FluentRestaurants(arr);
  }
  bestPlace(){
    let bbb = this.data.sort(function(x,y){
  if(lib220.getProperty(x,'stars').found === true && lib220.getProperty(x,'stars').value !== lib220.getProperty(y,'stars').value) 
    {return y.stars - x.stars;}
  else if(lib220.getProperty(x,'review_count').found === true && lib220.getProperty(x,'stars').value === lib220.getProperty(y,'stars').value) 
    {return y.review_count - x.review_count;}
  else if(lib220.getProperty(x,'stars').value === lib220.getProperty(y,'stars').value && lib220.getProperty(x,'review_count').value === lib220.getProperty(y,'review_count').value)
    {return x;}
  else if(lib220.getProperty(x,'stars').found !== true && lib220.getProperty(x,'review_count').found !== true)
    {return undefined;}
});
let qwe = bbb[0]; 

      
               
    
return qwe;
    
   
  }
}
let f = new FluentRestaurants(data);

f.ratingLeq(5)
 .ratingGeq(3)
 .category('Restaurants')
 .hasAmbience('casual')
 .fromState('NV')
 .bestPlace().name;

f.ratingLeq(4)
 .ratingGeq(2)
 .category('Restaurants')
 .hasAmbience('romantic')
 .fromState('AZ')
 .bestPlace().name;

  
const testData = [
 {
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 }
]

test("Usage for getProperty", function() {
let obj = { x: 42, y: "hello"};
assert(lib220.getProperty(obj, 'x').found === true);
assert(lib220.getProperty(obj, 'x').value === 42);
assert(lib220.getProperty(obj, 'y').value === "hello");
assert(lib220.getProperty(obj, 'q').found === false);
});

test('fromState filters correctly', function() {
let tObj = new FluentRestaurants(testData);
let list = tObj.fromState('NC').data;
assert(list.length === 3);
assert(list[0].name === "Applebee's");
assert(list[1].name === "China Garden");
assert(list[2].name === "Alpaul Automobile Wash");
});

test('bestPlace tie-breaking', function() {
let tObj = new FluentRestaurants(testData);
let place = tObj.fromState('NC').bestPlace();
assert(place.name === 'China Garden');
});
