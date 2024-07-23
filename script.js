const container = document.getElementById("container");
const values = [];

// Display Bars when opening the Site
init();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// clears the Container div with the bars
function clearContainer(){
    document.getElementById("container").innerHTML = "";
}


// clears the Container div and generates new Set of bars
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

// generates random Integer
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

// Fills Array with random values and display new Values as Bars
function init(){
    assignValues();
    render();
}

// Creates deep Copy of array and Sorts it to get the swaps
// which are then animated 
function play(){
    const copy = [...values];
    swaps = insertionSort(copy);
    console.log(swaps);
    animate(swaps);
    
}

// Animates the swaps on Container
function animate(swaps){
    if(swaps.length == 0){return;}
    [i,j] = swaps.shift();
    swapValues(values,i,j);
    render();
    setTimeout(function(){
        animate(swaps);
    },100);
}

// exchanges Position of 2 Values in given Array
function swapValues(a,pos1,pos2){
    const temp = a[pos1];
    a[pos1]=a[pos2];
    a[pos2]=temp;
}

// Returns all swaps this version of InsertionSort will make on given Array
function insertionSort(a){
    const swaps = [];
    for(let i = 1;i<=a.length;i++){
        posE = i;
        x=i-1;
        while (x>=0 && a[posE]<a[x]){
            swapValues(a,posE,x);
            swaps.push([posE,x]);
            posE--;
            x--;
        }
    }

    return swaps;
}

