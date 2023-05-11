
function onFocusInput(input) {
    input.classList.remove('invalid');
}

function onBlurInput(input) {
    if (input.value.trim() === '') {
        input.classList.add('invalid');
    } else {
        input.classList.add('valid');
    }
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const interest = document.getElementById('interest').value;
    const output = document.getElementById('output');
    output.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Username:</strong> ${username}</p><p><strong>Gender:</strong> ${gender}</p><p><strong>Password:</strong> ${password}</p><p><strong>Email:</strong> ${email}</p><p><strong>Address:</strong> ${address}</p><p><strong>Interest:</strong> ${interest}</p>`;
    output.style.display = 'block';
    const form = document.getElementById('signup-form');
    form.reset();
}
