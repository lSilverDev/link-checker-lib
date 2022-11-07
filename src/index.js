import fs from 'fs';
import chalk from 'chalk';

async function takeFile(path){
    try{
        const encode = "utf-8";
        const text = await fs.promises.readFile(path, encode);
        return extractorLink(text);
    } catch (error){
        return handlesError(error);
    }
}

function extractorLink(content){
    const regex = /\[(.*?)\]\((.*?)\)/gm;
    const catches = [...content.matchAll(regex)];
    const results = catches.map(catches => ({
            [catches[1]] : catches[2]
        })
    )

    return results.length !== 0 ? results : chalk.red("Empty. There isnt links in this file");
}

function handlesError(error){
    throw new Error(chalk.red(error.code));
}

export default takeFile;