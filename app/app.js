/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery

  // create a storage for a sorted array
  if(!localStorage.getItem('all-data')){
    localStorage.setItem('all-data', JSON.stringify([]));
  }


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
    if(!isChecked){
      // will display list
      console.log($('.toggle-switch')[0].dataset['list']);
      $('.container-data').css('display', 'block');
      $('.container-rolodex').css('display', 'none');
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
    $('#input-job-title').val('');
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

    var jobTItle = $('#input-job-title').val() || '';
    obj['job-title'] = jobTItle.trim()

    var companyName = $('#input-company-name').val()|| '';
    obj['company-name'] = companyName.trim();

    var companyDescription = $('#input-company-description').val() || '';
    obj['company-description'] = companyDescription.trim();

    var companyAddress = $('#input-companu-address').val() || '';
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

    var category = $('#input-category option:selected').val() || '';
    obj['input-category'] = category;

    var notes = $('#input-notes').val() || '';
    obj['notes'] = notes.trim();

    // add data into localStorage
    localStorage.setItem(nameData, JSON.stringify(obj));

    //now add it to the key: all-data
    var allData = JSON.parse(localStorage.getItem('all-data'));
    console.log(allData);
    allData.push(obj);
  
    localStorage.setItem('all-data', JSON.stringify(allData));

    return obj;
  };

  var createDataSummary = function(dataObj){
    // Summary Card
    var $summaryDiv = $(`<div class="display-data-summary" data-name="${dataObj['name']}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
    var $summaryDataDiv = $(`<p class="data-summary">${dataObj['name']} | ${dataObj['company-name']} <br> ${dataObj['work-phone']}</p>`);
    var $editButtons = $('<div class="data-summary-edits"><i class="material-icons edit">create</i> <i class="material-icons delete">clear</i></div>');

    $summaryDiv.append($summaryDataDiv, $editButtons);

    $('.container-data').append($summaryDiv);
  };

  var createDataCard = function(dataObj){
     // Entire card
    var $outerDiv = $(`<div class="display-data-item" data-name="${dataObj['name']}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
    var $cardDiv = $('<div class="display-data-card"></div>');
    var $personDiv = $(`<div class="card-person"><p class="card-full-name">${dataObj['name']}</p><p class="card-job-title">${dataObj['job-title']}</p></div><hr>`);
    var $companyDiv = $(`<div class="card-company"><p class="card-company-name">${dataObj['company-name']}</p><p class="card-company-description">${dataObj['company-description']}</p><p class="card-company-address">${dataObj['company-address']}</p></div>`);
    var $contactDiv = $(`<div class="card-contact"><p class="card-phone"><span>Work: </span> ${dataObj['work-phone']}</p><p class="card-phone"><span>Cell: </span> ${dataObj['personal-phone']}</p><p class="card-phone"><span>Fax: </span> ${dataObj['fax-phone']}</p><p class="card-phone">${dataObj['email']}</p></div>`);
    var $socialLink = $(`<div class="card-social"><a href=${dataObj['social-link']} class="card-website">${dataObj['social-link']}</a></div>`);
    var $category = $(`<div class="card-category"><span>Category: </span>${dataObj['input-category']}</div>`);
    var $notes = $(`<div class="card-notes"><span>Notes: </span>${dataObj['notes']}</div>`);

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
    var length = localStorage.length;
    var $defaultCardDiv = $(`<div class="default-card" id="card-${i}" data-name="${dataObj['name']}" data-time-created=${dataObj['time-created']} data-time-accessed=${dataObj['time-accessed']}></div>`);
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

  };

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
      createDataCard(dataObj);

      // Add to rolodex 
      createRolodexCard(dataObj, localStorage.length);

      clearFormFields();

      $('.container-form').css('display', 'none')
    }

  });


  // update db
  $('.container-data').on('click', '.data-summary-edits .edit', function(e){
    var keyData = e.target.parentElement.parentElement.dataset.name;
    console.log(keyData);

    var $form = $('.container-form');
    toggleDisplay($form);

    var obj = JSON.parse(localStorage.getItem(keyData));
    console.log(obj);

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
    $('#input-category option:selected').val(obj['input-category']);
    $('#input-notes').val(obj['notes']);

    $('.btn-update').css('display', 'inline-block');
    $('.btn-add').css('display', 'none');

  });

  // delete item
  $('.container-data').on('click', '.delete', function(e){
    console.log(e);
    var keyData = e.target.parentElement.parentElement.dataset.name;
    localStorage.removeItem(keyData);
    // remove Summary div
    //e.target.parentElement.parentElement.remove();
    // must also remove card div
    $(`[data-name=${keyData}]`).remove();

  });

  // update item through the form
  $('.btn-update').click(function(e){
    e.preventDefault();

    var keyData = e.target.parentElement.parentElement.dataset.name;

    var updatedObj = createUpdateObj();

    // Changes to summary
    $('.data-summary').find(`[data-name=${keyData}]`).html(`<span>${updatedObj['name']} | ${updatedObj['company-name']} <br> ${updatedObj['work-phone']}</span>`);
    $('.data-summary').find(`[data-name=${keyData}]`).css('display', 'block');

    // Changes to card
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-full-name').val(updatedObj['name']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-job-title').val(updatedObj['job-title']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-company-name').val(updatedObj['company-name']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-company-description').val(updatedObj['company-description']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-company-address').val(updatedObj['company-address']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-work-phone').val(updatedObj['work-phone']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-personal-phone').val(updatedObj['personal-phone']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-fax-phone').val(updatedObj['fax-phone']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-email').val(updatedObj['email']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-social').val(updatedObj['social-link']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-category option:selected').val(updatedObj['input-category']);
    $('display-data-item').find(`[data-name=${keyData}]`).find('.card-notes').val(updatedObj['notes']);

    clearFormFields();

    var $form = $('.container-form');
    toggleDisplay($form);

  })

  // Clear Form 
  $('.btn-clear').click(function(){
    clearFormFields();
  });




/******************************************/
/*              INDEX   -- FILTER         */
/******************************************/

// Get the selected filters
  $('.btn-add-filter').on('click', function(e){
    e.preventDefault();

    var sortValue = $('input[name=radio]:checked').val();

    let sortedData = sortData(sortValue);
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
  $('#card-' + prev).css({ zIndex: '1', transform: 'perspective(1500px) rotateX(-120deg)' }).show();
  
  $('#prev-controller').click(function() {
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
          $('#card-' + next).css({zIndex: '0'}).hide();
        }
      });
  });
  
  $('#next-controller').click(function() {
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
  
  $('#port-prev').click(function() {
    $('#portfolio-imgs').css({marginLeft: '0%'});
    
    $(this).hide(500);
    $('#port-next').show(500);
  });
  
  $('#port-next').click(function() {
    $('#portfolio-imgs').css({marginLeft: '-100%'});
    
    $(this).hide(500);
    $('#port-prev').show(500);
  });
  
  $('.default-card').click(function(event) {
    event.stopPropagation();
  });
  
  var selected;
  $('.base').click(function() {
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
  
  $('body').click(function() {
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