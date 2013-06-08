var ELEMENT_REFS = function () {
    this.container = $( "#container" );
    this.menu = $( "#menu" );
    this.window = $( window );
    this.body = $( "BODY" );
    this.fixedEls = $( ".fixed-top" );
    this.menuLinks = {
       home : $( "#title" ),
       info : $( "#infoA" ),
       cantMiss : $( "#cantMissA" ),
       activities : $( "#activitiesA" )
    };
    this.vopts= $( ".vopt" );
};

(function(){

    var $EL = null;
    
    $( window ).ready( function(){ setTimeout( initElements, 200 ); } );
    
    function initElements(){
        $EL = new ELEMENT_REFS();
        $EL.menuLinks.home.click(     function() { scrollToElement( "#home" ); } );
        $EL.menuLinks.info.click(     function() { scrollToElement( "#info" ); } );
        $EL.menuLinks.cantMiss.click( function() { scrollToElement( "#cantMiss" ); } );
        $EL.fixedEls.each( function( index, value ){
          $EL.fixedEls[index].docked=false;
          $EL.fixedEls[index].initialTop=$(value).offset().top;
        });
        $EL.vopts.click( function(){
          $option = $( this );
          $option.parent().find( ".vopt" ).removeClass( "active" );
          $option.addClass( "active" );
          $option.parent().parent().find( ".vcontainer" ).slideUp( function(){
              $(this).html( $option.find( ".vopt-content" ).html() ); 
          } ).slideDown(); 
        });
        
        $EL.window.scroll( function () {
            
            $.each( $EL.fixedEls, function( index, value ){
                
                var currEl = $EL.fixedEls[index];
                var $currEl = $( currEl );
                
                if (!currEl.docked && ( $currEl.offset().top - $EL.window.scrollTop() < 0)) {
                    $currEl.css({ 
                        top : 0,
                        position : 'fixed'
                    }).addClass( 'docked' );
                    currEl.docked = true;
                } else if ( currEl.docked && $EL.window.scrollTop() <= currEl.initialTop ) {
                    $currEl.css({ 
                        top : currEl.initialTop + 'px',
                        position : 'absolute'
                    }).removeClass( 'docked' );
                    currEl.docked = false;
                }         
            });
        });
        
        $EL.window.stellar();
    }
    
    function scrollToElement( selector ){
        $EL.body.stop( true, false ).animate({
            scrollTop: $( selector ).offset().top
        }, 2000, 'easeInOutQuint');
    }
})();