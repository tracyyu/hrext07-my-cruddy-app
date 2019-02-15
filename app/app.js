/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery

  // toggle filter menu
  var toggleMenu = function(){
    var menuOpen = $('.filter-nav .menu-open');
    var menuClose = $('.filter-nav .menu-close');
    var menuWrapper = $('.filter-nav .menu-wrapper');

    menuOpen.on('click', () => {
      if(menuWrapper.hasClass('is-opened')){
        menuWrapper.removeClass('is-opened');
      }else{
        menuWrapper.addClass('is-opened');
      }
    });
  
    menuClose.on('click', () => {
      menuWrapper.removeClass('is-opened');
    });
  }

  toggleMenu();


  // toggle between list and rolodex display
  $('.toggle-switch').on('change', function(){
    var isChecked = $(this).is(':checked');
    $('.map-container').css('display', 'none');
    if(!isChecked){
      // will display list
      console.log($('.toggle-switch')[0].dataset['list']);
      $('.container-data').css('display', 'block');
      $('.container-rolodex').css('display', 'none');
      $('.container-data').css({transform: 'translateX(0px) translateY(0px)'});
    }else{
      // will display rolodex
      console.log($('.toggle-switch')[0].dataset['rolodex']);
      $('.container-data').css('display', 'none');
      $('.container-rolodex').css('display', 'block');
    }

  });

  var toggleDisplay = function(div){
    if(div.css('display') == 'flex'){
      div.css('display', 'none');
    }else{
      div.css('display', 'flex');
    }
  };

  var requiredInput = function(elem){
    var input = $(elem);
    var is_name=input.val();
    if(is_name){
      input.removeClass("invalid").addClass("valid");
    }else{
      input.removeClass("valid").addClass("invalid");
      input.attr("placeholder", "Must be included!");
    }
  }

  var clearFormFields = function(){
    $('#input-name').val('');
    $('#input-person-title').val('');
    $('#input-company-name').val('');
    $('#input-company-description').val('');
    $('#input-companu-address').val('');
    $('#input-work-phone').val('');
    $('#input-personal-phone').val('');
    $('#input-fax-phone').val('');
    $('#input-email').val('');
    $('#input-social').val('');
    $('#input-category').val('');
    $('#input-notes').val('');
  };

  var createUpdateObj = function(){
    var obj = {};

    var timeData = $.now();
    obj['time-created'] = obj['time-created'] || timeData;
    obj['time-accessed'] = timeData;

    var nameData = $('#input-name').val() || '';
    obj['name'] = nameData.trim();

    var jobTItle = $('#input-person-title').val() || '';
    obj['job-title'] = jobTItle.trim()

    var companyName = $('#input-company-name').val()|| '';
    obj['company-name'] = companyName.trim();

    var companyDescription = $('#input-company-description').val() || '';
    obj['company-description'] = companyDescription.trim();

    var companyAddress = $('#input-company-address').val() || '';
    obj['company-address'] = companyAddress.trim();

    var workPhone = $('#input-work-phone').val() || '';
    obj['work-phone'] = workPhone.trim();

    var personalPhone = $('#input-personal-phone').val() || '';
    obj['personal-phone'] = personalPhone.trim();

    var faxPhone = $('#input-fax-phone').val() || '';
    obj['fax-phone'] = faxPhone.trim();

    var email = $('#input-email').val() || '';
    obj['email'] = email.trim();

    var socialLink = $('#input-social').val() || '';
    obj['social-link'] = socialLink.trim();

    var category = $('#input-category').val() || '';
    obj['input-category'] = category;

    var notes = $('#input-notes').val() || '';
    obj['notes'] = notes.trim();

     //now add it to the key: all-data
    var allData = JSON.parse(localStorage.getItem('all-data'));

    var dataName = nameData.split(' ').join('-');
    if(!localStorage.getItem(dataName)){
      allData.push(obj);
    }

    // add data into localStorage
    localStorage.setItem(dataName, JSON.stringify(obj));
  
    localStorage.setItem('all-data', JSON.stringify(allData));

    return obj;
  };

  var createDataSummary = function(dataObj){
    // Summary Card
    var dataName = dataObj['name'].split(' ').join('-');
    var $summaryDiv = $(`<div class="display-data-summary ${dataName}" data-name="${dataName}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
    var $summaryDataDiv = $(`<div class="data-summary"><span>${dataObj['name']}</span><span class="summary-work"><i class="material-icons work">work</i>: ${dataObj['company-name']}</span><span class="summary-company"><i class="material-icons phone">call</i>: ${dataObj['work-phone']}</span></div>`);
    var $editButtons = $('<div class="data-summary-edits"><i class="material-icons edit">create</i> <i class="material-icons delete">clear</i></div>');

    $summaryDiv.append($summaryDataDiv, $editButtons);

    $('.container-data').append($summaryDiv);
  };

  var createDataCard = function(dataObj){
     // Entire card
    var dataName = dataObj['name'].split(' ').join('-');
    var $outerDiv = $(`<div class="display-data-item ${dataName}" data-name="${dataName}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
    var $cardDiv = $('<div class="display-data-card"></div>');
    var $personDiv = $(`<div class="card-person">
                        <p class="card-full-name">${dataObj['name']}</p>
                        <p class="card-job-title">${dataObj['job-title']}</p>
                        </div><hr>`);
    var $companyDiv = $(`<div class="card-company">
                          <p class="card-company-name">${dataObj['company-name']}</p>
                          <p class="card-company-description">${dataObj['company-description']}</p>
                          <p class="card-company-address">
                            <i class="material-icons">map</i> Address: <span class="address-input">${dataObj['company-address']}</span>
                          </p>
                          <div class="open-map">Map</div>
                        </div>`);
    var $contactDiv = $(`<div class="card-contact">
                            <p class="card-phone1">
                              <span>
                                <i class="material-icons">local_phone</i> Work: 
                              </span>
                              <span class="work-phone-input">${dataObj['work-phone']}</span>
                            </p>
                            <p class="card-phone2">
                              <span><i class="material-icons">phone_iphone</i> Cell: 
                              </span>
                              <span class="personal-phone-input">${dataObj['personal-phone']}</span>
                            </p>
                            <p class="card-phone1">
                              <span><i class="material-icons">local_printshop</i> Fax: 
                              </span>
                              <span class="fax-phone-input">${dataObj['fax-phone']}</span>
                            </p>
                            <p class="card-phone2">
                              <i class="material-icons">email</i> Email: 
                              <span class="email-input">${dataObj['email']}</span>
                            </p>
                          </div>`);
    var $socialLink = $(`<div class="card-social">
                          <a href=${dataObj['social-link']} class="card-website">
                            ${dataObj['social-link']}
                          </a>
                        </div>`);
    var $category = $(`<div class="card-category">
                        <span>Category: </span>
                        <span class="category-input">${dataObj['input-category']}</span>
                      </div>`);
    var $notes = $(`<div class="card-notes">
                      <span>Notes: </span>
                      <span class="notes-input">${dataObj['notes']}</span>
                    </div>`);

    $cardDiv.append($personDiv, $companyDiv, $contactDiv, $socialLink, $category, $notes);
    $outerDiv.append($cardDiv);

    return $outerDiv;
  }

  var addDataCard = function(dataObj){
   
    var $card = createDataCard(dataObj);

    $('.container-data').append($card);

    if(!$('.toggle-switch').is(':checked')){
      $card.css('display', 'none'); 
    }   
  };


  var createRolodexCard = function(dataObj, i){
    //Entire rolodex card
    var dataName = dataObj['name'].split(' ').join('-');
    var length = localStorage.length;
    var $defaultCardDiv = $(`<div class="default-card ${dataName}" id="card-${i}" data-name="${dataName}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
    var $backCardDiv = $('<div class="back"></div>');
    var $frontCardDiv = $('<div class="front"></div>');
    var $ribbonCardDiv = $('<div class="ribbon"></div>');

    var $card = createDataCard(dataObj);

    $frontCardDiv.append($ribbonCardDiv, $card);
            
    $defaultCardDiv.append($frontCardDiv, $backCardDiv);

    $('.container-rolodex .base').before($defaultCardDiv);
  }

  var displayAllData = function(dataArray){
    var allData = dataArray || JSON.parse(localStorage.getItem('all-data'));
    allData.forEach((item, i) => {
      if(item !== null){
        createDataSummary(item);
        addDataCard(item);
        createRolodexCard(item,i+1);
      }
    });
  };

  var filterData = function(filterType){
    // filter by category
    var allData = JSON.parse(localStorage.getItem('all-data'));
    return allData.filter((item) =>{
      return ( item['input-category'] === filterType || item['input-category'] === '' );
    });

  };

  var searchKeyword = function(str) {
    // Declare variables

    var input = $('#search_bar');
    // var filter = (input.text()).toLowerCase();
    var filter = str.toLowerCase();
    var listData = $(".container-data");
    var rolodexData = $(".default-card");
    var dataSummary = $(".display-data-summary");
    var dataItem = $(".display-data-item");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < dataSummary.length; i++) {

      // search through all data fields and return data summary that contains it
        var cardFullName = $(dataItem[i]).find('.card-full-name').text().toLowerCase();
        var cardJobTitle = $(dataItem[i]).find('.card-job-title').text().toLowerCase();     
        var cardCompanyName = $(dataItem[i]).find('.card-company-name').text().toLowerCase();
        var cardCompanyDescription = $(dataItem[i]).find('.card-company-description').text().toLowerCase();
        var cardCompanyAddress = $(dataItem[i]).find('.address-input').text().toLowerCase();
        var cardWorkPhone = $(dataItem[i]).find('.work-phone-input').text().toLowerCase();
        var cardPersonalPhone = $(dataItem[i]).find('.personal-phone-input').text().toLowerCase();
        var cardFaxPhone = $(dataItem[i]).find('.fax-phone-input').text().toLowerCase();
        var cardEmail = $(dataItem[i]).find('.email-input').text().toLowerCase();
        var cardSocial = $(dataItem[i]).find('card-website').text().toLowerCase();
        var cardCategory = $(dataItem[i]).find('.category-input').text().toLowerCase();
        var cardNotes = $(dataItem[i]).find('.notes-input').text().toLowerCase();

      if(cardFullName.includes(filter) || 
          cardJobTitle.includes(filter) ||
          cardCompanyName.includes(filter) ||
          cardCompanyDescription.includes(filter) ||
          cardCompanyAddress.includes(filter) ||
          cardWorkPhone.includes(filter) ||
          cardPersonalPhone.includes(filter) ||
          cardFaxPhone.includes(filter) ||
          cardEmail.includes(filter) ||
          cardSocial.includes(filter) ||
          cardCategory.includes(filter) ||
          cardNotes.includes(filter)
        ){
        $(dataSummary[i]).css('display', '');
        $(rolodexData[i]).css('display', 'block');
      }else{
        $(dataSummary[i]).css('display', "none");
        $(`#card-${i+1}`).css('display', 'none');
      }
    }
  };

  $('#search_bar').on('keyup', function(e){
    e.preventDefault();
    searchKeyword(e.currentTarget.value);
  });

  var sortData = function(sortType){
    var allData = JSON.parse(localStorage.getItem('all-data'));
    // sort alphabetically by name ascending order
    // sort by company name by ascending order
    // sort by time created
    if(sortType === 'name'){
      return allData.sort(function(a, b){
        if(a['name'].toLowerCase() < b['name'].toLowerCase()) { return -1; }
        if(a['name'].toLowerCase() > b['name'].toLowerCase()) { return 1; }
        return 0;
      });
    }else if(sortType === 'company'){
      return allData.sort(function(a, b){
        if(a['company-name'].toLowerCase() < b['company-name'].toLowerCase()) { return -1; }
        if(a['company-name'].toLowerCase() > b['company-name'].toLowerCase()) { return 1; }
        return 0;
      });
    }else if(sortType === 'recently-added'){
      return allData.sort(function(a, b){
        return a['time-created'] - b['time-created'];
      });
    }else{
      return allData;
    }
  }

  displayAllData();

  $('.container-main').addClass('slideinIndexPage');


  $('.create-button').on('click', function(e){
    e.preventDefault();
    var $form = $('.container-form');
    toggleDisplay($form);

    $('.btn-update').css('display', 'none');
    $('.btn-add').css('display', 'inline-block');

    $("[name='input-name']").attr("required", true);
    $("[name='input-company-name']").attr("required", true);
    $("[name='input-work-phone']").attr("required", true);
    
  });


  $('#input-name').on('focusout', function(){
    requiredInput('#input-name');
  });

  $('#input-company-name').on('focusout', function(){
    requiredInput('#input-company-name');
  });

  $('#input-work-phone').on('focusout', function(){
    requiredInput('#input-work-phone');
  });

  $('.container-data').on('click', '.data-summary' ,function(){
    var name = $(this)[0].parentElement.nextSibling;

    toggleDisplay($(name));
  });

  // closes the form element
  $('.btn-close').on('click', function(e){
    e.preventDefault();
    var $form = $('.container-form');
    toggleDisplay($form);
  });

  // Add item as long as satisfy requirements through the form
  $('.btn-add').on('click', function(e){
    e.preventDefault();

    if($('#input-name').val().trim() === '' && $('#input-company-name').val().trim() === '' && $('#input-work-phone').val().trim() === ''){
      //$( '.card-form span' ).text( "Not valid!" ).show();

      if($('#input-name').val().trim() === ''){
        requiredInput('#input-name');
      }

      if($('#input-company-name').val().trim() === ''){
        requiredInput('#input-company-name');
      }

      if($('#input-work-phone').val().trim() === ''){
        requiredInput('#input-work-phone');
      }

    }else{

      var dataObj = createUpdateObj();

      // Summary Card
      createDataSummary(dataObj);

      // Entire card
      addDataCard(dataObj);

      // Add to rolodex 
      createRolodexCard(dataObj, localStorage.length);

      clearFormFields();

      $('.container-form').css('display', 'none')
    }

  });


  // update db
  $('.container-data').on('click', '.data-summary-edits .edit', function(e){
    var keyData = e.target.parentElement.parentElement.dataset.name;

    var $form = $('.container-form');
    toggleDisplay($form);

    var obj = JSON.parse(localStorage.getItem(keyData));

    $('#input-name').val(obj['name']);
    $('#input-job-title').val(obj['job-title']);
    $('#input-company-name').val(obj['company-name']);
    $('#input-company-description').val(obj['company-description']);
    $('#input-company-address').val(obj['company-address']);
    $('#input-work-phone').val(obj['work-phone']);
    $('#input-personal-phone').val(obj['personal-phone']);
    $('#input-fax-phone').val(obj['fax-phone']);
    $('#input-email').val(obj['email']);
    $('#input-social').val(obj['social-link']);
    $('#input-category').val(obj['input-category']);
    $('#input-notes').val(obj['notes']);

    $('.btn-update').css('display', 'inline-block');
    $('.btn-add').css('display', 'none');

  });

  // delete item
  $('.container-data').on('click', '.delete', function(e){
    console.log(e);
    var keyData = e.target.parentElement.parentElement.dataset.name;
    console.log(keyData);
    localStorage.removeItem(keyData);
    var allDataArr = JSON.parse(localStorage.getItem('all-data'));

    let ind = allDataArr.find((obj,ind) => {
      obj['name'] === keyData.split('-').join(' ');
    });
    allDataArr.splice(ind,1);
    localStorage.setItem('all-data', JSON.stringify(allDataArr));
    // remove Summary div
    //e.target.parentElement.parentElement.remove();
    // must also remove card div
    $(`[data-name=${keyData}]`).remove();

  });

  // update item through the form
  $('.btn-update').on('click',function(e){
    e.preventDefault();

    var keyData = e.target.parentElement.parentElement.dataset.name;

    // must delete from local Storage if change name and dataset values

    var updatedObj = createUpdateObj();
    var name = updatedObj['name'].split(' ').join('-');

    $.each($(`.${name}`), (i, item) => {

      // Changes to summary
      var dataSummary = $(item).find('.data-summary');
      if(dataSummary.length){

        $(item).find('.data-summary').html(`<span>${updatedObj['name']}</span><span class="summary-work"><i class="material-icons work">work</i>: ${updatedObj['company-name']}</span><span class="summary-company"><i class="material-icons phone">call</i>: ${updatedObj['work-phone']}</span>`);
        $(item).find('.data-summary').css('display', 'block');
      }

      var card = $(item).find('.display-data-card');
      if(card.length){
      // Changes to card
        var cardFullName = $(item).find('.card-full-name');
        cardFullName.text(updatedObj['name']);

        var cardJobTitle = $(item).find('.card-job-title');     
        cardJobTitle.text(updatedObj['job-title']);

        var cardCompanyName = $(item).find('.card-company-name');
        cardCompanyName.text(updatedObj['company-name']);

        var cardCompanyDescription = $(item).find('.card-company-description');
        cardCompanyDescription.text(updatedObj['company-description']);

        var cardCompanyAddress = $(item).find('.address-input');
        cardCompanyAddress.text(updatedObj['company-address']);

        var cardWorkPhone = $(item).find('.card-work-phone');
        cardWorkPhone.text(updatedObj['work-phone']);

        var cardPersonalPhone = $(item).find('.personal-phone-input');
        cardPersonalPhone.text(updatedObj['personal-phone']);

        var cardFaxPhone = $(item).find('.fax-phone-input');
        cardFaxPhone.text(updatedObj['fax-phone']);

        var cardEmail = $(item).find('.email-input');
        cardEmail.text(updatedObj['email']);

        var cardSocial = $(item).find('.card-social');
        cardSocial.text(updatedObj['social-link']);

        var cardCategory = $(item).find('.card-category');
        cardCategory.text(updatedObj['input-category']);

        var cardNotes = $(item).find('.card-notes');
        cardNotes.text(updatedObj['notes']);
      }
    });


    // replace the data in the 'all-data array'
    var allDataArr = JSON.parse(localStorage.getItem('all-data'));

    let ind = allDataArr.find((obj,ind) => {
      obj['name'] === name;
    });
    allDataArr.splice(ind,1, updatedObj);
    localStorage.setItem('all-data', JSON.stringify(allDataArr));

    clearFormFields();

    var $form = $('.container-form');
    toggleDisplay($form);

  })

  // Clear Form 
  $('.btn-clear').on('click',function(){
    clearFormFields();
  });




