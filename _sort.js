const dataArrayRandom = [80, 469, 128, 478, 143, 338, 436, 233, 135, 357, 364, 481, 427, 391, 16, 120, 458, 28, 306, 496, 221, 390, 268, 70, 27, 259, 250, 183, 380, 74, 78, 110, 474, 389, 285, 349, 39, 287, 74, 480, 0, 297, 313, 75, 294, 457, 175, 242, 426, 197, 98, 106, 414, 32, 2, 235, 268, 174, 460, 98, 349, 488, 453, 278, 246, 293, 60, 392, 403, 13, 211, 200, 140, 241, 116, 309, 50, 24, 149, 319, 119, 320, 115, 138, 82, 360, 376, 349, 50, 497, 171, 442, 354, 60, 329, 148, 294, 185, 53, 410];

const main = document.querySelector('#main');

const blocksArray = [];


// render blocks with height from dataArrayRandom

const createBlocks = arr => {
    arr.forEach(element => {
        const block = document.createElement('div');
        block.style.height = element + 'px';
        blocksArray.push(block);
    });
};

function delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
};

// sort blocks
async function bubbleRender(element, index) {

    await delay();

    setTimeout(() => {
        main.append(element);
    }, 50 * (index + 1));

};

async function processArray(arr) {
    for (const element of arr) {
        await bubbleRender(element);
    };
    console.log('Done!');
};

processArray(blocksArray);

const bubbleSort = arr => {
    arr.forEach(function(element,index) {
        console.log(element);
        // if(element.clientHeight > element.prev.clientHeight) {
        //     element.clientHeight.replaceWith.element.prev.clientHeight;
        // }
    });

    for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
};

(async function() {

    createBlocks(dataArrayRandom);

    // bubbleRender(blocksArray);

    // bubbleSort([...main.children]);

})();

