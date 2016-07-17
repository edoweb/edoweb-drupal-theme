(function($) {



  Drupal.behaviors.edoweb_drupal_notationWA = {
    attach: function (context, settings) {

      $('.field-name-field-edoweb-rpb-subject .field-item').each(function() {
        var notationAttr = $(this).find('a.resolved').attr('data-curie').replace(/https:\/\/w3id.org\/lobid\/rpb2#n/,'')
        .replace(/:n/, '');
        $(this).prepend('<span class="lbznotation">' + notationAttr + '</span>');
    
      });
    }
  };

})(jQuery);


