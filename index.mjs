import inquirer from 'inquirer'
import fs from 'fs/promises'

// questions for the user
let {project_title,description,installation,usage ,license,contributors,tests, github,email} = await inquirer
  .prompt([
    {
     type: 'input',
     name: 'project_title',
     message: 'What is your project title?',
    },
    {
     type: 'input',
     name:'description',
     message: 'Write a description of your project:'
    },
    {
     type: 'list',
     name: 'license',
     message: 'What would you like for your project?',
     choices: ['Mozilla Public License 2.0', 'Apache 2.0 License', 'MIT License', 'ISC License', 'IBM Public License Version 1.0'],
     filter(val) {
       return val.toLowerCase();
     },
    },
    {
     type: 'input',
     name:'installation',
     message: 'What installations dod you need for your project?'
    },
    {
     type: 'input',
     name:'usage',
     message: 'How to use the project?'
    },
    {
     type: 'input',
     message: 'Do you accept new ideas for your project, and how to contribute them?',
     name: 'contributors',
    },
    {
     type: 'input',
     message: 'If applicable, describe any tests written for your project and examples on how to run them:',
     name: 'tests',
    },
    {
     type: 'input',
     message: 'Please enter your gitHub username:',
     name: 'github',
    },
    {
     type: 'input',
     message: 'Please enter your e-mail for contact:',
     name: 'email',
    },
  ])

// template to generate README.md
let readmeText = `
# ${project_title}
  
## Description
  ${description}

## License
  #### Your application will be covered under ${generateLicense(license)} License

## Table of content
  1. [Description](#description) 
  2. [License](#license)
  3. [Installation](#installation)
  4. [Usage](#usage)  
  5. [Contributing](#contributing)
  6. [Tests](#tests)
  7. [Questions](#questions)
 

## Installation
  > ${installation}  

## Usage
  ${usage}

## Contributing
  ${contributors}
  
## Tests  
  ${tests}

## Questions

 ##### To see my other projects [${github}](https://github.com/${github})

 ##### If you have any questions, send me an e-mail: ${email}

`
// checking for the type of license
function generateLicense(license) {
  console.log(license);
  if(license === 'mit license') {
    return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
  }else if(license === 'mozilla public license 2.0') {
    return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
  }else if(license === 'apache 2.0 license') {
    return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
  }else if(license === 'isc license') {
    return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
  }else if(license === 'ibm public license version 1.0') {
    return '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'
  }

  return ''
}

// Generating the new README.md
fs.writeFile('./generator/readmenow.md', readmeText)