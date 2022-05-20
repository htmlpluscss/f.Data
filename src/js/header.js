( header => {

	if(header) {

		document.documentElement.style.setProperty('--heightHeader', header.clientHeight + 'px');
		document.documentElement.style.setProperty('--heightHeaderFixed', document.documentElement.style.getPropertyValue('--heightHeader'));

		if (window.innerWidth >= 1250) {

			document.body.classList.add('header-fixed');

		}

		const headerBottom = header.querySelector('.header__bottom'),
			  headerBottomInner = headerBottom.querySelector('.header__flex');

		const productScroll = document.querySelector('.product-scroll'),
			  productForm = document.querySelector('.product__form-buy');

		const footer = document.querySelector('.footer');

		if ( productScroll ) {

			header.insertAdjacentElement('afterend', productScroll);

		}

		window.addEventListener("scroll", () => {

			window.requestAnimationFrame( () => {

				if (window.innerWidth < 1250) {

					if ( window.pageYOffset > document.documentElement.clientHeight ) {

						document.body.classList.add('header-fixed');

					} else {

						document.body.classList.remove('header-fixed');

						document.documentElement.style.setProperty('--heightHeaderFixed', document.documentElement.style.getPropertyValue('--heightHeader'));

					}

					document.documentElement.style.setProperty('--heightHeader', header.clientHeight + 'px');

					// product scroll

					if ( productScroll ) {

						if ( window.innerWidth < 768 ) {

							productScroll.classList.toggle('is-show', footer.getBoundingClientRect().top > document.documentElement.clientHeight);

						} else {

							productScroll.classList.toggle('is-show', footer.getBoundingClientRect().top > document.documentElement.clientHeight && window.pageYOffset > 0 );

						}

					}

				} else {

					const max = headerBottomInner.clientHeight;

					let h = max - window.pageYOffset,
						o = ( max / 2 - window.pageYOffset ) / ( max / 2 );

					if ( h < 0 ) {

						h = 0;

					}

					if ( o < 0 ) {

						o = 0;
						headerBottomInner.classList.add('is-off');

					} else {

						headerBottomInner.classList.remove('is-off');

					}

					headerBottom.style.height = h + 'px';
					headerBottom.style.opacity = o;

					document.documentElement.style.setProperty('--heightHeader', header.clientHeight + 'px');

					// product scroll

					if ( productScroll ) {

						productScroll.classList.toggle('is-show', window.isInViewport(productForm) === false);

					}

				}

			});

		});

	}

})(document.querySelector('.header'));