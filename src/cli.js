import fs from 'fs';
import takeFile from './index.js';
import chalk from 'chalk';

const path = process.argv;

function printList(result){
    console.log(chalk.yellow('Link list: '), result);
}

async function textProcess(args){
    const path = args[2];

    if(fs.lstatSync(path).isFile()){
        const result = await takeFile(path);
        printList(result);
    }
    else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        
        files.forEach(async (file) => {
            const results = await takeFile(`${path}/${file}`);
            printList(results);
        });
    }
}

textProcess(path);

