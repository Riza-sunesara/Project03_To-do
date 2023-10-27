#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,2000);
    })
}
let tasklist:string[]=["Write my diary at night","Take medicines"];


let todo_list=async () => {
    
let taskChoice=await inquirer.prompt([
    {
        name:"tasks",
        message:"Choose what to do in the To-Do List: ",
        type:"list",
        choices:["Add a new task","Mark as complete","Remove Task","Close"]
    }
])

if(taskChoice.tasks=="Add a new task"){
    
    do {
        let addtask=await inquirer.prompt([
            {
                name:"add",
                message:"Enter the task to be added in the To-Do List: ",
                type:"string"
            }
        ])
        tasklist.push(addtask.add);
        var rep=await inquirer.prompt({
            type:"input",
            name:"again",
            message:chalk.yellow("                      Enter another task? Press Y for Yes: ")
        })
    } while (rep.again =='Y'||rep.again =='y');
    
    for (let i = 0; i < tasklist.length; i++) {
        console.log(`${i}. ${tasklist[i]}\n`);
    }
    todo_list();
}
else if(taskChoice.tasks=="Mark as complete"){

    let edittask=await inquirer.prompt([
        {
            name:"edit",
            message:"Enter the number of task to be marked completed in the To-Do List: ",
            type:"list",
            choices:tasklist
        }
    ])

    for (let i = 0; i < tasklist.length; i++) {
        if(tasklist[i]===edittask.edit){
            tasklist[i]=chalk.green(tasklist[i]);
        }   
    }
    todo_list();
}
else if(taskChoice.tasks=="Remove Task"){
    let removetask=await inquirer.prompt([
        {
            name:"remove",
            message:"choose the completed task to be removed from the To-Do List: ",
            type:"list",
            choices:tasklist
        }
    ])

    for (let i = tasklist.indexOf(removetask.remove); i < tasklist.length; i++) {
        if(tasklist[i]==removetask.remove){
            tasklist[i]="";
            for (let j = i; j < tasklist.length; j++) {
                tasklist[j] = tasklist[j + 1];
            }
            tasklist.pop();
            for (let i = 0; i < tasklist.length; i++) {
                console.log(`${i}. ${tasklist[i]}\n`);
            }
            todo_list();
            break;
        }
        else{
            console.log("Couldn't Find the task");
            todo_list();
        }
    }
}
else if(taskChoice.tasks=="Close"){
    for (let i = 0; i < tasklist.length; i++) {
        console.log(`${i}. ${tasklist[i]}\n`);
    }
    let exit=chalkAnimation.rainbow("                               Closing...");
    await sleep();
    exit.stop();
}
else{
    console.log(chalk.red.bold("                 Please choose from given options"));
}
}
todo_list();