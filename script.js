const container = document.getElementById("container");
const values = [];

init();
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearContainer(){
    document.getElementById("container").innerHTML = "";
}

function render(){
    clearContainer();

    let size = values.length;
    //display the Array values as bars 
    for(let j = 0;j<=size-1;j++){
        const bar = document.createElement("div");
        bar.style.width = "20px";
        bar.style.height = values[j]+"%";
        bar.style.backgroundColor = "black";
        bar.style.marginLeft="2px";
        container.appendChild(bar);
    }
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


// fill Array with random values
//map Number -> Height
function assignValues(){
    for(let i = 0; i<=20;i++){
        values[i] = getRandomInt(5,100);
    }
}

function init(){
    assignValues();
    render();
}

function play(){
    const copy = [...values];
    animate(insertionSort(copy));

}

function animate(swaps){
    if(swaps.length == 0){return;}
    [i,j] = swaps.shift();
    [values[i],values[j]] = [values[j],values[i]];
    render();
    setTimeout(function(){
        animate(swaps);
    },100);
}

function insertionSort(a){
    const swaps = [];
    let size = a.length-1;
    for(let i = 0; i<=size;i++){
        let j = i-1;
        let key = values[i];
        while(j >= 0 && key<values[j]){
            a[j+1]=a[j];
            swaps.push([j+1,j]);
            j--;
        }
        a[j+1]=key;
        swaps.push([j+1,i]);

    }
    return swaps;
}

