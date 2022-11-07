import fs from 'fs';
import takeFile from './index.js';
import chalk from 'chalk';

const path = process.argv;

async function textProcess(args){
    const path = args[2];

    try{
        fs.lstatSync(path);
    } catch(error) {
        handlesError(error);
    }

    if(fs.lstatSync(path).isFile()){
        const result = await takeFile(path);
        printList(result);
    }
    else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        
        files.forEach(async (file) => {
            const results = await takeFile(`${path}/${file}`);
            printList(results, file);
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

function printList(result, id = ""){
    console.log(
        chalk.yellow(id),
        result
    );
}
textProcess(path);

