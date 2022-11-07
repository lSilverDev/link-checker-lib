export default async function listValidated(ArrLinks){
    const arrLinksExtracted = linksExtractor(ArrLinks);
    const status = await linkStatusChecker(arrLinksExtracted);

    return status;
}

function linksExtractor(ArrLinks){
    return ArrLinks.map((objLink) => Object.values(objLink));
}

async function linkStatusChecker(ArrLinks){
    const arrStatus = await Promise.all(
        ArrLinks.map(async (links) => {
            const res = await fetch(links);
            return res.status;
        })
    );
    return arrStatus;
}
