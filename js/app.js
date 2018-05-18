'use strict';



$(document).ready(function(){




	var model = {


		currentCat: null,
		cats: [

			{

				clickCount: 0,
				name: 'Bernard',
				imgSrc: 'images/Bernard.jpg',
			},
			{

				clickCount: 0,
				name: 'Melson',
				imgSrc: 'images/Melson.jpg',
			},
			{

				clickCount: 0,
				name: 'SnowFlake',
				imgSrc: 'images/SnowFlake.jpg',
			},
			{

				clickCount: 0,
				name: 'Willow',
				imgSrc: 'images/Willow.jpg',
			},
			{

				clickCount: 0,
				name: 'Wilson',
				imgSrc: 'images/Wilson.jpg',
			}

		]
	};




	var octupus = {

		init:function(){

			model.currentCat = model.cats[0];
			catListView.init();
			catView.init();
			admin.init();
		},
		getCurrentCat:function(){

			return model.currentCat;
		},
		getCats: function(){

			return model.cats;
		},
		setCurrentCat: function(cat){

			model.currentCat = cat;
		},
		incrementCounter: function(){

			model.currentCat.clickCount++;
			catView.render();
		},
		updateCatInformation: function(cat){

			console.log(cat)
			model.currentCat.name = cat.name;
			model.currentCat.imgSrc = cat.imgSrc;
			model.currentCat.clickCount = cat.clickCount;
			catView.render();
			catListView.render();
		},
		showAdminForm: function(){
			
			admin.render();
		}
	};

	var admin = {

		init:function(){

			this.$adminForm 	 = $('#editCatForm');
			this.$editCatName 	 = $('#editCatName');
			this.$editCatImage   = $('#editCatImage');
			this.$editClickCount = $('#editClickCount');
			this.$adminModeBtn   = $('#adminModeBtn');
			this.$saveEditsBtn   = $('#saveEditsBtn');
			this.$cancelEditBtn  = $('#cancelEditBtn');
			this.$adminForm.hide(); 
			this.render();
		},
		render:function(){

			var currentCat = octupus.getCurrentCat();
			this.$editCatName.val(currentCat.name);
			this.$editCatImage.val(currentCat.imgSrc);
			this.$editClickCount.val(currentCat.clickCount);
			

			this.$adminModeBtn.on('click', function(){

				octupus.showAdminForm();
				$('#editCatForm').show(); 

			})

			this.$cancelEditBtn.on('click', function(){

				$('#editCatForm').hide(); 
			})

			this.$saveEditsBtn.click(function(){

				var editCat = {};
				editCat.name = $('#editCatName').val()
				editCat.imgSrc = $('#editCatImage').val()
				editCat.clickCount = $('#editClickCount').val()
				octupus.updateCatInformation(editCat);
			})

			
		}
	}


	var catView = {

		init: function(){

			this.catElm 	= $('#cat');
			this.catName 	= $('.catnameHeading');
			this.catImage 	= $('.mainimg');
			this.clickCount = $('.mainCounter');



			this.catImage.on('click', function(){

				octupus.incrementCounter();
			})

			this.render();
		},
		render: function(){

			var currentCat = octupus.getCurrentCat();
			this.clickCount.text('Clicks:'+currentCat.clickCount);
			this.catName.text(currentCat.catName);
			this.catImage.attr('src', currentCat.imgSrc);
		}
	};



	var catListView = {


		init: function(){

			this.catList = $('.sidebar');
			this.render();
		},
		render: function(){


			var cats = octupus.getCats();

			this.catList.html("")

			var cat;

		    for (var i = 0; i < cats.length; i++) {

		      cat = cats[i];

		      var $catLink =  $(

		        	  '<div class="col-sm-12">'
		              +'<img src="'+cats[i].imgSrc+'" data-name="'+cats[i].name+'" class="bgimg rounded" alt="Cat Image">'
		              +'<strong>'+cats[i].name+'</strong><br>'
		              +'<label>Clicks: <span class="count">'+cats[i].clickCount+'</span></label>'
		              +'</div>'

		        )

		      this.catList.append($catLink)

		      $catLink.on('click', (function(catCopy){

		        	return function(){

		        		octupus.setCurrentCat(catCopy);
		        		octupus.incrementCounter();
		        		catListView.render();
		        		admin.render();

		        	}

		        }) (cat) )


	    	}


		}


	};

	octupus.init();

})