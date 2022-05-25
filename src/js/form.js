( form => {

	//reCaptcha v3

	const PUBLIC_KEY = '6Ldn0xggAAAAACSTXfTaJ7OTzBGlUwaB2sak2SKI';

	const reCaptcha = () => {

		form.removeEventListener('input', reCaptcha);

		const script = document.createElement('script');

		script.async = true;
		script.src = 'https://www.google.com/recaptcha/api.js?render=' + PUBLIC_KEY;

		document.head.appendChild(script);

	}

	form.addEventListener('input', reCaptcha);

	const submit = (form, token = false) => {

		const btn = form.querySelector('.form-demo__submit');
		const formData = new FormData(form);

		formData.append('g_recaptcha_response', token);

		btn.disabled = true;

		fetch(form.getAttribute('action'), {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(result => {

			console.log(result);

			btn.disabled = false;

			form.reset();

			window.modal.dispatchEvent(new CustomEvent("modalShow", {
				detail: {
					selector: "ok"
				}
			}));

		});

	};

	form.addEventListener('submit', event => {

		event.preventDefault();

		if (typeof(grecaptcha) === 'undefined') {

			alert('Ошибка отправки! Google reCaptcha не загрузилась, пожалуйста сообщите администратору.');
			submit(form);

		} else {

			grecaptcha.ready( () => {

				grecaptcha.execute(PUBLIC_KEY).then( token => {

					submit(form, token);

				});

			});

		}

	});

})(document.querySelector('.form-demo'));