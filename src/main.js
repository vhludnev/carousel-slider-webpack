import './css/style.css';

import helper from './js/helper';
import showSlider from './js/slider';


window.addEventListener("DOMContentLoaded", () => {
	helper()
});

window.addEventListener('load', () => {
	showSlider('.gallery')
});