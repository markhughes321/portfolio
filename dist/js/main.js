// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type(); // Start typing animation immediately upon instantiation
  }

  type() {
    const currentWordIndex = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentWordIndex].service;

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 3;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true for the next cycle
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      // The word has been deleted
      this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      // Pause before start typing the next word
      typeSpeed = 500;
    }

    // Schedule the next typing iteration
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const request = new XMLHttpRequest();
  request.open('GET', 'words.json', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const words = JSON.parse(request.responseText);
      const wait = txtElement.getAttribute('data-wait');
      // Init TypeWriter
      new TypeWriter(txtElement, words, wait);
    } else {
      console.error('Error loading JSON file');
    }
  };
  request.onerror = function () {
    console.error('Error loading JSON file');
  };
  request.send();
}
