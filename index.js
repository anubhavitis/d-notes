const gun = Gun({
    peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']
});
const user = gun.user().recall({ sessionStorage: true });


let signup = document.getElementById('sign-up');
let signin = document.getElementById('sign-in');
let addNotes = document.getElementById('notes-form');
let signout = document.getElementById('sign-out');

let password = document.getElementById('password');
let username = document.getElementById('username');

let newMessage = document.getElementById('new-message');

signout.addEventListener('click', function (e) {
    sessionStorage.clear();
    window.location.reload();
});

signup.addEventListener('click', function (e) {
    user.create(username.value, password.value);
});

signin.addEventListener('submit', function (e) {
    e.preventDefault();
    user.auth(username.value, password.value);
});

addNotes.addEventListener('submit', addItem);

function notesItems(say, id) {
    console.log("say", say, "id", id);
    if (!say) { return; }
    let item = document.createElement('div');
    item.classList.add('flex', 'justify-start', 'items-center', 'mb-2', 'gap-2', 'w-full', 'border', 'rounded', 'hover:shadow-lg', 'py-2', 'px-4');

    let li = document.getElementById(id) || document.createElement('li');
    li.id = id;
    li.classList.add('bg-blue-200', 'text-blue-800', 'px-4', 'py-2', 'rounded-md');
    li.textContent = say;

    let del = document.createElement('button');
    del.classList.add('bg-red-400', 'text-white', 'p-2', 'rounded-md', 'hover:bg-red-800');
    del.onclick = function (e) {
        e.preventDefault();
        removeItem(id);

        // create pause for 500ms to let the data sync
        setTimeout(() => {
            buildNotes();
        }, 200);
    }
    del.innerHTML = 'x';

    item.appendChild(del);
    item.appendChild(li);
    document.querySelector('ul').appendChild(item);
}

function buildNotes() {
    console.log("building notes");
    document.querySelector('ul').innerHTML = "";

    // Here once() is attaching callback func of notesItems()
    // so to every node in said, notesItems() will be attached and called while creation
    user.get('said').map().once(notesItems);
}

gun.on('auth', function () {
    console.log("I am getting called");
    signin.style.display = 'none';
    buildNotes();
});

window.onload = function () {
    console.log("hello, world!")
}

function addItem(e) {
    e.preventDefault();
    let val = newMessage.value;
    if (val.trim() === "") {
        newMessage.value = "";
        window.alert("Please enter a message")
        return;
    }

    if (!user.is) { return; }
    user.get('said').set(newMessage.value);
    newMessage.value = "";
}

function removeItem(id) {

    console.log("item to remove:", id);
    let node = user.get('said').get(id);
    console.log("all said:", node);

    // unset should work, but its not working
    // user.get('said').unset(node)

    // moving ahead with marking it null, and filtering it out in UI.
    node.put(null);
    // TODO: find a better way to remove the item
}