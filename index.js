import fs from 'fs';
import chalk from 'chalk';

function handlesError(error){
    throw new Error(chalk.red(error.code, ': don\'t have a file in the specified dir'));
}

async function takeFile(path){
    const encode = "utf-8";

    fs.promises.readFile(path, encode)
        .then((content) => console.log(chalk.blue(content)))
        .catch((error) => handlesError(error));

}

//Sync
// function takeFile(path){
//     const encode = "utf-8";

//     fs.readFile(path, encode, (error, content) =>{
//         if(error){
//             handlesError(error);
//         }
        
//         console.log(chalk.blue(content));
//     });
// }

takeFile("./files/text.md");