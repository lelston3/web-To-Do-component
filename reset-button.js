
class ResetButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background-color: #d32f2f;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #b71c1c;
        }
      </style>
      <button>Réinitialiser</button>
    `;
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector('button');
    btn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('reset', {
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('reset-button', ResetButton);
