const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "list",
        name: "role",
        message: "What is the role of this employee?",
        choices: ["Manager", "Engineer", "Intern"],
    },
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?",
        validate: function (value) {
            var pass = value.match(
                /[\d]/gi
            );
            if (pass) {
                return true;
            }

            return 'Please enter ID in numerals.';
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
        validate: function (value) {
            var pass = value.match(
                // Robert Crog, http://regexlib.com/Search.aspx?k=email&c=-1&m=4&ps=20
                /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/gi
            );
            if (pass) {
                return true;
            }

            return 'Please enter a valid email.';
        }
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        when: function (answers) {
            return (answers.role === "Manager");
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
        when: function (answers) {
            return (answers.role === "Engineer");
        }
    },
    {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
        when: function (answers) {
            return (answers.role === "Intern");
        }
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like to add another employee (just hit enter for YES)?',
        default: true
    }
]

function init() {
    inquirer.prompt(questions).then(answers => {
        if (answers.askAgain) {
            init();
        } else { }
        // choice manager = new Manager()

    })
}

init()

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
// for the provided `render` function to work!```
