# 📘 Guide de Survie Git & Workflow - Instant Weather

Ce guide récapitule toutes les commandes et bonnes pratiques pour gérer ton projet proprement sur GitHub et éviter les erreurs courantes.

---

## 🚀 Le Workflow Standard (La Méthode Propre)

Pour ne jamais perdre de code et éviter les conflits, suis toujours ce cycle de travail :

### 1. Préparation (Avant de coder)
Toujours s'assurer d'avoir la dernière version du code avant de commencer une nouvelle tâche.
* `git checkout main` : Se placer sur la branche principale.
* `git pull origin main` : Télécharger les dernières modifications de GitHub.
* `git checkout -b nom-de-ta-branche` : Créer une branche spécifique (ex: `feature/resultats`).

### 2. Sauvegarde (Pendant le travail)
Fais des commits réguliers pour enregistrer tes étapes.
* `git status` : Vérifier quels fichiers ont été modifiés.
* `git add .` : Préparer tous les fichiers pour l'enregistrement.
* `git commit -m "Message décrivant ton changement"` : Sauvegarder localement.
    * *Note : N'oublie jamais le `-m` pour ne pas rester bloqué dans l'éditeur Vim.*

### 3. Partage (Fin de tâche)
Envoyer ton travail sur GitHub pour le valider.
* `git push -u origin nom-de-ta-branche` : Envoyer la branche sur GitHub (seulement la 1ère fois).
* **Sur GitHub** : Faire une "Pull Request", la vérifier, puis cliquer sur "Merge".

### 4. Finalisation (Nettoyage)
Une fois fusionné, synchronise ton ordinateur.
* `git checkout main` : Revenir sur le main.
* `git pull origin main` : Récupérer ton travail fusionné.

---

## 🛠️ Guide de Secours (En cas de pépin)

### 🚪 Sortir de l'éditeur Vim
Si l'écran devient noir avec des messages bleus (oubli du `-m`) :
1. Appuie sur la touche **Échap**.
2. Tape **`:wq`** (pour *Write & Quit*).
3. Appuie sur **Entrée**.

### 👻 Supprimer un "Sous-Module" (Dossier avec flèche `->`)
Si GitHub Pages plante à cause d'un dossier fantôme :
1. `git rm --cached nom-du-dossier` : Enlève la référence de la mémoire.
2. `git add .`
3. `git commit -m "Suppression du sous-module"`
4. `git push origin ta-branche`

### ↩️ Annuler un Commit
* **Annuler sans perdre le code** : `git reset --soft HEAD~1` (ton code reste dans l'éditeur).
* **Tout annuler (Attention !)** : `git reset --hard HEAD~1` (ton code revient à l'état précédent, tu perds tes modifs non sauvegardées).

---

## 💡 Les Règles d'Or
1. **Un seul `git init`** : Uniquement à la racine de ton projet (ex: dossier `Instant Weather`). Ne le fais jamais dans les sous-dossiers.
2. **Commit souvent** : Il vaut mieux faire 10 petits commits clairs qu'un seul énorme commit illisible.
3. **Pull avant de Push** : Télécharge toujours les nouveautés (`git pull`) avant d'envoyer les tiennes pour éviter les conflits.
4. **Utilise des branches** : Garde ton `main` toujours fonctionnel. Fais tes tests sur des branches séparées.

---

## 📋 Commandes Utiles en Vrac
* `git branch` : Liste tes branches locales.
* `git log --oneline` : Affiche l'historique de tes commits de façon compacte.
* `git remote -v` : Vérifie vers quel dépôt GitHub ton projet est envoyé.