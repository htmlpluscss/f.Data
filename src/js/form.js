( form => {

	const btn = form.querySelector('.form-demo__submit');

	form.addEventListener('submit', event => {

		event.preventDefault();

		btn.disabled = true;

		fetch(form.getAttribute('action'), {
			method: 'POST',
			body: new FormData(form)
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

	});

})(document.querySelector('.form-demo'));