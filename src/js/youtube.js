( youtube => {

	if( youtube.length ) {

		const modalBox = document.querySelector('#modal-video');

		[...youtube].forEach( link => {

			const id = link.getAttribute('data-youtube');

			link.addEventListener('click', event => {

				event.preventDefault();

				const iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('allow', 'autoplay');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1');

				modalBox.appendChild(iframe);

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "video"
					}
				});

				window.modal.dispatchEvent(eventModalShow);

			});

		});

	}

})(document.querySelectorAll('[data-youtube]'));