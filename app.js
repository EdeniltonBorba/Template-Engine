const inquirer = require("inquirer");
const fs = require("fs");

const memberQuestions = [
   {
       type: "input",
       name: "name",
       message: "What is the Name of the team member?"
   },

   {
       type: "input",
       name: "name",
       message: "What is the ID of the team member?"
    },

    {
       type: "input",
       name: "E-mail",
       message: "What is the E-mail of the team member?"
    },

    {
       type: "list",
       name: "role",
       message: "What is the role of the team member?",
       choices: ["Manager", "Engineer", "Intern"]
    },

];

const questionManager = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the office number of team member?"
    }
];

const questionEngineer = [
    {
        type: "input",
        name: "github", 
        message: "What is the GitHub username of the team member?"
    }
];

const questionIntern = [
    {
        type: "input",
        name: "school",
        message: "What is the name of the school?"
    }
];

const flag = [
    {
        type: "confirm",
        name: "flag",
        message: "Do you want to add a team member?"
    }
];

const manager;
const intern;
const engineer;
const addNewTeamMember = false;

async function questions() {
    const answers = await inquirer.prompt(memberQuestions);
    if (answers.role === "Manager") {
        manager = await inquirer.prompt(qu)
    }
}
