var name = 'tarun...';
console.log(name);

const person = {
    name: 'tarun',
    age: 25,
    greet () {
        console.log('Hi, I am '+this.name)
    }
};

person.greet()

//object destructing
const printName = ({name, age}) => {
    console.log(name);
}
printName(person);
const copiedPerson = {...person};
console.log(copiedPerson)

const hobbies = ['sports', 'cooking'];
console.log(hobbies.map(o => 'Hobby: '+o))
console.log(hobbies)

const copiedArr = [...hobbies];
console.log(copiedArr);


//rest operator
const toArr = (...args) => {
    return args;
}


console.log(toArr(1,2,3,4,5));

// const fetchData = callback => {
//     setTimeout(()=>{ callback('Done!')}, 1500)
// }

// setTimeout(() => {
//     console.log('timer is done!')
//     fetchData((text)=>{
//         console.log(text)
//     })
// }, 2000);

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(()=>{ resolve('Done!')}, 1500)
    })
    return promise;
    
}
setTimeout(() => {
    console.log('timer is done!')
    fetchData().then((text)=>{
        console.log(text)
        return fetchData();
    })
    .then((text2)=>{
        console.log(text2);
    })
}, 2000);

console.log('hello')
console.log('hi')