/******************************************/
/*              INDEX   -- FILTER         */
/******************************************/

// Get the selected filters
  $('.btn-add-filter').on('click', function(e){
    e.preventDefault();

    var sortValue = $('input[name=radio]:checked').val();
    var categoryFilterValue = $('#filter-category').val();
    var distanceFilterValue = $('.checkbox-distance input[type="checkbox"]:checked');
    var arr = [...distanceFilterValue, categoryFilterValue];
  
    let filteredData = filterData(categoryFilterValue);
    let sortedData = sortData(filteredData);
    $('.container-data').empty();
    displayAllData(sortedData);

  });


/******************************************/
/*                ROLODEX                 */
/******************************************/

  var showing = 1;
  var prev;
  var next;
  var isShowing = false;
  var total = $('.default-card').length;

  function setNextPrev() {
    prev = showing-1;
    next = showing+1;

    if (prev == 0)
      prev = total-1;
    if (next == total)
      next = 1;
  };
  
  // Rotate: 12deg to -135deg.
  setNextPrev();
  $('#card-' + showing).show().css({zIndex: '2'});
  $('#card-' + prev).css({ zIndex: '1', transform: 'perspective(1500px) rotateX(0deg)' }).show();
  
  $('#prev-controller').on('click',function() {
    showing--;
    if (showing == 0)
      showing = total-1;
    setNextPrev();
    
    $('#card-' + prev).css({ zIndex: '1', transform: 'perspective(1500px) rotateX(-120deg)' }).show();
    $('#card-' + showing)
      .show()
      .css({ zIndex: 2 })
      .animate(
      { zIndex: 137 },
      { duration: 500,
        step: function(now, fx) { $(this).css({ transform: 'perspective(1500px) rotateX(' + (-135+now-2) + 'deg)' }); },
        complete: function() {
          $(this)
            .css({ zIndex: '0' });
          $('#card-' + next).css({zIndex: '0'}).show();
        }
      });
  });
  
  $('#next-controller').on('click',function() {
    setNextPrev();
    
    $('#card-' + next).css({zIndex: '1', transform: 'perspective(1500px) rotateX(0deg)'}).show();
    
    $('#card-' + showing)
      .css({ zIndex: 12 })
      .animate(
      { zIndex: 147 },
      { duration: 500,
        step: function(now, fx) { $(this).css({ transform: 'perspective(1500px) rotateX(-' + (now-27) + 'deg)' }); },
        complete: function() {
          $(this)
            .css({ zIndex: '1' });
          $('#card-' + next).css({zIndex: '2'});

          showing = next;
        }
      });
  });
  
  $('#port-prev').on('click',function() {
    $('#portfolio-imgs').css({marginLeft: '0%'});
    
    $(this).hide(500);
    $('#port-next').show(500);
  });
  
  $('#port-next').on('click',function() {
    $('#portfolio-imgs').css({marginLeft: '-100%'});
    
    $(this).hide(500);
    $('#port-prev').show(500);
  });
  
  $('.default-card').on('click',function(event) {
    event.stopPropagation();
  });
  
  var selected;
  $('.base').on('click',function() {
    selected = $('#card-' + showing);
    
    selected
      .addClass('zoom')
      .animate(
      { zIndex: '25' },
      { duration: 500,
        step: function(now, fx) {
          $(this).css({
            transform: 'scale(' + (now/10) + ',' + (now/10) + ')',
            top: (now*2) + '%'
          });
        },
        complete: function() {
          isShowing = true;
        }
      });
  });
  
  $('body').on('click',function() {
    if( isShowing ) {
      selected
        .animate(
          { zIndex: '2' },
          { duration: 500,
            step: function(now, fx) {
              $(this).css({
                transform: 'scale(' + ((now*2.5/24)+1) + ',' + ((now*2.5/24)+1) + ') perspective(1000px) rotateX(12deg)',
                top: (now/2.5) + '%'
              });
            },
            complete: function() {
              $(this)
                .css({
                transform: 'scale(1,1) perspective(1000px) rotateX(12deg)',
                top: 'auto'
              })
              .removeClass('zoom');
              isShowing = false;
            }
          });
    }
  });


