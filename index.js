#!/usr/bin/env node
// Shebang line above allows us to run the script as a command line tool

// Dependencies
import * as p from '@clack/prompts';
import { setTimeout } from 'timers/promises';
import color from 'picocolors';

const displayArt = `
███╗   ██╗██╗███████╗███████╗██╗   ██╗
████╗  ██║██║╚══███╔╝╚══███╔╝╚██╗ ██╔╝
██╔██╗ ██║██║  ███╔╝   ███╔╝  ╚████╔╝ 
██║╚██╗██║██║ ███╔╝   ███╔╝    ╚██╔╝  
██║ ╚████║██║███████╗███████╗   ██║   
╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝   ╚═╝                                       
`

let correctTotal = 0;

async function askQuestion(question, answers, correctAnswerIndex) {
    const options = []
    answers.forEach((answer) => {
        options.push({ value: answer, label: answer })
    });

    const answer = await p.select({
        message: question,
        initialValue: '1',
        options: options,
    });

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if (answer === answers[correctAnswerIndex]) {
        correctTotal++;
    }
}

// Question class

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answers = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

async function main() {
    console.clear();

    console.log(displayArt);

    await setTimeout(1000);

    // Intro text
    p.intro(`${color.bgRed(color.black('Welcome to the Nizzy Games!!!'))}`);

    // Questions

    const question1 = new Question(
        "1) Is HTML a language?",
        ["Yes", "No"],
        0,
    );

    const question2 = new Question(
        "2) When was JavaScript Created?",
        ["1940", "2003", "1995", "2010"],
        2,
    );

    const question3 = new Question(
        "3) What is the most popular programming language?",
        ["Python", "JavaScript", "Java", "C"],
        1,
    );

    const question4 = new Question(
        "4) How many programmers are there in the world?",
        ["20 million", "17 million", "12 million", "26 million"],
        3,
    );

    const question5 = new Question(
        "5) Who is the best coding YouTuber?",
        ["FireShip", "Traversy Media", "Web Dev Simplified", "CodeStackr"],
        0,
    );

    const allQuestions = [question1, question2, question3, question4, question5];

    // Ask if the player is ready
    const readyToPlay = await p.select({
        message: "No cheating. 5 questions. Results at the end. Ready to play?",
        initialValue: "Yes",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" }],
    });

    if (readyToPlay === "Yes") {
        // Begin trivia game
        for (const question of allQuestions) {
            await askQuestion(question.question, question.answers, question.correctAnswerIndex);
        }

        // Decide what ending screen to show based on how many questions user answered correctly
        p.outro(`${color.bgMagenta(color.black(`You got ${correctTotal} questions correct!`))}`);

        if (correctTotal === 5) {
            const s = p.spinner();
            s.start("Generating secret message");
            await setTimeout(5000);
            s.stop();
            p.outro(`${color.bgRed(color.black(`The command line is a tool that is ripe for change.`))}`);
        } else {
            const s = p.spinner();
            s.start();
            await setTimeout(3000);
            s.stop();
            p.outro(`${color.bgRed(color.black(`You need 5/5 correct to unlock the secret message. Try again.`))}`);
        }
    } else {
        // Outro text
        p.outro(`${color.bgRed(color.black('Thank you for playing the Nizzy Games :)'))}`);
    }
}

main().catch(console.error);