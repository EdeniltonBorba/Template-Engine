const inquirer = require("inquirer");
const fs = require("fs").promises;
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");



var init = [
    {
        type: "List",
        name: "start",
        message: "My team of engineers",
        choices: ["Start", "Quit"]
    }
];

var managerQuestions = [
   {
       type: "input",
       name: "name",
       message: "What's the team manager's name?"
   },

   {
       type: "input",
       name: "id",
       message: "Enter their ID number:"
    },

    {
       type: "input",
       name: "E-mail",
       message: "Enter their E-mail address:"
    },

    {
       type: "input",
       name: "officeNo",
       message: "Enter their Office number:",
      
    },
];

var engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the team member?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the ID of the team member?"
    },

    {
        type: "input",
        name: "E-mail",
        message: "What is the E-mail of the team member?"
    },

    {
        type: "input",
        name: "gitHub",
        message: "What is the GitHub username of the team member?"
    },
];

var internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the team member?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the ID of the team member?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the email of the team member?"
      },
      {
        type: "input",
        name: "school",
        message: "What is the name of the school?"
      }
    
];

var flag = [
    {
        type: "confirm",
        name: "flag",
        message: "Do you want to add a team member?"
    }
];

var role = [
    {
      name: "role",
      type: "list",
      message: "What is the role of the team member that you would like to add?",
      choices: ["Engineer", "Intern"]
    }
];

var manager = [];
var intern = [];
var engineer = [];


async function questions() {
    const answersManager = await inquirer.prompt(managerQuestions);
    manager.push(answersManager);

    while (true) {
        const addNewTeamMember = await inquirer.prompt(flag);
        if (addNewTeamMember.flag === false) {
            break;
        } else {
            let newTeamMember = await inquirer.prompt(role);
            if (newTeamMember.role === "Engineer") {
                answersEngineer = await inquirer.prompt(engineerQuestions);
                engineer.push(answersEngineer);
            } else if (newTeamMember.role === "Intern") {
                answersIntern = await inquirer.prompt(internQuestions);
                intern.push(answersIntern);
            }
        }
    }

    console.log(manager, engineer, intern);
}

questions();



