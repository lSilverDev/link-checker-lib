import fs from 'fs';
import chalk from 'chalk';
import takeFile from './index.js';
import listValidated from './http-validation.js';

const path = process.argv;

async function textProcess(args){
    const path = args[2];
    const validates = args[3] === '--validate';

    try{
        fs.lstatSync(path);
    } catch(error) {
        handlesError(error);
    }

    if(fs.lstatSync(path).isFile()){
        const result = await takeFile(path);
        printList(validates, result);
    }
    else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        
        files.forEach(async (file) => {
            const results = await takeFile(`${path}/${file}`);
            printList(validates, results, file);
        });
    }
}

function handlesError(error){
    if(error.code === 'ENOENT'){
        printList("File or directory dont exist!", "ERROR: ");
        return;
    }
    else {
        throw new Error(chalk.red(error.code));
    }
}

async function printList(valida, result, id = ""){
    if(valida){
        console.log(
            chalk.yellow("Validated List: "),
            chalk.yellow(id),
            await listValidated(result)
        );
    } else {
        console.log(
            chalk.yellow(id),
            result
        );
    }
}

textProcess(path);
//To exec just run : npm run cli '<path>' || node src/cli ./files/ --validate

