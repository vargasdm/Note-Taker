# Note-Taker

## Description

The motivation for this project was to create notes for future reference. For users such as a small business owner that  was looking to digitally write and save notes, so that they can organize their thoughts nd keep track of tasks that they need to complete.

During this project I learned: 
- how to write html and api GET routes
- how to create a wildcard route
- how front end and back end code connect to make a fully functioning app
- the application of middleware
- how to create POST requests
- how to use heroku to deploy applications

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

First, you will need to clone this repository to your local machine. The repository should already contain the package.json file as well as the package-lock.json file. This application requires you to have node.js version 16.18 and you can read how to install the correct version at https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs. This application also requires the third-party packages Express.js, uuid, as well as the fs module that is built into node.js. fs does not need to be installed. The packages can be installed by opening the index.js terminal and entering npm i uuid for the uuid module and npm i express or Express.js. You will be able to check the package.jason file and find the dependencies. Heroku is used to deploy this application, but it can be deployed using any service you choose.

## Usage

This application can be used to write and save notes digitally in order to keep track of the users tasks. The user will be brought to a landing page where they can press the "Get Started" button. They will be taken to a new page where their olld notes will be displayed in the left hand column. When one of the users past notes are clicked, they note will be displayed in entirety in the right column. Here it can be edited and saved again. If the userwould like to create a new note, they can click the plus icon at the top left corner of the webpage and inthe right column will appear empty text areas for the note title and note text. WHen the user is done creating the note, they can press the save icon and the note will be saved and appear in the left column with the other past notes.

The application can be viewed here: https://safe-retreat-29683.herokuapp.com/.

The GitHub Repository can be viewed here: https://github.com/vargasdm/Note-Taker.

## Credits

I followed these links and tutorials in the completion of this project:

- https://www.npmjs.com/package/uuid?activeTab=explore

## License

No licenses were used during this project.
