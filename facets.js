(function($) {

  Drupal.behaviors.edoweb_drupal_theme_facets = {
    attach: function (context, settings) {

      // append the div for toggle functionality to each facet
      $('.item-list h3', context).each(function() {
        var facetHeader = $(this);
        var facetName = facetHeader.html();

        facetHeader.parent().attr('id', facetName.replace(/\W/g,""));
        //alert(facetName + ': ' +  $.cookie(facetName));
        if ($.cookie(facetName)) {
          facetHeader.append('<div class="toggleButton"><span class="' + $.cookie(facetName) + '"></span>&nbsp;</div>');
          //$(this).find('div span.octicon-triangle-up').parent().parent().parent().find("ul").css('display', 'block');
          facetHeader.find('div span.octicon-triangle-down').parent().parent().parent().find("ul").css('display', 'none');
        } else {
          facetHeader.append('<div class="toggleButton"><span class="octicon octicon-triangle-up"></span>&nbsp;</div>');
        }
      });

      // restore order of facets from cookie
      if ($.cookie('sortFacets')) {
        var sortFacets = $('.item-list h3', context).parent();
        var facetsParent = $('.item-list h3', context).parent().parent();
        var cookieSplit = $.cookie('sortFacets').split(' ');
        var i;
        for (i=0; i < cookieSplit.length; i++) {
          var part = sortFacets.filter('#' + cookieSplit[i].trim());
          facetsParent.append(part);
        };
      }

      // add sortable behaviour to facet list
      $('.edoweb-facets .fieldset-wrapper', context).sortable({
        update: function(event, ui) {
          var sorts = $('.edoweb-facets .fieldset-wrapper', context).sortable('toArray');
          var i = 0;
          var cookieValue = '';
          //alert(sorts.length);
          while (i < sorts.length) {
	    cookieValue = cookieValue +' ' + sorts[i].replace("/","");
            i++;
          }
          $.cookie('sortFacets', cookieValue.trim());
        },
      });

      // toggle functionality
      $('.item-list h3 div span', context).click(function() {
          var facet = $(this).parent().parent().parent().find("ul");
          facet.toggle("clip", function() {
            var facetHeader = $(this).parent().find('h3 div span');
            facetHeader.toggleClass('octicon-triangle-down').toggleClass('octicon-triangle-up');
            var status = facetHeader.attr('class');
            var facetName = facetHeader.parent().parent().parent().attr('id');
            $.cookie(facetName, status);
          });
      });
    }
  };

  Drupal.behaviors.edoweb_drupal_theme_icons = {
    attach: function (context, settings) {

      var icons = {
        'monograph': 'octicon-repo',
        'journal': 'octicon-versions',
        'volume': 'octicon-list-ordered',
        'issue': 'octicon-book',
        'article': 'octicon-file-text',
        'file': 'octicon-file-binary',
        'webpage': 'octicon-browser',
        'version': 'octicon-git-branch',
        'part': 'octicon-file-submodule'
      }

      for (var bundle in icons) {
        var icon = icons[bundle];
        $('#content .form-type-item a[data-bundle="' + bundle + '"]', context).prepend($('<span>&nbsp;</span>').addClass('octicon ' + icon));
        $('#edoweb-tree-menu a[data-bundle="' + bundle + '"]', context).prepend($('<span>&nbsp;</span>').addClass('octicon ' + icon));
        $('.edoweb-tree a[data-bundle="' + bundle + '"]', context).before($('<span>&nbsp;</span>').addClass('octicon ' + icon));
        $('.entity-label-' + bundle, context).before($('<span>&nbsp;</span>').addClass('octicon ' + icon));
        $('body.entity-type-' + bundle + ' h1.title', context).prepend($('<span>&nbsp;</span>').addClass('mega-octicon ' + icon));
      }

      replaceWithIcon($('label a[href="#"]'), 'batch-icons batch-icon-plus', context);
      replaceWithIcon($('label[for="edit-field-edoweb-parent-und"] a[href="#"]', context), 'batch-icons batch-icon-concat');
      replaceWithIcon($('label[for="edit-field-edoweb-identifier-ht-und-0-value"] a[href="#"]', context), 'batch-icons batch-icon-concat');
      replaceWithIcon($('label[for="edit-field-edoweb-parallel-und"] a[href="#"]', context), 'batch-icons batch-icon-concat');

      function replaceWithIcon(target, iconCss) {
        target
          .attr('title', target.html())
          .html('<span class="' + iconCss + '"></span>');
      }

    }
  };

  Drupal.behaviors.edoweb_drupal_theme_zoom = {
    attach: function (context, settings) {
      // add zoom control to search result listing
      $('.edoweb-entity-list ul.pager:first', context).append('<div class="toggleButton"><span class="batch-icons batch-icon-zoom-plus"></span><span class="batch-icons batch-icon-zoom-minus"></div>');
      if ($.cookie('table-font-size')) {
        $('table', context).css('font-size', $.cookie('table-font-size') + 'px');
      }
      $('.edoweb-entity-list ul.pager span.batch-icon-zoom-plus', context).click(function() {
        var size = $('table').css('font-size');
        var newSize = parseFloat(size) + 1;
        $('table').css('font-size', newSize);
        $.cookie("table-font-size", newSize);
      });
      $('.edoweb-entity-list ul.pager span.batch-icon-zoom-minus', context).click(function() {
        var size = $('table').css('font-size');
        var newSize = parseFloat(size) - 1;
        $('table').css('font-size', newSize);
        $.cookie("table-font-size", newSize);
      });
    }
  };

  Drupal.behaviors.edoweb_drupal_theme_flatrows = {
    attach: function (context, settings) {

      // append the div for toggle functionality to each row heading
      $('div.compact div', context).parent().find('h1').each(function() {
        var rowHeader = $(this);
    	    rowHeader.append('<div class="toggleButton"><span class="octicon octicon-triangle-down"></span>&nbsp;</div>');
        });

	$('div.compact div.field').hide();

	$('div.compact h1 div', context).click(function(){
          $(this).parent().parent().find('div.field').toggle("clip", function() {
            var compactHeader = $(this).parent().find('h1 div span');
            compactHeader.toggleClass('octicon-triangle-down').toggleClass('octicon-triangle-up');
            var status = compactHeader.attr('class');
          });
      });

    }
 };


  Drupal.behaviors.edoweb_drupal_theme_facetflip = {
    attach: function (context, settings) {

      // append the div for toggle functionality to each row heading
      $('.edoweb-facets legend', context).each(function() {
        var rowHeader = $(this);
    	    rowHeader.append('<div class="toggleButton"><span class="octicon octicon-triangle-left"></span>&nbsp;</div>');
        });

      /*$('.edoweb-facets', context).resizable({
	alsoResize:'.edoweb-entity-list',
	});
	*/

	$('.edoweb-facets legend', context).click(function(){
          $(this).parent().find('div.fieldset-wrapper').toggle("clip", function() {
            var compactHeader = $(this).parent().find('legend div span');
            compactHeader.toggleClass('octicon-triangle-left').toggleClass('octicon-triangle-down');
	    compactHeader.parent().parent().parent().toggleClass('edoweb-facets-smart').toggleClass('edoweb-facets');
	    compactHeader.parent().parent().parent().parent().find('.edoweb-entity-list').toggleClass('edoweb-entity-list-smart').toggleClass('.edoweb.entity-list');
            var status = compactHeader.attr('class');
          });
      });

    }
 };



  //Drupal.behaviors.edoweb_drupal_theme_datepicker = {
  //  attach: function (context, settings) {
  //    // datepicker
  //    $('#edit-field-edoweb-issued-und-0-value', context).datepicker({
  //      changeMonth:true,
  //      changeYear:true,
  //      dateFormat:"dd.mm.yy" 
  //    });
  //  }
  //};
})(jQuery);
