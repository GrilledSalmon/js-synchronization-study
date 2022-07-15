// async & await
// clear style of using promise 

// 1. async
async function fetchUser() {
    // do network request in 10 secs...
    return 'ellie';
}

// 위와 아래는 같은 코드!!
// function fetchUser() {
//     // do network request in 10 secs...
//     return new Promise((resolve, reject) => {
//         resolve('ellie');
//     });
// }


// 2. await
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(2000);
    return 'apple';
}

async function getBanana() {
    await delay(1000); // 기다리고 리턴해라
    return 'banana';
}

async function pickFruits() {
    try {
        const apple = await getApple();  // 이렇게 편하게 적을 수 있긴 하지만 병렬처리에 문제가 생긴다.(banana를 받아오는 데 apple이 필요하진 않기 때문에 )
        const banana = await getBanana();
        return `${apple} + ${banana}`;
    } catch (e) { // 에러 처리
        console.log(e);
    }
}

// function pickFruits() {
//     return getApple().then(apple => {
//         return getBanana().then(banana => `${apple} + ${banana}`);
//     });
// } // 유사 콜백 지옥(promise의 단점)

pickFruits().then(console.log);


// 4. Promise의 all API
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])   // 배열에 promise들을 담아주면 담겨 있는 promise들을 병렬적으로 실행시켜 모두 끝날 때까지 기다려줌
        .then(fruits => fruits.join(' ++ '));                // 그리고 결과를 배열에 담아서 리턴해줌        
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()])
        .then(fruit => `${fruit} win!!`);
}
pickOnlyOne().then(console.log);