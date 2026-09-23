import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function highestExtension(cs: Colleague[]) { 
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}


function addColleague(
  cs: Colleague[],
  name: string,
  department: string,
  email: string,
){

  cs.push({
    name,
    department,
    contact: {
      email,
      extension: highestExtension(cs).contact.extension + 1
    }
  });

  return cs;
}


addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW


function findFriends(
    friends: Friend[],
    matcher: (f: Friend) => boolean
    ) {
        const sorted = friends.filter(matcher);
        const result = sorted.map((f) => ({ name: f.name}));
        return result
    }
console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest( f: Friend, interests : string){
    if (!f.interests){
        f.interests = [];
    }
    f.interests.push(interests);
    return f.interests;
}
console.log(addInterest(friends[1], "Politics"));