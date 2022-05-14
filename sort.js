const dataArrayRandom = [78,19,13,99,36,72,67,97,22,40,76,35,91,87,53,14,11,0,25,47,75,46,4,28,48,39,64,50,80,65,10,37,8,69,77,42,26,68,86,38,27,43,49,55,54,74,32,30,15,96,41,82,44,52,93,6,3,5,95,20,33,31,70,7,34,51,56,88,58,60,63,79,81,18,16,73,66,71,84,61,21,12,9,94,24,45,57,17,85,83,89,2,1,92,90,98,23,62,59,29];
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
            await delay(index);
            
            const block = document.createElement('div');
            block.style.height = item + 'px';
            block.style.width = window.innerWidth / arr.length + 'px';
            blocksArray.push(block);
            
            main.append(block);
        })(item);
    };

    console.log('Building blocks is completed');
};

const sortBubbles = async () => {
    await delay(10);

    const mainChildren = main.children;

    for (i = 0, endI = mainChildren.length - 1; i < endI; i++) {
        let wasSwap = false;

        await (async(i) => {
            await delay(1); // speed of loop
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                await (async() => {
                    await delay(10);  // speed of exchanging. Use j for slowly process
                    // console.log(endJ); // looking to process
                        if(mainChildren[j]?.clientHeight < mainChildren[j+1]?.clientHeight) {
                            const mainChildrenFirst = mainChildren[j].clientHeight;
                            const mainChildrenSecond = mainChildren[j+1].clientHeight;
                    
                            mainChildren[j].style.height = mainChildrenSecond + 'px';
                            mainChildren[j+1].style.height = mainChildrenFirst + 'px';

                            wasSwap = true;
                        }
                })(j);
            };
        })(i);
        if (!wasSwap) break;
    }
    console.log('Sorting blocks is completed');
};

const sortSelection = async () => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
};

const globalProcess = async (target) => {

    coinSound.play();

    // defineMusicSrc(target.dataset.musicSrc);

    track.play();

    await buildBlocks(dataArrayRandom);

    //Choise sort method
    target.id == 'bubbles' && await sortBubbles();

    // End choising

    track.pause();
    coinSound.play();
}

btnsContainer.addEventListener('click', evt => globalProcess(evt.target));