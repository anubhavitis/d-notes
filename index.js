const gun = Gun({
    peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']
});
const user = gun.user().recall({ sessionStorage: true });

document.getElementById('up').addEventListener('click', function (e) {
    user.create(document.getElementById('alias').value, document.getElementById('pass').value);
});

document.getElementById('sign').addEventListener('submit', function (e) {
    e.preventDefault();
    user.auth(document.getElementById('alias').value, document.getElementById('pass').value);
});

document.getElementById('said').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!user.is) { return; }
    user.get('said').set(document.getElementById('say').value);
    document.getElementById('say').value = "";
});

function UI(say, id) {
    let li = document.getElementById(id) || document.createElement('li');
    li.id = id;
    li.classList.add('bg-blue-200', 'text-blue-800', 'px-4', 'py-2', 'rounded-md');
    li.textContent = say;
    document.querySelector('ul').appendChild(li);
}

gun.on('auth', function () {
    document.getElementById('sign').style.display = 'none';
    user.get('said').map().once(UI);
});