/******************************************/
/*                MAP                     */
/******************************************/


  var geocode = function(location){

    //var location = '22 Main st, Boston, MA, 02124';

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
      params:{
        address: location,
        key: 'AIzaSyB7m6i_xmH97EjZ--YvjapGCjderp0EtKw'
      }
    })
    .then(function(response){
      console.log(response.data.results[0].geometry.location);
      var latlong = response.data.results[0].geometry.location;
      addMarker(latlong);
    }).catch(function(error){
      console.log(error);
    });
  }

  // Function for adding a marker to the page.
  var addMarker = function(location) {
      var marker = new google.maps.Marker({
          position: location,
          map: map
      });
      map.setCenter(new google.maps.LatLng(location));
  }

  $('.container-data').on('click', '.open-map', function(e){
    $('.map-container').css('display', 'block'); 
    $('.container-data').css({transform: 'translateX(-200px) translateY(80px)'});
    geocode($(e.target.previousElementSibling)[0].innerText);
  });

   $('.container-rolodex').on('click', '.default-card .open-map' , function(){
    $('.map-container').css('display', 'block'); 
    $('.container-rolodex').css({transform: 'translateX(-200px) translateY(80px)'}); 
  });

  $('.map-container').on('click', '.map-close', function(e){
    $('.map-container').css('display', 'none');
    $('.container-data').css({transform: 'translateX(0px) translateY(0px)'}); 
  });


});




  //var keyData = 'ourKey'; // going to need to make this dynamic?

// <div class="display-data-item">
//   <div class="display-data-card">
//     <div class="card-person">
//       <p class="card-full-name">Full Name</p>
//       <p class="card-job-title">Job Title</p>
//     </div>
//     <hr>
//     <div class="card-company">
//       <p class="card-company-name">Company Name</p>
//       <p class="card-company-description">Company Description</p>
//       <p class="card-company-address">Address, City, State, Zip</p>
//     </div>
//     <div class="card-contact">
//       <p class="card-phone"><span>Work: </span> 707.555.6789</p>
//       <p class="card-phone"><span>Cell: </span> 707.678.2349</p>
//       <p class="card-phone"><span>Fax: </span> 707.678.2349</p>
//       <p class="card-phone">Email@domain.com</p>
//     </div>
//     <div class="card-social">
//       <a href="www.websiteurl.com" class="card-website">www.websiteurl.com</a>
//     </div>
//     <div class="card-notes">
//       <span>Notes: </span>sdjflajsdfljsadflkjlaksdfjlksdjfljasfjkl
//     </div>
//   </div>
// </div>