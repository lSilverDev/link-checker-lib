import fs from 'fs';
import chalk from 'chalk';

async function takeFile(path){
    try{
        const encode = "utf-8";
        const text = await fs.promises.readFile(path, encode);
        extractorLink(text);
    } catch (error){
        handlesError(error);
    }
}

function extractorLink(content){
    const regex = /\[(.*?)\]\((.*?)\)/gm;
    const catches = [...content.matchAll(regex)];
    const results =  catches.map(catches => ({
            [catches[1]] : catches[2]
        })
    )

    console.log(results);
}

function handlesError(error){
    throw new Error(chalk.red(error.code));
}

export default takeFile;