const helper = () => {

	const slides = document.querySelectorAll('.gallery .item'),
		dotsWrapper = document.querySelector('nav'),
		selectChoice = document.querySelector('#choice'),
		selectNumber = document.querySelector('#number');
	
	// number of slides selector
	for (let i = 1; i <= 5; i++) {
		let optionNumber = document.createElement('option');
		optionNumber.value = +i;
		optionNumber.textContent = +i;
		selectNumber.appendChild(optionNumber);
	}
	// titles of slides and dots selectors
	for (let j = 0; j < slides.length; j++) {
		let optionChoice = document.createElement('option'),
			a = document.createElement('a');

		optionChoice.value = slides[j].id;
		optionChoice.textContent = slides[j].children[0].src ? slides[j].children[0].src.split("/").pop().split(".")[0] : slides[j].children[0].textContent.slice(0, 15);
		selectChoice.appendChild(optionChoice);

		a.href = `#${slides[j].id}`;	
		dotsWrapper.appendChild(a);
	}
}

export default helper;