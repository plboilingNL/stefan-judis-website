const script = document.createElement('script');
script.onload = function() {
  for (let i = 0; i < 10; i++) {
    window.cornify_add();
  }
};
script.src = 'https://www.cornify.com/js/cornify.js';

document.head.appendChild(script);
