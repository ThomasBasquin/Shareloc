## Sherlock

L'objectif de ce projet est de développer une plateforme permettant de s’échanger des services au sein d’une colocation ou d’une famille. Chaque colocation dispose de son propre espace au sein duquel les membres sont attachés.
Des tâches ou services (tels que débarrasser la table, remplir le lave-vaisselle, faire les courses, ranger le salon, payer une sortie ciné, etc.), ayant chacun un coût exprimé en points, sont saisis dans l’espace de la colocation. Chaque membre de la colocation dispose d’un compte de points. Chaque fois qu’un membre réalise une tâche ou rend un service, il déclare la réalisation en y attachant éventuellement une photo. Une fois cette déclaration validée, le coût associé est crédité à son compte, et débité de manière partagée de celui des autres membres de la colocation qui en ont bénéficié.
A la fin d’une période déterminée (par exemple, un mois ou une semaine), un récapitulatif des services rendus et du solde de chacun des membres est envoyé (ou rendu disponible) à toute la colocation.
Rien n’empêche a priori un utilisateur d’être attaché à plusieurs espaces Colocation. Le compte de points de chaque utilisateur doit donc être maintenu au sein de chaque colocation dont il fait partie.




## Liste des fonctionnalités attendues

Inscription et authentification d’un utilisateur, création et modification de son profil
Création / Gestion d’un espace Colocation
En tant que gestionnaire d’une Colocation
Invitation d’un utilisateur à rejoindre son espace
En tant que membre d’une Colocation
Proposer l’ajout d’un nouveau service pour la colocation (titre, description, nombre de points)
Voter pour ou contre une proposition d’ajout d’un nouveau service
Proposer la suppression d’un service
Voter pour ou contre une proposition de suppression d’un service
Déclarer la réalisation d’un service (service, [photo], bénéficiaires)
En tant que bénéficiaire d’un service rendu :
Valider / Rejeter la déclaration
Consulter la liste des membres de la Colocation ainsi que le solde de leurs points
Un espace d’échange accessible à tous les membres d’une Colocation


## Description des entités
Ceci constitue uniquement une proposition incomplète de quelques entités à utiliser pour ce projet.
Toutes les associations entre les entités ne sont pas matérialisées ici. Des modifications et ajouts peuvent (doivent) évidemment être faits.

### Users
**email** : email (servant également de login) de l'utilisateur <br>
**password** : mot de passe de l’utilisateur <br>
**firstname** : prénom réel de l'utilisateur <br>
**lastname** : nom de famille réel de l'utilisateur <br>

### Colocation
**name** : nom de la colocation <br>

### Service
**title** : titre du service <br>
**description** : petit texte précisant le service <br>
**cost** : nombre de points associé au service <br>

### AchievedService
**from** : utilisateur ayant rendu le service <br>
**to** : utilisateur(s) ayant bénéficié du service <br>
**date** : date à laquelle a été rendu le service <br>
**picture** : photo accompagnant éventuellement la déclaration <br>
**valid** : indique si la déclaration de service fait a été validée ou non <br>
