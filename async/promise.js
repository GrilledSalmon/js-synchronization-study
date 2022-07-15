'use strict'; // 이게 뭘깡

// Promise a JavaScript object for asynchronous operation.
// 알아야 하는 것
// 1. state -> 프로세스가 기능 수행 중인지, 완료해서 성공했는지, 실패했는지 상태
//  state의 변화 : pending -> fulfilled or rejected
// 2. producer와 consumer의 차이 이해
//  - projucer : 우리가 필요한 데이터를 만드는 애
//  - consumer : 우리가 만든 데이터를 쓰는 애

// 1. Producer - resolve와 reject 두 개의 callback함수를 인자로 받는 callback함수가 인자임.
//  - promise 객체 만드는 순간 안의 콜백함수(executor라 부름) 바로 실행되니 주의
const promise = new Promise((resolve, reject) => {
    // doing some heavy work
    console.log("Doing Something...");
    setTimeout(() => {
        resolve('ellie'); // 성공적으로 마친 경우 resolve함수 호출
        // reject(new Error('no network'));
    }, 2000)
});

// 2. Comsumer: then, catch, finally로 받아올 수 있음
promise
    .then((value) => { // 프로미스 객체가 잘 실행되었다면(resolve가 실행되었냐 기준인 건가?) 실행
        console.log(value);
    })
    .catch((error) => { // then은 똑같은 promise를 리턴하기 때문에 이런 식으로 연달아 작성(등록)할 수 있음(chaining이라고 함)
        console.log(error);
    })
    .finally(() => { // 성공하든 실패하든 어느 상황에나 작동
        console.log("finally");
    })

// 3. Promise Chaning
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

// 이런식으로 연달아 비동기 작업을 동기적으로 처리할 수 있음
fetchNumber
    .then(num => num * 2) // 2 리턴
    .then(num => num * 3) // 6 리턴
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    }) // promise 객체 리턴(다시 서버에 요청 보내는 상황)
    .then(num => console.log(num)); // 5 콘솔 출력


// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('chicken'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => egg`), 1000);
        // setTimeout(() => reject(new Error(`error! ${hen} => egg`)), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => fried`), 1000);
    });

getHen() // 연속으로 비동기 함수를 사용하는 경우
    .then(getEgg)
    .catch(error => {
        return 'bread';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);