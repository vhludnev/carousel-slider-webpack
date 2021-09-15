const showSlider = (wrapper, slides = 1, infinite = true) => {
	const gallery = document.querySelector(wrapper),
		nav = document.querySelector('.slider nav'),
		buttons = document.querySelector('.slider .buttons'),
		selectors = document.querySelector('.slider .selectors'),
		button = selectors.querySelector('button'),
		prev = buttons.querySelector('.prev'),
		next = buttons.querySelector('.next'),
		selectItem = document.querySelector('#choice'),
		selectNumber = document.querySelector('#number');
		
		let lastscroll;

		const changeStyles = (slides) => {			
			const block = document.querySelectorAll('.item');
			block.forEach(el => el.style.minWidth = `${100/slides}%`);
			if(slides > 1) {	
				nav.style.display = 'none';
				selectors.style.display = 'none';
				prev.style.display = 'none';
			} else {
				nav.style.display = 'block';
				selectors.style.display = 'flex';
				prev.style.display = 'block';
			}
		}


		// sorting slides
		const updateSort = () => {
			let scrollWidth = gallery.scrollWidth,
				scrollLeft = gallery.scrollLeft,
				width = gallery.offsetWidth,
				items = gallery.children;
		
			if (scrollLeft <= width) {
				gallery.prepend(items[items.length - 1]);
				gallery.scrollLeft = scrollLeft + width;
			} 
			
			if (scrollWidth - scrollLeft <= width) {
				gallery.append(items[0]);
				gallery.scrollLeft = scrollLeft - width;
			} 
		};

		// scroll after prev/next click
		const scrollToSlide = (event, p) => {			
			if (!event.detail || event.detail == 1) { // prevents from dbl clicks
				gallery.scrollLeft += p/slides;
			}
		};

		// reset gallery function
		const sortChildren = (parent) => {
			const comparator = (a, b) => +a.id.match( /\d+/ ) - +b.id.match( /\d+/ );
			parent.replaceChildren(...Array.from(parent.children).sort(comparator));
		}

		//scroll event
		gallery.addEventListener('scroll', () => {	
			if (infinite) {
				if (lastscroll) {
					clearTimeout(lastscroll);				
				}
				lastscroll = setTimeout(() =>  updateSort(), 50);
			}
		});

		// events for prev/next arrows
		let p = gallery.offsetWidth;
		prev.addEventListener('click', (event) => scrollToSlide(event, -p));
		next.addEventListener('click', (event) => scrollToSlide(event, p));

		// titles of slides selector
		selectItem.addEventListener('change', ()=> {
			let choice = selectItem.selectedIndex;
			let matchingItem = gallery.querySelector(`#${selectItem.options[choice].value}`);
			gallery.scrollTo({
				left: matchingItem.offsetLeft,
				behavior: 'smooth'
			});
		});

		document.querySelector('#infinity').addEventListener('click', (e)=> {
			e.preventDefault()			
			if (!button.classList.contains('noloop')) {
				infinite = false;
				sortChildren(gallery);
				button.classList.add('noloop')			
			} else {
				button.classList.remove('noloop')
				infinite = true;
				updateSort()
				prev.style.display = 'block';
				next.style.display = 'block';
			}
		})

		// select for number of slides on a page
		selectNumber.addEventListener('change', ()=> {
			let choice = selectNumber.selectedIndex;
			slides = +selectNumber.options[choice].value;
			infinite = false;
			if(slides === 1) {				
				infinite = true; 
				updateSort();
				button.classList.remove('noloop')
			} 
			sortChildren(gallery);
			changeStyles(slides)
		});

	// Intersection Observer config
	const items = [...gallery.querySelectorAll('li')];  /* Array.from(document.querySelectorAll("span")); */
	const dots = nav.querySelectorAll('a');  /* Array.from(document.querySelectorAll("nav a")); */
	const observer = new IntersectionObserver(onIntersectionObserved, {
		root: gallery,
		threshold: 0.9
	});
	
	function onIntersectionObserved(entries) {
		entries.forEach(entry => {
			// On page load, firefox claims item with index 1 isIntersecting, while intersectionRatio is 0
			if (entry.isIntersecting && entry.intersectionRatio >= 0) {
				const intersectingIndex = items.indexOf(entry.target);	
				activateIndicator(intersectingIndex);
			}
		});
	}
	
	function activateIndicator(index) {
		let idx = index;
		let choice = selectItem.selectedIndex;

		items[idx].children[0].src ? selectItem.options[choice].textContent = items[idx].children[0].src.split("/").pop().split(".")[0] : selectItem.options[choice].textContent = items[idx].children[0].textContent.slice(0, 15);
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === idx);
		});

		if(!infinite) {
			items[idx] == items[0] ? prev.style.display = 'none' : prev.style.display = 'block';
			items[idx] == items[items.length-1] ? next.style.display = 'none' : next.style.display = 'block';
		} 		
		else {
			prev.style.display = 'block';
			next.style.display = 'block';
		}
	}
	
	items.forEach(item => observer.observe(item));
	
	dots.forEach((dot, i) =>
		dot.addEventListener("click", () => {
			setTimeout(()=> window.history.replaceState(null, null, ' '),0);
			items[i].scrollIntoView({
				inline: "center",
				behavior: "smooth"
			})
		})
	);
	
	infinite ? updateSort() : null;
}

export default showSlider; 