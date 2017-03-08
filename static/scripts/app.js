var kit;
(function () {
    
    //app
    var app = (function() {
        
        var adjustFooter = function(){
            
            var bodyHeight = $('body').height() + 70;
            var windowHeight = $(window).height();
            
            if(bodyHeight > windowHeight){
                $('footer').css('position', 'relative');
            }else{
                $('footer').removeAttr('style');
            }
            
        }
        
        function app() {
            
        }
        
        app.prototype.initialize = function () {
          
            //tooltips
            $('body').tooltip({
                container: 'body',
                trigger : 'hover',
                selector:'[data-toggle="tooltip"], [data-hover="tooltip"]'
            });
                        
            //dropdown prevent close on click inside
            this.attachSingle ('click', '#n-menu', function(e){
                e.stopPropagation();
            });
            
            //dropdown select value
            this.attach('click', '.input-wrapper .dropdown-menu li a', function(e){
                e.preventDefault();
                $(this).parents(".dropdown").find('.btn').html('<span class="pull-left text-capitalize">' + $(this).text() + '</span>' + '<span class="caret pull-right"></span>');
                $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
                $(this).parents(".dropdown").find('.dropdown-value').val($(this).data('value'));
            });
            
            //close msg
            this.attach('click', '[data-fade="alert"]',function(e){
                e.preventDefault();
                $(this).closest('div').remove();
            });
            
            //adjust footer
            adjustFooter();
            this.attachSingle('resize', window, adjustFooter);
            
        }
        
        app.prototype.attach = function (event, selector, callback) {
            $(document).on(event, selector, callback)
        }
        
        app.prototype.attachSingle = function (event, selector, callback) {
            $(selector).on(event, callback)
        }
        
        app.prototype.ui = {
            
            validationMsg: function (msg,msgType){
                
                var msgHtml='<div class="alert ' +msgType+ '-msg show">' +msg+ '<a href="#" class="close" data-fade="alert" aria-label="close">&times;</a></div>';
                return msgHtml;
                
            },
            
            sistemErrorMsg: function(msg){
                
                var msg = 'Ooops! We are sorry, but something went wrong. We have been notified about this issue and we will take a look at it shortly.',
                    msgHtml='<div class="sistem-error text-center">' +msg+ '<a href="#" class="close" data-fade="alert" aria-label="close">&times;</a></div>';
                
                return msgHtml;
            },
            
            actionLoader: function(){
                
                var msgHtml = '<div class="loader-wrapper text-center"><span class="loader"></span></div>';
                return msgHtml;
                
            }

        }
        
        app.prototype.form = {
        
            validateEmail: function(email) {
                
                var emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

                return $.trim(email).match(emailPattern) ? true : false;
                
            },
            
            numericValues: function(fieldValue){
                
                var allowedPatern = /^[0-9]+\.?[0-9]*$/;
                
                return allowedPatern.test($.trim(fieldValue));
                
            }
            
        }
        
        return new app();
        
    })()
    
    kit.app = app;  
    
})( window.kit = kit || {});

kit.app.initialize()