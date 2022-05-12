const dataArrayRandom = [80, 469, 128, 478, 143, 338, 436, 233, 135, 357, 364, 481, 427, 391, 16, 120, 458, 28, 306, 496, 221, 390, 268, 70, 27, 259, 250, 183, 380, 74, 78, 110, 474, 389, 285, 349, 39, 287, 74, 480, 0, 297, 313, 75, 294, 457, 175, 242, 426, 197, 98, 106, 414, 32, 2, 235, 268, 174, 460, 98, 349, 488, 453, 278, 246, 293, 60, 392, 403, 13, 211, 200, 140, 241, 116, 309, 50, 24, 149, 319, 119, 320, 115, 138, 82, 360, 376, 349, 50, 497, 171, 442, 354, 60, 329, 148, 294, 185, 53, 410];
const main = document.querySelector('#main');
const blocksArray = [];
const btn = document.querySelector('#button');

const audio = document.createElement('audio');
audio.src = './media/mtcmbt.mp3';
audio.volume = 0.2;

function delay(delayTime) {
    return new Promise(resolve => setTimeout(resolve, delayTime));
};

async function createBlocks(arr) {

    await delay(10);

    arr.forEach(element => {
        const block = document.createElement('div');
        block.style.height = element + 'px';
        block.style.width = window.innerWidth / arr.length + 'px';
        blocksArray.push(block);
    });
};

async function renderBlocks(item) {
    await delay(1);
    
    main.append(item);
}

async function sortMain() {
    await delay(10);

    const mainChildren = main.children;

    for (i = 0, endI = mainChildren.length - 1; i < endI; i++) {
        let wasSwap = false;

        await (async(i) => {
            await delay(10);
            for (let j = 0, endJ = endI - i; j < endJ; j++) {
                await (async() => {
                    await delay(1);
                    console.log(endJ);
                    setTimeout(() => {
                        if(mainChildren[j]?.clientHeight < mainChildren[j+1]?.clientHeight) {
                            const mainChildrenFirst = mainChildren[j].clientHeight;
                            const mainChildrenSecond = mainChildren[j+1].clientHeight;
                    
                            mainChildren[j].style.height = mainChildrenSecond + 'px';
                            mainChildren[j+1].style.height = mainChildrenFirst + 'px';

                            wasSwap = true;
                        }
                    }, 1 * (j + 1));
                })(j);
            };
        })(i);
        if (!wasSwap) break;
    }
}

async function processArray() {

    audio.play();

    await createBlocks(dataArrayRandom);
    console.log('Create blocks completed');

    for (const item of blocksArray) {
        await renderBlocks(item, 1);
    }
    console.log('Render blocks completed');

    await sortMain();
    console.log('Sorting blocks completed');

    audio.pause();
}

btn.addEventListener('click', () => {    
    setTimeout(() => {
        processArray();
    }, 600);
})

// mainChildren[j-1].style.backgroundColor = "#000";
// mainChildren[j].style.backgroundColor = "#a103fc";