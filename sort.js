const dataArrayRandom = [162,137,33,109,157,124,129,68,91,84,118,25,116,115,105,148,189,53,64,110,120,104,16,48,174,108,43,38,42,7,117,151,6,61,171,145,193,15,161,2,114,190,0,150,77,88,175,71,80,134,152,12,135,132,1,83,181,158,11,65,160,97,28,186,146,85,194,60,3,23,17,164,82,13,136,31,131,123,168,144,51,165,172,37,5,143,183,89,101,127,125,29,32,41,178,112,59,86,140,121,99,26,102,63,153,39,188,40,47,79,163,113,21,30,128,93,169,95,90,22,122,176,139,111,57,70,98,155,14,187,36,147,45,19,191,96,8,167,69,20,173,24,103,94,66,198,107,4,149,46,138,154,35,119,195,170,179,78,180,34,67,54,182,141,62,184,156,56,81,142,27,44,52,76,18,55,9,133,50,197,92,159,49,73,100,58,177,106,72,87,192,74,199,75,185,10,130,126,166,196];
const main = document.querySelector('#main');
const blocksArray = [];
const btnsContainer = document.querySelector('#btnsContainer');

const track = document.createElement('audio');
const coinSound = document.createElement('audio');

// Settings for music
// One of settings in globalProcess function 

coinSound.src = './media/coin.mp3';
track.volume = 0.2;
coinSound.volume = 0.2;

const defineMusicSrc = (target) => {
    target == undefined && console.error('Name of variable have mistakes.')
    track.src = target;
};

// end settings for music

const delay = (delayTime) => {
    return new Promise(resolve => setTimeout(resolve, delayTime));
};

const buildBlocks = async (arr) => {
    await delay(10);

    for (const [index, item] of dataArrayRandom.entries()) {
        await (async (item)=> {
            await delay(index/10);
            
            let block = document.createElement('div');
            block.style.height = item + 'px';
            block.style.width = window.innerWidth / arr.length + 'px';
            blocksArray.push(block);
            
            main.append(block);
        })(item);
    };

    console.log('Building blocks is completed');
};

const sortBubbles = async (arr) => {    
    await delay(0);

    const timeStart = Date.now();
    const childrens = arr.children;

    for (i = 0, endI = childrens.length - 1; i < endI; i++) {
        let wasSwap = false;

        await (async () => {
            // speed of loop
            await delay(0); 
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                await (async () => {
                    // speed of exchanging. Use j for slowly process
                    await delay(0);
                        if(childrens[j]?.clientHeight < childrens[j+1]?.clientHeight) {
                            let childrensFirst = childrens[j].clientHeight;
                            let childrensSecond = childrens[j+1].clientHeight;
                    
                            childrens[j].style.height = childrensSecond + 'px';
                            childrens[j+1].style.height = childrensFirst + 'px';

                            wasSwap = true;
                        }
                })();
            };
        })();
        if (!wasSwap) break;
    }

    const timeFinish = (Date.now() - timeStart).toLocaleString();
    console.log('Sorting bubbles is completed with ' + timeFinish + 's.');
};

const sortSelection = async (arr) => {
    await delay(0);

    const timeStart = new Date().getTime();
    const childrens = arr.children;
    const len = childrens.length;
    
    for (let i = 0, l = len, k = l - 1; i < k; i++) {
        await (async () => {
            await delay(0);

            let indexMin = i;

            for (let j = i + 1; j < l; j++) {
                await (async () => {
                    await delay(0);

                    if (childrens[indexMin].clientHeight > childrens[j].clientHeight) {
                        indexMin = j;
                    }
                })();
            }

            if (indexMin !== i) {    
                let childrensFirst = childrens[i].clientHeight;
                let childrensSecond = childrens[indexMin].clientHeight;
    
                childrens[i].style.height = childrensSecond + 'px';
                childrens[i].style.backgroundColor = 'red';

                childrens[indexMin].style.height = childrensFirst + 'px';
            }
            if(i > 0) childrens[i-1].style.backgroundColor = 'black';
        })();
    }

    const timeFinish = (new Date().getTime() - timeStart).toLocaleString();
    console.log('Sorting select is completed with ' + timeFinish + 's.');
};

const globalProcess = async (target) => {

    coinSound.play();

    // defineMusicSrc(target.dataset.musicSrc);

    // track.play();

    await buildBlocks(dataArrayRandom);

    //Choise sort method
    target.id == 'bubbles' && await sortBubbles(main);
    target.id == 'selection' && await sortSelection(main);

    // End choising

    track.pause();
    coinSound.play();
};

btnsContainer.addEventListener('click', evt => globalProcess(evt.target));