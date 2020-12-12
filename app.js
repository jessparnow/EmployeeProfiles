const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
  

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function generateTeam() {
   inquirer.prompt([

    {
      type: "input",
      name: "name",
      message: "Team Member Name: ",
    },
    {
      type: "input",
      name: "id",
      message: "What is their ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Add an Email: ",
    },
    {
        type: "list",
        name: "role",
        message: "Who are you adding to your team?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function ({ name, role, id, email }) {
        let teamMemberInput = "";
        if (role === "Engineer") {
          teamMemberInput = "Enter a GitHub username";
        } else if (role === "Intern") {
          teamMemberInput = "Enter a School name";
        } else {
          teamMemberInput = "Enter your Office phone number";
        } 
        inquirer
        .prompt([
          {
            name: "teamMemberInput",
            message: `Role of Team Member ${teamMemberInput}`,
          },
          {
            type: "list",
            name: "addMembers",
            message: "Are there more members of your team?",
            choices: ["yes", "no"],
          },
        ])
        .then(function({ teamMemberInput, addMembers }){
            let teammates;
            if(role === "Intern"){
                teammates = new Intern(name, id, email, teamMemberInput);
            } else if (role === "Engineer") {
                teammates = new Engineer(name, id, email, teamMemberInput);
              } else {
                teammates = new Manager(name, id, email, teamMemberInput);
              }
              employees.push(teammates);
              //.then(function () {
              if (addMembers === "yes") {
                generateTeam();
              } else {
                  console.log(employees)
                fs.writeFile(outputPath, render(employees), (err) => {
                    if (err) {
                        throw err;
                    };
                })
            
            }
        })
    })
    
};
generateTeam();