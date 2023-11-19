# PARADOX ESCAPE GAME MOBILE APPLICATION

Ce projet est réalisé dans le contexte de l'ECF Studi.
Vous trouverez ci-dessous les consignes pour télécharger l'application mobile directement sur votre téléphone ou bien télécharger tout le projet et l'exécuter en local.

****
**Attention : Vous ne pourrez pas vous connecter à l'application si vous n'êtes pas un utilisateur Staff. Dans ce cas vous devrez demander à l'administrateur un accès staff ou bien modifier l'application en local pour la connecter à votre site web local.**
****

# Téléchargement de l'application mobile

1. **Téléchargez le fichier *build.apk* de 2 manières possibles :**
   - Téléchargez seulement le fichier voulu en cliquant dessus puis ***Ctrl+Shift+S*** ou bien **"..."** puis ***Download***
   - Ou bien clônez tout le dépôt Github : `git clone https://github.com/18020777/PEG_MOBILE.git`

2. Copiez le fichier _build.apk_ sur votre téléphone (vous pouvez le renommer comme vous voulez).
3. Cliquez dessus depuis votre explorateur de fichiers Android. Vous devrez avoir autorisé au préalable le téléchargement d'applications ne provenant pas du Play Store.
4. Connectez-vous avec votre identifiant et mot de passe correspondants à un utilisateur **STAFF**

# Manuel d'exécution locale de l'Application Expo Paradox Mobile

## Configuration requise :
1. Node.js et npm doivent être installés sur votre ordinateur.
2. Expo CLI doit être installé globalement. Si ce n'est pas déjà fait, installez-le avec la commande suivante :
   ```
   npm install -g expo-cli
   ```
3. Android Studio et un appareil Android connecté à votre ordinateur.

## Étapes pour Démarrer l'Application Expo Paradox :

1. Téléchargement du Projet depuis Github :
   `git clone https://github.com/18020777/PEG_MOBILE.git`
   
2. Ouvrez une fenêtre de terminal ou une invite de commandes.

3. Accéder au Répertoire du Projet :
     `
     cd chemin/vers/PEG_MOBILE
     `

4. Installez les dépendances : `npm install`

5. Lancez le serveur de développement Expo : `npx expo start`

6. Une fois le serveur démarré, un code QR s'affichera dans le terminal ou dans une nouvelle fenêtre de navigateur.

## Étapes pour Exécuter l'Application sur un Appareil Android :

1. **Installer Expo Go sur Votre Appareil Android :**
   - Accédez au Google Play Store sur votre appareil Android.
   - Recherchez "Expo Go" et installez l'application.

2. **Connecter Votre Appareil :**
   - Connectez votre appareil Android à votre ordinateur à l'aide d'un câble USB.
   - Assurez-vous que votre ordinateur et votre téléphone soient connectés **au même réseau wifi**

3. **Activer le Débogage USB :**
   - Sur votre appareil Android, allez dans Paramètres > Options pour les développeurs (si cela n'est pas visible, allez dans À propos du téléphone > appuyez 7 fois sur "Numéro de build" pour déverrouiller le mode développeur).
   - Activez l'option "Débogage USB".

4. **Connectez-vous avec Expo Go sur Votre Appareil :**
   - Ouvrez Expo Go sur votre appareil Android.
   - Dans l'application Expo Go, appuyez sur "Scanner le Code QR".
   - Utilisez la caméra de votre appareil pour scanner le code QR affiché dans le terminal ou la fenêtre du navigateur.
   - L'application devrait maintenant commencer à se charger sur votre appareil Android. Cela peut prendre un moment en fonction de la vitesse de votre réseau.
   - Une fois chargée, vous pouvez interagir avec l'application Paradox sur votre appareil Android.
