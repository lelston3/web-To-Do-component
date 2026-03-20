
class StatusIndicator extends HTMLElement {
  static get observedAttributes() { return ['status']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: gray;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-family: Arial, sans-serif;
          color: white;
        }
      </style>
      <div class="circle">?</div>
    `;
    this.updateStatus();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'status') {
      this.updateStatus();
    }
  }

  updateStatus() {
    const circle = this.shadowRoot.querySelector('.circle');
    const status = this.getAttribute('status');
    switch (status) {
      case 'success':
        circle.style.backgroundColor = 'green';
        circle.textContent = '✔';
        break;
      case 'error':
        circle.style.backgroundColor = 'red';
        circle.textContent = '✖';
        break;
      case 'warning':
        circle.style.backgroundColor = 'orange';
        circle.textContent = '!';
        break;
      default:
        circle.style.backgroundColor = 'gray';
        circle.textContent = '?';
    }
  }
}

customElements.define('status-indicator', StatusIndicator);
