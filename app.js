const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: "list",
        name: "role",
        message: "What is the role of this employee?",
        choices: ["Manager", "Engineer", "Intern"]
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

const team = [];

function init() {
    inquirer.prompt(questions)
    .then(answers => {

        switch (answers.role) {
            case "Manager":
                let newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                team.push(newManager);
                break;

            case "Engineer":
                let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                team.push(newEngineer);
                break;

            case "Intern":
                let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(newIntern)
                break;
        };

        if (answers.askAgain) {
            init();
        } else {
            const html = render(team);
            writeToFile(html);
        };
    })
    .catch(error => console.log(error));
};

function writeToFile(html) {
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFile(outputPath, html, function (error) {
            if (error) {
                throw error;
            }
            console.log("Successfully generated team.html.")
        });
    } else {
        fs.mkdirSync(OUTPUT_DIR);

        fs.writeFile(outputPath, html, function (error) {
            if (error) {
                throw error;
            }
            console.log("Successfully generated team.html.")
        });
    };
};

init();