document.body.innerHTML = '';

var catNamesString = prompt('Enter the cats names separated by coma to initialize the page');

(function createNative() {
    var content = document.createElement('div'), // body level 1
        listDiv =  document.createElement('div'), // body level 2
        imageDiv = document.createElement('div'), //body level 2
        table = document.createElement('table'); //body level 3 (inside of listDiv)

    content.id = 'content';
    listDiv.id = 'list_div';
    imageDiv.id = 'image_div';
    table.id = 'table';

    listDiv.appendChild(table);
    content.appendChild(listDiv);
    content.appendChild(imageDiv);
    document.body.appendChild(content);
})(); // self call


var catNames = catNamesString.split(','); //= ['Fluffy', 'Scratchy', 'JD', 'Morrison', 'Meowie']; // names for cat in array


for (var i = 1 ; i < catNames.length + 1; i++){
    createCatTable(catNames[i - 1], i)
} //initialization on how many cats


function createCatTable(catName, imgID){ //build a table of cat names and click count
    
    var tableTr = document.createElement('tr'), //creating rows
        rawName = document.createElement('td'), //creating rows attr name 
        rawCount = document.createElement('td'), // creating rows attr Count
        table = document.getElementById('table'), // to add append table
        catImage = document.createElement('IMG'), // and add all images on the page
        imageDiv = document.getElementById('image_div'); // where to add images

    catImage.className = 'hidden';
    catImage.id = 'pic_cat'+ imgID; 
    catImage.setAttribute('src', 'imgs/cat' + imgID + '.jpg'); //choosing pics
    
    imageDiv.appendChild(catImage); //appending div img with 'hidden' class
    
    rawName.textContent = catName; // filling the
    rawCount.textContent = 0; //      cat rows

    tableTr.appendChild(rawName); //  appending row
    tableTr.appendChild(rawCount); // to the table

    tableTr.id = 'cat' + imgID; // each row with different id
                                // based on this id onclick function is working
    tableTr.className = imgID % 2 ? 'first' : 'second'; // marking rows with different colors

    table.appendChild(tableTr); // appending rows to the grid

    new MakeNewCatCounter(imgID); // initializing step 2. methods to draw image, and increment a counter
}


function MakeNewCatCounter(id){
    var self = this; // to use outer scope inside of onclick function
    this.counter = 0; // initial value
    this.catID = 'cat' + id; // few times to use
    this._element = document.getElementById(this.catID); // table tr row to click on

    this._element.onclick = function(){
        drawImage(self); // change the style class of active image
        var clicks = document.getElementById(self.catID).lastChild; // table tr with click counts
        clicks.innerHTML = ++self.counter; //redisplay when click and increment
    }
}


function drawImage(cat){
    var image = document.getElementById('pic_' + cat.catID),
        previous = document.getElementsByClassName('active'); // if there is already active picture grab it
        previous.length ? previous[0].className = 'hidden' : null;
    //previous.className = previous ? 'hidden' : null;
    // check if exist and upon the answer assign a class

    image.className = 'active'; // and mark an image class as active
}
