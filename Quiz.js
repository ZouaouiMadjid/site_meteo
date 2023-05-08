document.querySelector('.btn').addEventListener('click', function() {
  window.scrollTo(0,document.body.scrollHeight);
});



(function () {
    var carouselTransition, carouselContent, carouselIndex, carouselLength, firstClone, firstItem, isAnimating, itemWidth, lastClone, lastItem;
    carouselTransition = 250;
    carouselContent = $('.carousel__content');
    carouselIndex = 0;
    carouselMax = 0;
    carouselLength = carouselContent.children().length;
    isAnimating = false;
    itemWidth = 100 / carouselLength;
    firstItem = $(carouselContent.children()[0]);
    lastItem = $(carouselContent.children()[carouselLength - 1]);
    firstClone = null;
    lastClone = null;
    carouselContent.css('width', carouselLength * 100 + '%');
    carouselContent.transition({ x: carouselIndex * -itemWidth + '%' }, 0);
    $.each(carouselContent.children(), function () {
        return $(this).css('width', itemWidth + '%');
    });
    $('.nav--buttons--left').on('click', function (event) {
        event.preventDefault();
        if (isAnimating || carouselIndex === 0) {
            return;
        }
        isAnimating = true;
        carouselIndex--;
        update_progress_bar(carouselIndex);
        $(".nav--buttons--right").css("display", "block");
        if (carouselIndex === 0 || carouselIndex === 1) {
          $(".nav--buttons--left").css("display", "none");
        }
        return carouselContent.transition({ x: carouselIndex * -itemWidth + '%' }, carouselTransition, 'ease', function () {
            return isAnimating = false;
        });
    });
    $('.nav--buttons--right').on('click', function (event) {
        event.preventDefault();
        if (isAnimating || carouselIndex === carouselLength - 1) {
            return;
        }
        isAnimating = true;
        carouselIndex++;
        update_progress_bar(carouselIndex);
        if ( carouselIndex > carouselMax ) {
          carouselMax = carouselIndex;
        }
        $(".nav--buttons--left").css("display", "block");
        if (carouselIndex === carouselLength - 1 || carouselIndex === carouselMax) {
          $(".nav--buttons--right").css("display", "none");
        }
        if (carouselIndex === 1) {
          $(".nav--buttons--left").css("display", "none");
        }
        return carouselContent.transition({ x: carouselIndex * -itemWidth + '%' }, carouselTransition, 'ease', function () {
            return isAnimating = false;
        });
    });
}.call(this));





function calc_results() {
  var count;
  $(".questions").each(function(){
    if(this.is(":checked")) {
      count++;
    }
  });
}

var results = [
  ["35", "40", "45"],     // 0
  /*["6.8", "45", "61"], // 0 Réponse : Combien de personnes vivent dans votre foyer ? */
  ["4.4", "5.3", "0"],     // 1 Réponse : Je possède une voiture ou j'utilise régulièrement des transports en commun
  ["2.5", "2.6", "2.2"],   // 2 Réponse : J'ai acheté un appareil électronique neuf récemment
  /*["15.2", "18.0", "20.8"], // 2 Réponse : Utilisez-vous un lave-vaisselle et/ou un lave-linge économe en eau et en énergie ?*/
  ["5.5", "3.1", "3.3"],   // 3 Réponse : Je consomme de la viande ou des produits laitiers tous les jours
  ["3.2", "5.7", "2.1"],   // 4 Réponse : J'ai récemment changé mon système de chauffage ou d'eau chaude
  ["2.8", "5.2", "2.8"],   // 5 Réponse : J'ai récemment rénové ou agrandi ma maison
  ["10.0", "11.0", "12.0"],// 6 Réponse : J'ai récemment voyagé en avion
  /*["12.0", "8.0", "14.0"], // 6 Réponse : Avez-vous récemment installé des toilettes à faible débit pour économiser l'eau ? */
  ["4.5", "4.3", "5.5"],   // 7 Réponse : J'ai récemment changé mes habitudes de consommation pour réduire mon impact environnemental
  ["12.0", "8.0", "14.0"], // 8 Réponse : J'ai récemment installé des panneaux solaires ou des éoliennes chez moi
  ["1.5", "1.3", "1.5"],   // 9 Réponse : J'ai récemment remplacé des ampoules par des LED
  ["1.2", "1.4", "2.1"],   // 10 Réponse : J'ai récemment composté mes déchets organiques
  ["3.6", "4.1", "2.8"],   // 11 Réponse : Avez-vous utilisé des sacs en plastique jetables récemment ?
  ["2.2", "2.9", "4.5"],   // 12 Réponse : Avez-vous des habitudes de gaspillage alimentaire régulièrement ?
  ["4.3", "3.8", "4.2"],   // 13 Réponse : Avez-vous utilisé des produits ménagers chimiques récemment ?
  ["3.1", "4.2", "2.9"],   // 14 Réponse : Avez-vous acheté des vêtements neufs récemment ?
  ["2.7", "3.5", "4.1"]    // 15 Réponse : Avez-vous utilisé des bouteilles d'eau en plastique récemment ?
];
  
