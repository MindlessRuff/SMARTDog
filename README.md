# SMARTDog Developer's Guide

Our goal is to create a user friendly way to view GPS coordinates of deployed LoRa devices, a connected GPS module integrated with a LoRa transmitter in addition to a point to point receiver or LoRa gateway is required for full functionality. However, a developer interested in frontend develop can still contribute by changing the react components.

A simple Web Application with a React.js frontend coupled with an Express.js backend.

## Getting Started
### Required Dependencies
Install node.js
https://nodejs.org/en/
### Clone this repository and start the app
```
git clone https://github.com/bveltre/SMARTDog.git
cd smart_dog_app
npm install
npm start
```

### Alternatively, fork this repository and add this master branch to your upstream
If you followed the steps above this process will not work, you must instead use the 'Fork' option and clone from your own GitHub account like so:
```
git clone https://github.com/<your-username>/SMARTDog.git
```
Add the master branch so you can pull the team's latest changes:
```
git remote add upstream https://github.com/bveltre/SMARTDog.git
```

### Workflow steps
Here is a detailed breakdown of an example developer workflow. I will list the terminal commands here, however you can also use the VSCode UI to perform these actions as well.

Pull from upstream/master (brandon's) into your local repository
```
git pull upstream/master
```
Do your work, save files

Commit your work (check-mark) and enter a commit message:
```
git commit -a -m 'Commit message'
```
Note that if you have added any new files you will need to add them manually before committing:
```
git add filename
```
Pull from upstream/master again.
```
git pull upstream/master
```
Resolve any merge conflicts. These will be introduced if files you have modified are different from the master branch changes. You can view the Source Control tab in VSCode to view and accept/merge or discard changes.

After resolving all merge conflicts, Commit (check-mark) again.
```
git commit -a -m 'Commit message'
```
Sync from the menu (the three dots). This will simply pull from your local branch, then push your latest changes there so that your local working copy is the same as your GitHub repository.
```
git push
```

Pull from origin (Your own github) >> master

Go to the master branch github & hit the new pull request button.
