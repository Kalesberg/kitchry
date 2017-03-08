var page;
(function () {
    
    var page = (function () {
        
        
        
        function page () {
            
        }
        
        page.prototype.initialize = function () {
        
          //dropdown link select value
           kit.app.attach('click', '[aria-labelledby="select-d-u"] li a', function(e){
                e.preventDefault();
                $(this).parents(".dropdown").find('#select-d-u').html($(this).text() + '<span class="caret pull-right"></span>');
            });
        }
        
        return new page();
        
    })()
    
    kit.page = page;
    
})(window.kit = kit || {});

kit.page.initialize()