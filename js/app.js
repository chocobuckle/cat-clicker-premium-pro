/* ======= Model ======= */
var model = {
    adminViewShowing: true,
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};

/* ======= viewModel ======= */
var viewModel = {
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        view.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    toggleAdminView: function() {
        if(!model.adminViewShowing) {
            model.adminViewShowing = true;
        } else {
            model.adminViewShowing = false;
        }
    },

    updateCurrentCatAfterSave: function(catName, imgSrc, catClicks) {
        model.currentCat.name = catName;
        model.currentCat.imgSrc = imgSrc;
        model.currentCat.clickCount = catClicks;
    }
};


/* ======= View ======= */
var catView = {
    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        this.adminButton = document.getElementById('admin-button');
        this.cancelButton = document.getElementById('cancel-button');
        this.saveButton = document.getElementById('save-button');

        this.nameInput = document.getElementById('name');
        this.urlInput = document.getElementById('url');
        this.clicksInput = document.getElementById('clicks');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            viewModel.incrementCounter();
        });

        this.adminButton.addEventListener('click', function() {
            viewModel.toggleAdminView();
            catView.render();
        }, false);

        this.cancelButton.addEventListener('click', function() {
            viewModel.toggleAdminView();
            catView.render();
        }, false);

        this.saveButton.addEventListener('click', function() {
            viewModel.updateCurrentCatAfterSave(catView.nameInput.value, catView.urlInput.value, catView.clicksInput.value);
            viewModel.toggleAdminView();
            catView.render();
            view.render();
        }, false);

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = viewModel.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;

        if(model.adminViewShowing) {
            this.openAdmin();
        } else {
            this.closeAdmin();
        }

        this.nameInput.value = currentCat.name;
        this.urlInput.value = currentCat.imgSrc;
        this.clicksInput.value = currentCat.clickCount;
    },

    openAdmin: function() {
        var adminArea = document.getElementById('admin-area');
        adminArea.style.visibility = "visible";
    },

    closeAdmin: function() {
        var adminArea = document.getElementById('admin-area');
        adminArea.style.visibility = "hidden";
    }
};

var view = {
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;

        // get the cats we'll be rendering from the viewModel
        var cats = viewModel.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    viewModel.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
viewModel.init();
