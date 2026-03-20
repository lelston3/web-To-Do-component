class InfoBox extends HTMLElement {
    // 1. Déclare les attributs que le composant doit observer
    static get observedAttributes() {
        return ['title', 'message', 'status'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                .box {
                    border: 2px solid #4CAF50; /* Couleur par défaut */
                    border-radius: 8px;
                    padding: 1rem;
                    background-color: #f9f9f9;
                    font-family: Arial, sans-serif;
                    max-width: 300px;
                    transition: border-color 0.3s ease; /* Pour l'animation de couleur */
                }
                .title {
                    font-weight: bold;
                    color: #2c3e50;
                    font-size: 1.2em;
                }
                .message {
                    margin-top: 0.5em;
                    color: #555;
                }

                /* Styles basés sur le statut */
                .box.success { border-color: #4CAF50; background-color: #e6ffed; }
                .box.error { border-color: #dc3545; background-color: #ffe6e8; }
                .box.warning { border-color: #ffc107; background-color: #fff6e0; }
            </style>
            <div class="box">
                <div class="title"></div>
                <div class="message"></div>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));
        // Les valeurs initiales seront définies par updateContent() dans le connectedCallback
    }

    // 2. Implémente attributeChangedCallback pour réagir aux changements
    attributeChangedCallback(name, oldValue, newValue) {
        // Appelle updateContent chaque fois qu'un attribut observé change
        this.updateContent();
    }

    // 3. Nouvelle méthode pour mettre à jour le contenu et le style
    updateContent() {
        const titleElement = this.shadowRoot.querySelector('.title');
        const messageElement = this.shadowRoot.querySelector('.message');
        const boxElement = this.shadowRoot.querySelector('.box');

        // Met à jour le texte du titre et du message
        titleElement.textContent = this.getAttribute('title') || "Notification"; 
        messageElement.textContent = this.getAttribute('message') || "Message par défaut.";

        // Met à jour la classe CSS de la boîte en fonction du statut
        const status = this.getAttribute('status');
        boxElement.className = 'box'; // Réinitialise les classes
        if (status) {
            boxElement.classList.add(status); // Ajoute la classe de statut (success, error, warning)
        }
    }

    // Assurez-vous que le contenu est mis à jour lors de la connexion initiale du composant
    connectedCallback() {
        this.updateContent();
    }
}

customElements.define('info-box', InfoBox);