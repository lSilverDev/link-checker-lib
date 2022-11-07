import chalk from 'chalk';

export default async function listValidated(ArrLinks){
    const arrLinksExtracted = linksExtractor(ArrLinks);
    const status = await linkStatusChecker(arrLinksExtracted);

    return ArrLinks.map((obj, index) => ({
        ...obj, 
        status: status[index]
    }));
}

function linksExtractor(ArrLinks){
    return ArrLinks.map((objLink) => Object.values(objLink));
}

async function linkStatusChecker(ArrLinks){
    const arrStatus = await Promise.all(
        ArrLinks.map(async (links) => {
            try{
                const res = await fetch(links);
                return res.status;
            } catch (error) {
                return handlesError(error);
            }
        })
    );
    return arrStatus;
}

function handlesError(error){
    if (error.cause.code === 'ENOTFOUND') {
        return '404 NOT FOUND - Link\'s broken';
    } else {
        return "something dont work well!";
    }
}
