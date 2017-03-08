var page;
(function () {
    
    var page = (function () {
        
        var changeMetrics = function() {
            
            var userHeightV1 = $('#user-height-v1').val(),
                userHeightV2 = $('#user-height-v2').val(),
                userWeightV1 = $('#user-weight-v1').val(),
                userWeightV2 = $('#user-weight-v2').val(),
                fieldsValuesList = [userHeightV1, userHeightV2, userWeightV1, userWeightV2];
                    
            if($("#m-value").is(':checked')){
 
                $('.height-wrapper .s-val1').text('meter:');
                $('.height-wrapper .s-val2').text('centimeter:');
                $('.weight-wrapper .s-val1').text('kilograms:');
                $('.weight-wrapper .s-val2').text('grams:');
                
                if(userHeightV1.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var m = userHeightV1 / 3.2808 
                    
                    $('#user-height-v1').val(m.toFixed(4));
                    
                }
                
                if(userHeightV2.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var cm = userHeightV2 / 0.39370 
                    
                    $('#user-height-v2').val(cm.toFixed(4));
                    
                }
                
                if(userWeightV1.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var kg = userWeightV1 / 2.2046
                    
                    $('#user-weight-v1').val(kg.toFixed(4));
                    
                }
                
                if(userWeightV2.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var gr = userWeightV2 / 0.035274
                    
                    $('#user-weight-v2').val(gr.toFixed(4));
                    
                }
                
            }else{
                
                $('.height-wrapper .s-val1').text('feet:');
                $('.height-wrapper .s-val2').text('inch:');
                $('.weight-wrapper .s-val1').text('pounds:');
                $('.weight-wrapper .s-val2').text('ounces:'); 
                
                if(userHeightV1.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var ft = userHeightV1 * 3.2808 
                    
                    $('#user-height-v1').val(ft.toFixed(4));
                    
                }
                
                if(userHeightV2.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var inch = userHeightV2 * 0.39370 
                    
                    $('#user-height-v2').val(inch.toFixed(4));
                    
                }
                
                if(userWeightV1.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var pound = userWeightV1 * 2.2046
                    
                    $('#user-weight-v1').val(pound.toFixed(4));
                    
                }
                
                if(userWeightV2.length !=0 && kit.app.form.numericValues(userHeightV1)){
                    
                    var ounce = userWeightV2 * 0.035274
                    
                    $('#user-weight-v2').val(ounce.toFixed(4));
                    
                }
                
            }
            
        };
        
        var formValidation = {
            
            mandatoryFields: function(){
                
                var userName = $('#user-name').val(),
                    email = $('#email').val();
                
                $('.p-info-wrapper .alert').remove();
                $('.user-profile input').removeClass('input-validation-color');
            
                if(userName.trim().length < 3 || email.trim().length < 7 || !kit.app.form.validateEmail(email)) {
                
                    var msg = 'Username and Email fields are mandatory.',
                        msgType = 'error';
                    
                    if(userName.trim().length < 3){
                        $('#user-name').addClass('input-validation-color');    
                    }
                    
                    if(email.trim().length < 7){
                        $('#email').addClass('input-validation-color');    
                    }
                    
                    if( email.trim().length != 0 && !kit.app.form.validateEmail(email)) {
                        
                        msg = 'Please make sure your email is valid.'
                        $('#email').addClass('input-validation-color');
                        
                    }
                
                    $('.user-profile').after(kit.app.ui.validationMsg(msg,msgType));
                
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                    
                    return false;
                
                }
                
            },
            
            checkNumericSubmit: function() {
                
                var age =  $('#user-age').val(),
                    userHeightV1 = $('#user-height-v1').val(),
                    userHeightV2 = $('#user-height-v2').val(),
                    userWeightV1 = $('#user-weight-v1').val(),
                    userWeightV2 = $('#user-weight-v2').val(),
                    bmi = $('#user-bmi').val(),
                    bodyFat = $('#user-body-fat').val(),
                    fieldsIDsList = ['#user-age', '#user-height-v1', '#user-height-v2', '#user-weight-v1', '#user-weight-v2', '#user-bmi', '#user-body-fat'],
                    fieldsValuesList = [age, userHeightV1, userHeightV2,  userWeightV1, userWeightV2, bmi, bodyFat],
                    notNumericList = [];
                
                if(age.length != 0 
                    || userHeightV1.length !=0 
                    || userHeightV2.length !=0 
                    || userWeightV1.length !=0
                    || userWeightV2.length !=0
                    || bmi.length !=0
                    || bodyFat.length !=0){
                    
                    $('.s-wrapper input').removeClass('input-validation-color');
                    
                    for(i=0; i < fieldsValuesList.length; i++) {
                           
                        if(fieldsValuesList[i].length !=0 && !kit.app.form.numericValues(fieldsValuesList[i])){
                            notNumericList.push(i)
                        }
                            
                    }
                    
                }
                
                notNumericList.forEach(function(j) {
                  
                    $(fieldsIDsList[j]).addClass('input-validation-color');
                    
                });

                if(notNumericList.length != 0){
                                        
                    var msg = 'Below selected fields must contain numeric value.',
                        msgType = 'error';
                    
                    $('.user-profile').after('<div class="n-v-error">'+kit.app.ui.validationMsg(msg,msgType)+'</div>');
                    
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                    
                    return false;
                }
                
            },
            
            checkNumericRealTime: function(){
                
                fieldValue = $(this).val();
                
                $(this).closest('.row.p-l-50').closest('.s-wrapper').find('.alert').remove();
                $(this).removeClass('input-validation-color');
                
                if(fieldValue.length != 0) {
                
                    if(!kit.app.form.numericValues(fieldValue)) {
                        
                        //you need to check for all fields
                        var msg = 'Only numbers(decimal) are allowed.',
                            msgType = 'error';
                        
                        $(this).addClass('input-validation-color');
                        $(this).closest('.row.p-l-50').before(kit.app.ui.validationMsg(msg, msgType));
                        
                        $('html, body').animate({
                            scrollTop: $(this).closest('.row.p-l-50').closest('.s-wrapper').offset().top - 50
                        }, 0);
                        
                    }
                    
                }
                
            },
            
            selectProfileImage: function(image){
               
                var selectFile = $(this).val(),
                    fileExtension = selectFile.split('.').pop().toLowerCase(),
                    allowedExtensions = ['jpg','jpeg','png'];

                $('.p-info-wrapper .alert').remove();

                if ($.inArray(fileExtension, allowedExtensions) == -1) {
                    
                    var msg = 'Ooops! Please select the correct file type (jpg, jpeg or png).',
                        msgType = 'error';
                    
                    $('.user-profile').after(kit.app.ui.validationMsg(msg,msgType));
                    $(this).replaceWith($(this).val('').clone(true)); 
                    $('#saveInfo').prop('disabled', true); 
                  
                }else{
                    
                    $('.profile-img-wrapper img').remove();
                    $('#saveInfo').prop('disabled', false); 
                    $('.profile-img-wrapper').prepend('<img class="img-responsive" src="' + URL.createObjectURL(image.target.files[0]) + '">');
                    
                }
           
            }
        }
        
        function page () {
            
        }
        
        page.prototype.initialize = function () {
            
            kit.app.attachSingle('submit', 'form', formValidation.mandatoryFields);
            kit.app.attachSingle('submit', 'form', formValidation.checkNumericSubmit);
            
            kit.app.attachSingle('change', '#add-image', formValidation.selectProfileImage);
            
            kit.app.attachSingle('change', '#m-value', changeMetrics);
            
            kit.app.attachSingle('keyup', '#user-age, #user-height-v1, #user-height-v2, #user-weight-v1, #user-weight-v2, #user-bmi, #user-body-fat', formValidation.checkNumericRealTime);
            
            //datetime picker
            $('.date-wrapper, #goal-start-date, #goal-end-date').datetimepicker({
                minDate: moment().startOf('d'),
                format: 'YYYY-MM-DD'
            }).on("dp.change", function(e) {
                
                $('.bootstrap-datetimepicker-widget').hide();
                
            }).on("dp.hide", function(e) {
                
                $('.goals .alert').remove();
                
                var goalStartDate = new Date($('#goal-start-date').val()),
                    goalEndDate = new Date($('#goal-end-date').val());
                
                if(goalEndDate < goalStartDate){
                    
                    var msg = 'End date can not be before start date.',
                        msgType = 'error';
                    
                    $('.goals .segment-title').after(kit.app.ui.validationMsg(msg, msgType));
                    
                }
                
            })
            
        }
        
        return new page();
        
    })()
    
    kit.page = page;
    
})(window.kit = kit || {});

kit.page.initialize()