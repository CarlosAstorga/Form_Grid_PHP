const form = document.getElementById("form");
const terms = document.getElementById("terms");
const inputs = document.querySelectorAll("input");
const message = document.getElementById("message");
const success = document.getElementById("success");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const exp = {
	username: /^[a-zA-Z0-9\_\-]{7,14}$/,
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	password: /^.{4,12}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telephone: /^\d{7,14}$/,
};

const fields = {
	username: false,
	name: false,
	password: false,
	password2: false,
	email: false,
	telephone: false,
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const { username, name, password, password2, email, telephone } = fields;

	if (
		username &&
		name &&
		password &&
		password2 &&
		email &&
		telephone &&
		terms.checked
	) {
		message.classList.remove("message-active");
		success.classList.add("success-active");
		setTimeout(() => {
			success.classList.remove("success-active");
		}, 3000);

		document.querySelectorAll(".form-group-success").forEach((icono) => {
			icono.classList.remove("form-group-success");
		});

		fetch("register.php", {
			method: "POST",
			body: new FormData(form),
		})
			.then((res) => res.json())
			.then(form.reset())
			.catch((error) => console.log(error));
	} else {
		message.classList.add("message-active");
	}
});

function validate({ target }) {
	const { name, value, type } = target;
	switch (type) {
		case "password":
			if (name == "password2")
				toggle(password.value !== value ? false : true, target);
			if (name == "password") {
				if (value !== password2.value && password2.value !== "") {
					toggle(false, password2);
				} else if (value === password2.value && password2.value !== "") {
					toggle(true, password2);
				}
				toggle(exp[name].test(value), target);
			}
			break;
		case "text":
			toggle(exp[name].test(value), target);
		case "email":
			toggle(exp[name].test(value), target);
			break;
	}
}

function toggle(status, e) {
	const icon = e.nextElementSibling; // input -> icon.
	const group = e.parentNode.parentNode; // input -> input-group -> form-group.
	const p = e.parentNode.nextElementSibling; // input ->input-group - invalid-feedback.
	if (status) {
		icon.classList.add("fa-check-circle");
		icon.classList.remove("fa-times-circle");
		group.classList.add("form-group-success");
		group.classList.remove("form-group-danger");
		p.classList.remove("invalid-feedback-active");
		fields[e.name] = true;
	} else {
		icon.classList.add("fa-times-circle");
		icon.classList.remove("fa-check-circle");
		group.classList.add("form-group-danger");
		group.classList.remove("form-group-success");
		p.classList.add("invalid-feedback-active");
		fields[e.name] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener("keyup", validate);
	input.addEventListener("blur", validate);
});
