( lang => {

	lang.addEventListener('click', event => {

		event.preventDefault();

		document.cookie = 'LANGUAGE=' + lang.textContent + '; path=/';

		setTimeout(()=>location.reload(),100);

	});

})(document.querySelector('.set-lang'));