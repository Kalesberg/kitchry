var page;
(function () {
    
    var page = (function () {
        
        var searchClientsValidation = function() {
  
            var search = $('.search-list').val(),
                msgPlace = $('.search-wrapper');
            
            msgPlace.find('.alert').remove();
            
            if(search.length < 3) {
                
                var msg = 'Your search criteria must contain at least 3 letters.',
                    msgType = 'error';
                
                msgPlace.prepend(kit.app.ui.validationMsg(msg,msgType));
                
            }
            
        }
        
        function page () {
            
        }
        
        page.prototype.initialize = function () {
            
            kit.app.attach('click', '#search-b', searchClientsValidation); 
            
        }
        
        return new page();
        
    })()
    
    kit.page = page;
    
})(window.kit = kit || {});

kit.page.initialize()