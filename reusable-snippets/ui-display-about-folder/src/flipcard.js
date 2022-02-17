var templateName = 'flipcard';
export default class FlipCard extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
     /*called when the element is connected to the page.
      This can be called multiple times during the element's lifecycle.
      for example when using drag&drop to move elements around
     */
    connectedCallback() {
        this.render();        
    }

    render() {
        console.log("-->Rendering: begin :"+ this.nodeName);
        const {shadowRoot} = this;
        console.log("-->-->Rendering started for the component.");

        const {cssContent, htmlContent} = this.htmlToElement(templateName);    
        //attaching to the dom
        //  this.appendChild(clone)
        //attaching to the shadow dom
        shadowRoot.innerHTML = '';
        console.log("-->-->Appending css content:"+cssContent);
        shadowRoot.appendChild(cssContent)
        console.log("-->-->Appending html content:"+htmlContent);        
        shadowRoot.appendChild(htmlContent);        
        console.log("-->Rendering: Done for the component with below innerHtml:\n"+shadowRoot.innerHTML);
    }


    htmlToElement(templateName) {
       var template = document.createElement('template');
       var html = document.getElementById(templateName).innerHTML;
       html = html.trim(); // Never return a text node of whitespace as the result
       template.innerHTML = html;       
       return { cssContent : template.content.firstChild, htmlContent: template.content.lastChild };
    }
}