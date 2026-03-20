import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0?module';

import './info-box.js';
import './status-indicator.js';
import './reset-button.js'; // Assurez-vous que reset-button.js est importé ici aussi si vous ne l'importez pas dans index.html

class TaskManager extends LitElement {
    static properties = {
        tasks: { type: Array },
        message: { type: String },
        messageType: { type: String } // 'success', 'error', 'warning' pour info-box
    };

    static styles = css`
        :host {
            display: block;
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fefefe;
        }

        h2 {
            color: #333;
            text-align: center;
            margin-bottom: 25px;
        }

        .task-input-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .task-input-container input[type="text"] {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
        }

        .task-input-container button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }

        .task-input-container button:hover {
            background-color: #45a049;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: 4px;
            margin-bottom: 10px;
            padding: 12px 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }

        li:hover {
            background-color: #f9f9f9;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .task-text {
            flex-grow: 1;
            font-size: 1.1rem;
            color: #555;
            text-decoration: none;
            transition: text-decoration 0.3s ease;
        }

        .task-text.completed {
            text-decoration: line-through;
            color: #888;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .actions button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background-color 0.3s ease;
        }

        .actions button.delete {
            background-color: #dc3545;
        }

        .actions button:hover {
            opacity: 0.9;
        }

        .actions button.delete:hover {
            background-color: #c82333;
        }

        slot[name="header"]::slotted(h3) {
            color: #0056b3;
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: 15px;
        }

        slot[name="footer"]::slotted(p) {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #777;
        }

        info-box {
            margin-bottom: 15px;
        }
        .status-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 10px;
            gap: 10px;
        }
        .status-label {
            font-size: 0.9rem;
            color: #666;
        }
    `;

    constructor() {
        super();
        this.tasks = [];
        this.nextTaskId = 1;
        this.message = '';
        this.messageType = ''; // 'success', 'error', 'warning'
        this.status = 'unknown'; // Initialise le statut de l'indicateur
    }

    connectedCallback() {
        super.connectedCallback();
        // Écoute l'événement 'reset' du bouton global de réinitialisation (Séance 4)
        document.addEventListener('reset', this._handleResetTasks.bind(this));
        // Met à jour l'indicateur au démarrage (il sera 'unknown' ou 'warning' si des tâches sont ajoutées)
        this._updateStatusIndicator();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('reset', this._handleResetTasks.bind(this));
    }

    updated(changedProperties) {
        if (changedProperties.has('tasks')) {
            this._updateStatusIndicator();
        }
        // Pour les messages, on peut les effacer après un certain temps
        if (changedProperties.has('message') && this.message) {
            setTimeout(() => {
                this.message = '';
                this.messageType = '';
            }, 3000); // Le message disparaît après 3 secondes
        }
    }

    _addTask() {
        const input = this.shadowRoot.querySelector('#newTaskInput');
        const taskText = input.value.trim();

        if (taskText) {
            this.tasks = [
                ...this.tasks,
                { id: this.nextTaskId++, text: taskText, completed: false }
            ];
            input.value = '';
            this.message = 'Tâche ajoutée avec succès !';
            this.messageType = 'success';
        } else {
            this.message = 'Veuillez saisir une tâche à ajouter.';
            this.messageType = 'warning';
        }
    }

    _toggleTaskCompletion(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.message = `Tâche ${this.tasks.find(t => t.id === id).completed ? 'terminée' : 'remise en attente'}.`;
        this.messageType = 'success';
    }

    _deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.message = 'Tâche supprimée.';
        this.messageType = 'error';
    }

    _handleResetTasks() {
        this.tasks = [];
        this.message = 'Toutes les tâches ont été réinitialisées !';
        this.messageType = 'warning';
    }

    _updateStatusIndicator() {
        const allCompleted = this.tasks.length > 0 && this.tasks.every(task => task.completed);
        const hasTasks = this.tasks.length > 0;

        if (allCompleted) {
            this.status = 'success'; // Toutes terminées
        } else if (hasTasks) {
            this.status = 'warning'; // Certaines en attente
        } else {
            this.status = 'unknown'; // Aucune tâche
        }
    }

    render() {
        return html`
            <slot name="header"></slot>

            ${this.message ? html`<info-box title="Notification" message="${this.message}" status="${this.messageType}"></info-box>` : ''}

            <div class="task-input-container">
                <input type="text" id="newTaskInput" placeholder="Ajouter une nouvelle tâche..." @keydown=${(e) => { if (e.key === 'Enter') this._addTask(); }}>
                <button @click=${this._addTask}>Ajouter</button>
            </div>

            <ul>
                ${this.tasks.length === 0 ? html`<li>Aucune tâche pour le moment.</li>` : ''}
                ${this.tasks.map(task => html`
                    <li>
                        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                        <div class="actions">
                            <button @click=${() => this._toggleTaskCompletion(task.id)}>
                                ${task.completed ? 'Annuler' : 'Terminer'}
                            </button>
                            <button class="delete" @click=${() => this._deleteTask(task.id)}>Supprimer</button>
                        </div>
                    </li>
                `)}
            </ul>

            <div class="status-container">
                <span class="status-label">Statut des tâches :</span>
                <status-indicator status="${this.status}"></status-indicator>
            </div>

            <slot name="footer"></slot>
        `;
    }
}

customElements.define('task-manager', TaskManager);