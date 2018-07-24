$(document).ready(() => {
  $(".card").click(() => {
    $('.duarte-wrapper, .card-expanded-content').removeClass('slide');
    $('.right').removeClass('rotate');
    $('.card, .card-clip, .duarte-wrapper, .name-info, .card-expanded-content, .next, .social')
      .toggleClass('expanded');
  });
  
  $(".next").click(() => {
    $('.duarte-wrapper, .card-expanded-content').toggleClass('slide');
    $('.right').toggleClass('rotate');
  });
});