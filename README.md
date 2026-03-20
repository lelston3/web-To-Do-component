# 💼 Projet Final : Composant Web Avancé - Gestionnaire de Tâches Enrichi

Ce projet consiste en le développement d'un composant Web personnalisé `<task-manager>`, conçu pour la gestion interactive de listes de tâches. Il démontre non seulement la maîtrise des concepts des Web Components, mais aussi et surtout la **réutilisation concrète de composants développés lors des séances de TP précédentes**.

---

## 🎯 Objectif du Composant

Le composant `<task-manager>` permet aux utilisateurs de :
* **Ajouter de nouvelles tâches** via un champ de saisie dédié.
* **Marquer des tâches comme complétées** (visuellement avec un texte barré).
* **Supprimer des tâches** de la liste.
* **Persister les tâches** dans le stockage local du navigateur (`localStorage`) pour qu'elles soient conservées même après la fermeture de la page.

En plus de ces fonctionnalités, le `<task-manager>` intègre et interagit avec les composants de vos TP :
* **`<info-box>`** : Affiche des messages de feedback à l'utilisateur (confirmation d'ajout, suppression, ou avertissements).
* **`<status-indicator>`** : Représente visuellement l'état global des tâches (tout terminé, en cours, ou pas de tâches).
* **Interaction avec `<reset-button>`** : Le `<task-manager>` écoute un événement global émis par un `<reset-button>` externe pour permettre de vider toutes les tâches.

---

## 🛠️ Choix Techniques et Réutilisation des Composants des TP

### Web Components Standards
* **Composant personnalisé (`<task-manager>`)** : Le composant principal, point d'entrée de la logique métier.
* **Shadow DOM (`mode: 'open'`)** : Utilisé pour encapsuler le style et la structure interne du `<task-manager>`, garantissant l'isolation CSS et structurelle. Les composants `<info-box>` et `<status-indicator>` ont également leur propre Shadow DOM, renforçant cette encapsulation.
* **Slots (`<slot name="header">`, `<slot name="footer">`)** : Le `<task-manager>` expose deux slots nommés pour l'injection dynamique de contenu externe (titre, pied de page), montrant la flexibilité du composant.
* **Propriétés réactives (via Lit)** : La propriété `tasks` est réactive et déclenche un re-rendu automatique à chaque modification.
* **Logique de cycle de vie (`connectedCallback`, `disconnectedCallback`, `updated`)** : Utilisées pour l'initialisation (`localStorage`), la persistance des données et la gestion des abonnements/désabonnements aux événements globaux.

### Composants des TP réutilisés
* **`<info-box>` (Séance 2)** : Importé et utilisé directement dans le `render()` du `<task-manager>`. Sa propriété `message` est dynamiquement mise à jour pour afficher des notifications à l'utilisateur (tâche ajoutée, supprimée, etc.). Son attribut `title` est fixe ici, mais `message` et un nouvel attribut `status` (émulant le statut de `status-indicator` pour un style) sont gérés.
* **`<status-indicator>` (Séance 3)** : Intégré dans le `render()` du `<task-manager>` pour visualiser l'état d'avancement des tâches (succès si toutes terminées, avertissement si en cours, inconnu si vide). Sa propriété `status` est mise à jour dynamiquement par le `task-manager`.
* **`<reset-button>` (Séance 4)** : Placé directement dans le fichier `index.html` (en dehors du `<task-manager>`). Il émet un `CustomEvent` nommé `reset` que le `<task-manager>` écoute via `document.addEventListener('reset', ...)`. Cela illustre une communication inter-composants via des événements globaux, un concept clé de la Séance 4.

### Librairie choisie : Lit
* **Rendu déclaratif (`html` tag function)** : Simplifie la construction de l'interface utilisateur.
* **Propriétés réactives (`static properties`)** : Facilite la gestion de l'état `tasks`, `message`, `messageType`, et `status`.
* **Styles encapsulés (`static styles = css``)** : Permet d'écrire des styles propres au `task-manager`, isolés du reste de la page et des styles des composants intégrés.
* **Gestion des événements (`@click`, `@keydown`)** : Attache facilement les gestionnaires d'événements aux éléments du template.

---

## 🚀 Utilisation

Pour utiliser ce projet :

1.  **Récupérez tous les fichiers JavaScript de vos TP :**
    * `info-box.js`
    * `status-indicator.js`
    * `reset-button.js`
    * Assurez-vous qu'ils sont placés dans le même répertoire que les nouveaux fichiers.
2.  **Clonez le dépôt** ou téléchargez les fichiers `task-manager.js` et `index.html`.
3.  **Placez tous les fichiers `.js` et `.html`** dans le même répertoire.
4.  **Ouvrez `index.html`** dans un navigateur moderne. Il est **fortement recommandé d'utiliser un serveur web local** (par exemple, via l'extension "Live Server" de VS Code ou `python -m http.server`) pour s'assurer que les modules JavaScript (`import ... from './file.js'`) fonctionnent correctement.

Vous verrez une ou plusieurs instances du `<task-manager>` sur la page. Vous pourrez ajouter des tâches, les marquer comme terminées/non terminées, les supprimer, et observer les messages (`<info-box>`) et le statut (`<status-indicator>`) se mettre à jour dynamiquement. Le bouton `<reset-button>` en bas de la page permettra de vider toutes les tâches dans toutes les instances du `task-manager`.

---

## 📚 Apports de la librairie Lit et des Web Components Réutilisés

L'intégration de vos composants des TP dans ce projet final met en lumière des aspects essentiels du développement avec les Web Components :

* **Réutilisabilité Concrète** : Démontre comment des composants indépendants (comme `info-box` ou `status-indicator`) peuvent être facilement importés et utilisés comme des briques de construction dans des composants plus complexes, sans modification de leur code source original.
* **Interoperabilité** : Montre que les Web Components, même s'ils ont leurs propres Shadow DOM et logiques, peuvent communiquer entre eux (par exemple, via des événements personnalisés comme `reset`), formant un système cohérent.
* **Modularité** : Le projet est divisé en petites unités logiques et réutilisables, ce qui facilite la maintenance et l'évolution du code.
* **Encapsulation Renforcée** : Chaque composant garde son propre style et comportement, évitant les conflits globaux de CSS ou de JavaScript.

Lit facilite cette composition en fournissant une syntaxe élégante et performante pour le rendu conditionnel (affichage de `info-box` uniquement quand `message` existe) et la gestion des propriétés, rendant l'intégration des composants tiers encore plus simple.

---

N'hésitez pas si vous avez d'autres questions ou si vous voulez affiner un aspect !
