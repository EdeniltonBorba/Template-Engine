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
       type: "number",
       name: "officeNo",
       message: "Enter their Office number:",
      
    },
];

const employeeQuestions = [
    {
      name: "role",
      message: "Pick their role:",
      type: "list",
      choices: ["Intern", "Engineer"]
    },
    {
      name: "name",
      message: "What's their name?",
      type: "input"
    },
    {
      name: "email",
      message: "Enter their e-mail address:",
      type: "input"
    },
    {
      name: "id",
      message: "Enter their id number:",
      type: "number"
    },
    {
      name: "school",
      message: "Enter their school name:",
      type: "input",
      when: answers => answers.role === "Intern"
    },
    {
      name: "github",
      message: "Enter their GitHub username:",
      type: "input",
      when: answers => answers.role === "Engineer"
    }
  ];
  const addTeamMemberQuestions= {
    name: "addTeamMember",
    message: "Would you like to add a team member?",
    type: "list",
    choices: ["Yes", "No"]
  };

async function start() {
    try {
        let answers = await inquirer.prompt(init);

        if (answers.start === "Start") {
            let team = [];
            answers = await inquirer.prompt(managerQuestions);

            team.push(
                new Manager(answers.name, answers.id, answers.email, answers.office)
            );

            console.log("Team add");

            answers = await inquirer.prompt(addTeamMember_q);

      while (answers.addTeamMember === "Yes") {
        answers = await inquirer.prompt(employee_q);

        if (answers.role === "Intern") {
          team.push(
            new Intern(answers.name, answers.id, answers.email, answers.school)
          );
          console.log("Intern added");
        } else if (answers.role === "Engineer") {
          team.push(
            new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            )
          );
          console.log("Engineer added");
        }
        answers = await inquirer.prompt(addTeamMember_q);
      }
      // generate the html
      let html = await render(team);
      // save it to disk
      await fs.writeFile("./output/index.html", html);
    } else {
      console.log("Bye!");
    }
  } catch (error) {
    console.error(error);
  }
}

function replace(template, employee) {
  const result = template.replace(/{{([a-z]+)}}/gi, (match_full, match) => {
    let replacement = "";
    switch (match) {
      case "role":
        replacement = employee.getRole();
        break;
      case "name":
        replacement = employee.getName();
        break;
      case "id":
        replacement = employee.getId();
        break;
      case "officeNumber":
        replacement = employee.getOfficeNumber();
        break;
      case "school":
        replacement = employee.getSchool();
        break;
      case "github":
        replacement = employee.getGithub();
      case "email":
        replacement = employee.getEmail();
        break;
      default:
        break;
    }
    return replacement;
  });
  return result;
}

async function render(team = []) {
  try {
    const teamHTML = await team
      .map(async employee => {
        const template = await fs.readFile(
          `./templates/${employee.getRole().toLowerCase()}.html`,
          "utf-8"
        );
        return replace(template, employee);
      })
      .reduce(async (prev, curr) => (await prev) + (await curr));

    const main = await fs.readFile("./templates/main.html", "utf-8");

    return main.replace("{{target}}", teamHTML);
  } catch (error) {
    console.error(error);
  }
}

start();

  





/*

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

*/

