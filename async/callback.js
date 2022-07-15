// 일단 js는 동기적이다!
// hoisting : var, function 등의 선언이 자동으로 제일 위로 올라가는 것
// 동기 : 특정 순서대로 실행되는 것
// 비동기 : 예측할 수 없는 순서로 실행되는 것
// callback함수 : 나중에 다시 불러줘~해서 callback
console.log('1');
setTimeout(() => console.log('hi~?'), 1000) // 이 함수에서 기다리지 않고 다음으로 넘어감
console.log('2');
console.log('3');

// Synchronous callback : 당장 실행되는 callback 함수

function printImmediately(print) {
    print();
}

printImmediately(() => console.log("hello!"));


// Asynchronous callback : 언제 실행될지 알 수 없는 함수
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log("Async Callback"), 2000);


// 콜백 지옥 체험 **
// 로그인 + DB 접근 가정
class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({ name: 'ellie', role: 'admin' });
            } else {
                onError(new Error('no access'));
            }
        }, 1000)
    }
}


const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your pw');
userStorage.loginUser(id, password, user => {
    userStorage.getRoles(
        user,
        userWithRole => {
            alert(
                `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
            );
        },
        error => {
            console.log(error);
        })
},
    error => {
        console.log(error);
    })

 