const template = document.createElement('template');
template.innerHTML = `
<style>
@import "https://codepen.io/chriscoyier/pen/VqKvZr.css";
</style>
<button>Sup?</button>`;

export default class WhatsUp extends HTMLElement {
  
  connectedCallback() {
    console.log("WhatsUp:Connected Call back.");
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector("button");
    let age = prompt('How old are you?', 100);
    button.addEventListener("click", this.handleClick);
  }
  
  handleClick(e) {
    alert("Sup?");
  }
  
}

