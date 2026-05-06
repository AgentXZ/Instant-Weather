# Instant Weather

Projet de travail collaboratif avec GitHub.

## Workflow rapide

```bash
git checkout main
git pull origin main
git checkout -b feature/ma-tache
git add .
git commit -m "feat: description courte"
git push -u origin feature/ma-tache
gh pr create --base main --head feature/ma-tache --title "feat: ..." --body "Resume, test, contexte"
```

## Rappels

- Ne pousse pas directement sur `main`.
- Une branche par personne ou par sujet.
- Une pull request par modification importante.
- Relis toujours avant de merger.
