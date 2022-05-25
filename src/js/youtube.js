( box => {

	if( box ) {

		const link = box.querySelector('a'),
			  video = document.querySelector('#modal-video');

		link.addEventListener('click', event => {

			event.preventDefault();

			const eventModalShow = new CustomEvent("modalShow", {
				detail: {
					selector: "video"
				}
			});

			window.modal.dispatchEvent(eventModalShow);

			video.play();

		});

	}

})(document.querySelector('.in-details__video'));