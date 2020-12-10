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


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
