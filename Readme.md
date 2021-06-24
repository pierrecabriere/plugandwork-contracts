# Application d'exemple pour plugandwork/frontend

## Developpement

Vous pouvez lancer l'application en mode développement pour éviter d'avoir à l'installer dans core et à la mettre à jour à chaque modification.
En mode dev, le live reload est activé mais il n'y a pas le contexte des vues qui est rendu par core.
Core-ui a besoin de connaitre le point d'api sur lequel exécuter les requetes. Par défaut, celui-ci est http://localhost:3000. Cependant, si vous lancez core sur
une autre adresse, il vous faudra modifier la constante REACT_APP_PAW_HOST dans `scripts.dev` du fichier package.json.

### Lancer le serveur de développement

```
npm install
npm run dev
```

## Publier l'application

Pour installer l'application sur core, celle-ci doit etre publiée sur le store de npm.
Avant de publier votre application, vérifiez que tout fonctionne car cette étape *correspond à la mise en production*.

```
npm install
npm run build
npm publish
```

## Resources

- *UX inspiration* : http://skote-v-light.react.themesbrand.com/dashboard
- *UI kit* : https://tailwindcss.com
- *Icones* : https://fontawesome.com/v5.15/icons?d=gallery&p=1