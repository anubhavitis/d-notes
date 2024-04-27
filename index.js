const gun = Gun({
    peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']
});
const user = gun.user().recall({ sessionStorage: true });

let signup = document.getElementById('sign-up');
let signin = document.getElementById('sign-in');
let said = document.getElementById('said');
let signout = document.getElementById('sign-out');

signout.addEventListener('click', function (e) {
    sessionStorage.clear();
    window.location.reload();
});

signup.addEventListener('click', function (e) {
    user.create(document.getElementById('alias').value, document.getElementById('pass').value);
});

signin.addEventListener('submit', function (e) {
    e.preventDefault();
    user.auth(document.getElementById('alias').value, document.getElementById('pass').value);
});

said.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!user.is) { return; }
    user.get('said').set(document.getElementById('say').value);
    document.getElementById('say').value = "";
});

function UI(say, id) {
    let item = document.createElement('div');
    item.classList.add('flex', 'justify-start', 'items-center', 'mb-2', 'gap-2', 'w-full');

    let li = document.getElementById(id) || document.createElement('li');
    li.id = id;
    li.classList.add('bg-blue-200', 'text-blue-800', 'px-4', 'py-2', 'rounded-md');
    li.textContent = say;

    let del = document.createElement('button');
    del.classList.add('bg-red-400', 'text-white', 'px-2', 'py-1', 'rounded-md', 'hover:bg-red-600');
    del.innerHTML = 'X';

    item.appendChild(del);
    item.appendChild(li);
    document.querySelector('ul').appendChild(item);
}

gun.on('auth', function () {
    signin.style.display = 'none';
    user.get('said').map().once(UI);
});