function sumArray(from, to, size) {
  var sum = parseFloat("0.00");
  for ( var i = from; i <= to; i++ ) {
    sum += parseFloat(results[i][size]);
  }
  return sum.toFixed(1).toString();
}

function calc_results(button_elem) {
  var count = 0;
  var checked = 0;
  var size = $("input[name=size]:checked").val();
  $(":checked").each(function() {
    checked++;
  });
  if ( checked != 16 ) {
    alert("Please check all of the questions.");
    return;
  }
  $(".questions").each(function() {
    if ( $(this).is(":checked") ) {
        count++;
    }
  });
  var less = sumArray(0, count-1, size) ;
  var same = sumArray(count, count, size);
  var more = sumArray(count+1, 15, size);

  var resultsText = "";
  resultsText += '<div class="container">';
  resultsText += '<h2 style="margin-top: 0.5em; color: #00a5b5;text-transform: none; text-align: center; font-size: 30px;">Où vous situez vous ?</h2><br><br><br>';
  resultsText = resultsText + '<h3 style="text-transform: none; text-align: center;">Vous avez répondu favorablement à <strong>' + (count) + '</strong> des 15 questions permettant d\'évaluer votre estimation moyenne de l\'empreinte carbone d\'une personne en fonction du nombre de personnes vivant dans votre foyer, qui est composé de <strong>' + $("input[name=size]:checked").attr('data-value') + '</strong> personnes.</h3><br><br><br>';
  resultsText += '<div style="margin-top: 2.5em;" class="score-slider-track">';
  resultsText += '<div class="score-slider">0%</div>';
  resultsText += '<div class="score-slider-less">0%</div>';
  resultsText += '<div class="score-slider-more">0%</div>';
  resultsText += '</div><br>';
  resultsText += '<div class="flex-grid mb">';
  resultsText += '<div class="flex-two flex-fewer">';
  resultsText = resultsText + '<p style="margin: 0; font-size: 4em;">' + less + "%" + '</p>';
  resultsText += '<p style="margin: 0;text-transform: none;">des personnes avec un foyer de taille similaire ont effectué <strong>moins</strong> de tâches</p>';
  resultsText += '</div>';
  resultsText += '<div class="flex-two flex-same">';
  resultsText = resultsText + '<p style="margin: 0; font-size: 5em;">' + same + "%" + '</p>';
  resultsText += '<p style="margin: 0;text-transform: none;">des personnes avec un foyer de taille similaire ont effectué le <strong>même</strong> nombre de tâches</p>';
  resultsText += '</div>';
  resultsText += '<div class="flex-two flex-more">';
  resultsText = resultsText + '<p style="margin: 0; font-size: 4em;">' + more + "%" + '</p>';
  resultsText += '<p style="margin: 0; text-transform: none;">des personnes avec un foyer de taille similaire ont effectué <strong>plus</strong> de tâches</p>';
  resultsText += '</div>';
  resultsText += '</div>';
  resultsText += '</div><br><br>';
  resultsText += '<h3 style="text-align: center; text-transform: none;">Consultez l\'intégralité du rapport d\'enquête</h3><a style="display: flex; justify-content: center; lign-items: center;"class="btn btn-primary" href="https://www.lemonde.fr/les-decodeurs/article/2015/12/05/quelques-conseils-pratiques-pour-reduire-son-empreinte-carbone_4825370_4355770.html" target="_blank">Lire</a>';


  $("#auto-con-calc").html(resultsText);
  sliderControl(less,same,more);
  $("#auto-con-calc").slideDown("fast", function() {
    $('html, body').animate({
       scrollTop: $('#auto-con-calc').offset().top
    }, 'slow');
  });
}

function update_progress_bar(index) {
  var checked = index;
  if ( checked === 0 ) {
    $(".progress-bar-insider").css("width", "4%");
  }
  else {
    checked = checked - 1;
    $(".progress-bar-insider").css("width", ((checked/15)*96 + 4) + "%");
  }
  if (checked < 16) {
    $(".progress-bar-insider").attr("data-progress", (checked + 1) + "/16");
  }
  else {
    $(".progress-bar-insider").attr("data-progress", "");
  }
}

$(".carousel--item input[type=radio]").click(function(){
  $("#auto-con-calc").slideUp();
  $('.nav--buttons--right').trigger('click');
});

function sliderControl(less, same, more) {
  var less_slider = $(".score-slider-less");
  var same_slider = $(".score-slider");
  var more_slider = $(".score-slider-more");

  if ( same < 5.00 ) {
    same_slider.css("width", "5%");
  }
  else {
    less_slider.css("width", same + "%");
  }
  same_slider.css("left", less + "%").html(same + "%");
  less_slider.css("width", (parseFloat(less) + (parseFloat(same) / 2)) + "%").html(less + "%");
  more_slider.css("width", (parseFloat(more) + (parseFloat(same) / 2)) + "%").html(more + "%");
}
