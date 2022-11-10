$(function() {

    'use strict';

    $('.js-menu-toggle').click(function(e) {

        var $this = $(this);

        if ($('body').hasClass('show-sidebar')) {
            $('body').removeClass('show-sidebar');
            $this.removeClass('active');
        } else {
            $('body').addClass('show-sidebar');
            $this.addClass('active');
        }

        e.preventDefault();

    });

    // click outisde offcanvas
    $(document).mouseup(function(e) {
        var container = $(".sidebar");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('show-sidebar')) {
                $('body').removeClass('show-sidebar');
                $('body').find('.js-menu-toggle').removeClass('active');
            }
        }
    });

});


//Juego de Modals
$(document).ready(function() {
    $(document).on({
        'show.bs.modal': function() {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        },
        'hidden.bs.modal': function() {
            if ($('.modal:visible').length > 0) {
                // restore the modal-open class to the body element, so that scrolling works
                // properly after de-stacking a modal.
                setTimeout(function() {
                    $(document.body).addClass('modal-open');
                }, 0);
            }
        }
    }, '.modal');
});


/*
$(document).ready(function() 
{
	$("#show_hide_password").on('click', function(event) 
	{
		alert("Hola");
        event.preventDefault();
		if($('#txtClave').attr("type") == "text")
		{
            $('#txtClave').attr('type', 'password');
            //$('#show_hide_password i').addClass( "fa-eye-slash" );
            //$('#show_hide_password i').removeClass( "fa-eye" );
		}else if($('#txtClave').attr("type") == "password")
		{
            $('#stxtClave').attr('type', 'text');
            //$('#show_hide_password i').removeClass( "fa-eye-slash" );
            //$('#show_hide_password i').addClass( "fa-eye" );
        }
    });
});
*/