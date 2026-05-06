# Contributing Guide

Merci de contribuer au projet.

## Workflow recommandé

1. Crée une branche dédiée à ta tâche.
2. Fais tes modifications sur cette branche, pas sur `main`.
3. Commits petits et descriptifs.
4. Pousse la branche sur GitHub.
5. Ouvre une pull request vers `main`.
6. Attends la revue et les checks CI avant de fusionner.

## Commandes utiles

```bash
git checkout -b feature/ma-fonction
git add .
git commit -m "feat: description courte"
git push -u origin feature/ma-fonction
gh pr create --base main --head feature/ma-fonction --title "feat: ..." --body "Description et tests"
```

## Règles simples

- Ne pousse pas directement sur `main`.
- Garde les pull requests petites et faciles à relire.
- Décris toujours ce qui a été changé et comment tester.
- Si tu corriges un bug urgent, utilise une branche `hotfix/`.

## Avant de créer une PR

- Vérifie que le code fonctionne localement.
- Relis les changements.
- Mets à jour la branche avec `git pull --rebase` si nécessaire.
