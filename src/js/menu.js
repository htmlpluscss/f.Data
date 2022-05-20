( windowScroll => {

// btn toggle

	( btn => {

		if(btn) {

			btn.addEventListener('click', () => {

				if( document.body.classList.contains('menu-show') ) {

					document.body.classList.remove('menu-show');
					window.scrollTo(0,windowScroll);

					setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'));

				} else {

					windowScroll = window.pageYOffset;

					document.body.classList.add('menu-show');
					document.body.classList.remove('header-fixed');
					document.documentElement.classList.add('scroll-behavior-off');
					window.scrollTo(0,0);

				}

			});

		}

	})(document.querySelector('.btn-menu-toggle'));


	// menu catalog

	( btns => {

		if(btns.length) {

			Array.from(btns, btn => {

				btn.addEventListener('click', () => {

					if( document.body.classList.contains('menu-catalog-show') ) {

						document.body.classList.remove('menu-catalog-show','menu-show');
						window.scrollTo(0,windowScroll);

						setTimeout( () => document.documentElement.classList.remove('scroll-behavior-off'));

					} else {

						if( document.body.classList.contains('menu-show') === false ) {

							windowScroll = window.pageYOffset;

						}

						document.documentElement.classList.add('scroll-behavior-off');
						document.body.classList.add('menu-catalog-show');

						setTimeout( () => window.scrollTo(0,0));

					}

				});

			});

		}

	})(document.querySelectorAll('.btn-toggle-menu-catalog'));

})(window.pageYOffset);


// menu service

( btns => {

	if(btns.length) {

		const body = document.querySelectorAll('.menu-catalog__body');

		Array.from(btns, btn => {

			btn.addEventListener('click', event => {

				event.preventDefault();

				Array.from(btns, (_btn, index) => {

					_btn.classList.toggle('is-current', _btn === btn);
					body[index].classList.toggle('hide', _btn !== btn);

				});

			});

		});

		// mobile

		const mobileMenu = document.querySelector('.menu-catalog__mobile'),
			  mobileBody = mobileMenu.querySelector('.menu-catalog__mobile-body'),
			  mobileHead = mobileMenu.querySelector('.menu-catalog__mobile-head-name'),
			  mobileBack = mobileMenu.querySelector('.menu-catalog__mobile-btn-back'),
			  mobileHeadDefault = mobileHead.textContent;

		let mobileLevel = null,
			indexBody = null,
			indexLevel1 = null,
			prevLevel1 = null,
			prevLevel2 = null;

		const level0 = () => {

			mobileLevel = 0;
			mobileBack.classList.add('hide');
			mobileHead.textContent = mobileHeadDefault;
			mobileBody.innerHTML = document.querySelector('.menu-catalog__nav').innerHTML;

		}

		const level1 = () => {

			mobileLevel = 1;
			mobileBack.classList.remove('hide');
			mobileHead.textContent = prevLevel1.textContent;

			const html = document.createElement('ul');

			html.insertAdjacentHTML('beforeend', `<li class="menu-catalog__mobile-item"><a href="${prevLevel1.href}">${mobileBody.getAttribute('data-all-item')}</a></li>`);

			Array.from(body[indexBody].querySelectorAll('.menu-catalog__list'), (list,index) => {

				const item = list.querySelectorAll('.menu-catalog__item'),
					  itemClone = item[0].cloneNode(true);

				itemClone.className = 'menu-catalog__mobile-item';
				itemClone.setAttribute('data-index', index);
				html.insertAdjacentElement('beforeend', itemClone);

				if ( item.length > 1 ) {

					itemClone.classList.add('is-parent');

				}

				mobileBody.innerHTML = '';
				mobileBody.insertAdjacentElement('beforeend', html);

			});

		}

		const level2 = () => {

			mobileLevel = 2;
			mobileHead.textContent = prevLevel2.textContent;

			const html = document.createElement('ul');

			Array.from(body[indexBody].querySelectorAll('.menu-catalog__list')[indexLevel1].querySelectorAll('.menu-catalog__item'), item => {

				const itemClone = item.cloneNode(true);
				itemClone.className = 'menu-catalog__mobile-item';
				html.insertAdjacentElement('beforeend', itemClone);

			});

			html.querySelectorAll('.menu-catalog__mobile-item a')[0].textContent = mobileBody.getAttribute('data-all-item');

			mobileBody.innerHTML = '';
			mobileBody.insertAdjacentElement('beforeend', html);

		}

		level0();

		mobileMenu.addEventListener('click', event => {

			const btnLevel1 = event.target.closest('.menu-catalog__nav-btn'),
				  btnLevel2 = event.target.closest('.menu-catalog__mobile-item.is-parent');

			if ( btnLevel1 ) {

				event.preventDefault();

				prevLevel1 = btnLevel1;

				Array.from(mobileBody.querySelectorAll('.menu-catalog__nav-btn'), (item,index) => {

					if ( btnLevel1 === item ) {

						indexBody = index;
						level1();

					}

				});

			}

			if ( btnLevel2 ) {

				event.preventDefault();

				prevLevel2 = btnLevel2;

				indexLevel1 = parseInt( btnLevel2.getAttribute('data-index') );

				level2();

			}

		});

		mobileBack.addEventListener('click', () => mobileLevel === 2 ? level1() : level0());

	}

})(document.querySelectorAll('.menu-catalog__nav-btn'));