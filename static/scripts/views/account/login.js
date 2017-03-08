var page;
(function () {
    
    var page = (function () {
        
        var loginForm = {
            
            inputFocus: function () {
                $(this).prev('span').hide();
                $(this).closest('.input-group').prev('span').hide();
            },
            
            inputBlur: function () {
                if (!$(this).val()) {
                    $(this).prev('span').show();
                    $(this).closest('.input-group').prev('span').show();
                }
            },
            
            inputChange: function () {
                if ($('input').val().length > 1) {
                    $('#username, #password').prev('span').hide();
                    $('#username, #password').closest('.input-group').prev('span').hide();
                }  
            },
            
            inputOnLoad: function () {
                setTimeout(function () {
                    if ($('#username').val().length > 1) {
                        $('#username, #password').prev('span').hide();
                        $('#username, #password').closest('.input-group').prev('span').hide();
                    }
                });    
            }
        }
        
        function page () {
            
        }
        
        page.prototype.initialize = function () {
            
            //handle inputs on focus
            kit.app.attachSingle('focus','#username, #password', loginForm.inputFocus)
            
            //handle inputs on blur
            kit.app.attachSingle('blur','#username, #password', loginForm.inputBlur)
            
            //handle input on change
            kit.app.attachSingle('change','#username, #password', loginForm.inputChange)
            
            //handle input on page load
            kit.app.attachSingle('load', window, loginForm.inputOnLoad)
            
        }
        
        
        return new page();
        
    })()
    
    kit.page = page;
    
})(window.kit = kit || {});

kit.page.initialize()
    
