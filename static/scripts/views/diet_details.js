var page;
(function () {
    
    var page = (function () {
        
        var formValidation = {
            
            mandatoryFields: function () {
                
                var dietName = $('#diet-name').val(),
                    dieticiansName = $('#dieticians-name').val();
            
                $('.p-info-wrapper .alert').remove();
                $('.user-profile input').removeClass('input-validation-color');
                
                if (dietName.trim().length < 5 || dieticiansName.trim().length < 5) {
                    
                    if (dietName.trim().length < 3) {
                        $('#diet-name').addClass('input-validation-color');   
                    }
                    
                    if (dieticiansName.trim().length < 7) {
                        $('#dieticians-name').addClass('input-validation-color');    
                    }
                    
                        var msg = 'Dietname and dieticians name fields are mandatory and should be at least 5 characters long.',
                            msgType = 'error';
                    
                    $('.user-profile').after(kit.app.ui.validationMsg(msg,msgType));
                
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                    
                    return false;
                
                }
            },
            
            checkNumericSubmit: function() {
            
                var dailyCalorieIntake = $('#d-c-i').val(),
                    carbohydrates = $('#carbohydrates').val(),
                    protein = $('#protein').val(),
                    fats = $('#n-fats').val(),
                    breakfast = $('#breakfast').val(),
                    morningSnack = $('#m-s').val(),
                    lunch = $('#lunch').val(),
                    eveningSnack = $('#e-s').val(),
                    dinner = $('#dinner').val(),
                    fieldsIDsList = ['#d-c-i', '#carbohydrates', '#protein', '#n-fats', '#breakfast', '#m-s', '#lunch', '#e-s', '#dinner'],
                    fieldsValuesList = [dailyCalorieIntake, carbohydrates, protein, fats, breakfast, morningSnack, lunch, eveningSnack, dinner],
                    notNumericList = [];
                
                if(dailyCalorieIntake.length !=0
                    || carbohydrates.length !=0
                    || protein.length !=0
                    || fats.length !=0
                    || breakfast.length !=0
                    || morningSnack.length !=0
                    || lunch.length !=0
                    || eveningSnack.length !=0
                    || dinner.length !=0){
                    
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
            
        };
        
        var calculatePercentage = {
            
            totalCalories: function() {
                
                var dailyCalorieIntake = $('#d-c-i').val(),
                    breakfast = $('#breakfast').val().replace('%', ''),
                    morningSnack = $('#m-s').val().replace('%', ''),
                    lunch = $('#lunch').val().replace('%', ''),
                    eveningSnack = $('#e-s').val().replace('%', ''),
                    dinner = $('#dinner').val().replace('%', ''),
                    totalCaloriesSum,
                    dailyValues = [breakfast, morningSnack, lunch, eveningSnack, dinner],
                    fieldsTotalCalories = [],
                    totalCaloriesPlaceholder = $('.t-c-v'),
                    carbohydrates = $('#carbohydrates').val().replace('%', ''),
                    protein = $('#protein').val().replace('%', ''),
                    fats = $('#n-fats').val().replace('%', ''),
                    macronutritients = [carbohydrates, protein, fats],
                    scrollTopSelector;
                
                $('.dv-wrapper .alert').remove();
                $('.n-v-error').remove();
                $(this).removeClass('input-validation-color');
                
                if(!kit.app.form.numericValues(dailyCalorieIntake)) {
                    
                    var msg = 'Daily calorie intake must be numeric value.',
                        msgType = 'error';
                    
                    $('.user-profile').after('<div class="n-v-error">'+kit.app.ui.validationMsg(msg,msgType)+'</div>');
                    
                }else{
                    
                    if(!kit.app.form.numericValues(breakfast)
                        || !kit.app.form.numericValues(morningSnack)
                        || !kit.app.form.numericValues(lunch)
                        || !kit.app.form.numericValues(eveningSnack)
                        || !kit.app.form.numericValues(dinner)){

                        var msg = 'Only numbers(decimal) are allowed.',
                            msgType = 'error';

                            $('.dv-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));  

                            $('html, body').animate({
                                scrollTop: $('.dv-wrapper').offset().top - 50
                            }, 0);

                        $(this).addClass('input-validation-color');

                    }else{

                        for(i=0; i < dailyValues.length; i++) {

                        fieldsTotalCalories.push((dailyValues[i] / 100) * dailyCalorieIntake); 

                        }

                        totalCaloriesSum = fieldsTotalCalories.reduce(calculatePercentage.getSum);

                        if(totalCaloriesSum > dailyCalorieIntake){

                            var msg = 'Daily Values combined can not exceed 100%.',
                                msgType = 'error';

                            $('.dv-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));

                            $('html, body').animate({
                                scrollTop: $('.dv-wrapper').offset().top - 50
                            }, 0);

                        }else{

                            for(j=0; j < totalCaloriesPlaceholder.length; j++){

                                totalCaloriesPlaceholder.eq(j).text(fieldsTotalCalories[j]);

                            };            

                            $('.t-c-total').text(totalCaloriesSum);

                        }    

                    } 
                    
                }        
                
            },
            
            macronutritients: function() {
                
                var carbohydrates = $('#carbohydrates').val().replace('%', ''),
                    protein = $('#protein').val().replace('%', ''),
                    fats = $('#n-fats').val().replace('%', ''),
                    macronutritientsSum = parseInt(carbohydrates) + parseInt(protein) + parseInt(fats),
                    fieldValue = $(this).val();
                
                $('.macronutritients-wrapper .alert').remove();
                $(this).removeClass('input-validation-color');
                

                if(!kit.app.form.numericValues($(this).val())){

                    var msg = 'Only numbers(decimal) are allowed.',
                        msgType = 'error';

                    $('.macronutritients-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));
                    $(this).addClass('input-validation-color');

                    $('html, body').animate({
                        scrollTop: $('.macronutritients-wrapper').offset().top - 50
                    }, 0);

                }else if(macronutritientsSum != 100){

                    var msg = 'Macronutritients combined should be 100%.',
                        msgType = 'error';

                    $('.macronutritients-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));

                    $('html, body').animate({
                            scrollTop: $('.macronutritients-wrapper').offset().top - 50
                    }, 0);
                 
                }
                            
            },
            
            macronutritientsSubmit: function() {
                
                var carbohydrates = $('#carbohydrates').val(),
                    protein = $('#protein').val(),
                    fats = $('#n-fats').val(),
                    macronutritientsSum = parseInt(carbohydrates) + parseInt(protein) + parseInt(fats);
                
                if(macronutritientsSum != 100){

                    var msg = 'Macronutritients combined should be 100%.',
                        msgType = 'error';

                    $('.macronutritients-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));

                    $('html, body').animate({
                            scrollTop: 0
                    }, 0);
                    
                    return false;
                 
                }
                
            },
            
            dailyValuesTotalSubmit: function() {
                
                 var dailyCalorieIntake = $('#d-c-i').val(),
                    breakfast = $('#breakfast').val(),
                    morningSnack = $('#m-s').val(),
                    lunch = $('#lunch').val(),
                    eveningSnack = $('#e-s').val(),
                    dinner = $('#dinner').val(),
                    totalCaloriesSum,
                    dailyValues = [breakfast, morningSnack, lunch, eveningSnack, dinner],
                    fieldsTotalCalories = [],
                    totalCaloriesPlaceholder = $('.t-c-v');
                
                if(kit.app.form.numericValues(dailyCalorieIntake)) {
                
                    for(i=0; i < dailyValues.length; i++) {

                    fieldsTotalCalories.push((dailyValues[i] / 100) * dailyCalorieIntake); 

                    }

                    totalCaloriesSum = fieldsTotalCalories.reduce(calculatePercentage.getSum);

                    if(totalCaloriesSum > dailyCalorieIntake){

                        var msg = 'Daily Values combined can not exceed 100%.',
                            msgType = 'error';

                        $('.dv-wrapper .segment-title').after(kit.app.ui.validationMsg(msg, msgType));

                        $('html, body').animate({
                            scrollTop: $('.dv-wrapper').offset().top - 50
                        }, 0);

                        return false;

                    }else{

                        for(j=0; j < totalCaloriesPlaceholder.length; j++){

                            totalCaloriesPlaceholder.eq(j).text(fieldsTotalCalories[j]);

                        };            

                        $('.t-c-total').text(totalCaloriesSum);

                    } 
                    
                }    
                
            },
            
            getSum: function(total, value) {
                 
                return total + value 
                
            }
            
        }
        
        function page () {
            
        }
        
        page.prototype.initialize = function () {
            
            kit.app.attachSingle('submit', 'form', formValidation.mandatoryFields);
            kit.app.attachSingle('click', 'a#saveYourDp', formValidation.mandatoryFields);
            kit.app.attachSingle('submit', 'form', formValidation.checkNumericSubmit);
            kit.app.attachSingle('click', 'a#saveYourDp', formValidation.checkNumericSubmit);
            
            calculatePercentage.totalCalories();
            
            kit.app.attachSingle('keyup', '#d-c-i, #breakfast, #m-s, #lunch, #e-s, #dinner', calculatePercentage.totalCalories);
            kit.app.attachSingle('submit', 'form', calculatePercentage.dailyValuesTotalSubmit);
            kit.app.attachSingle('click', 'a#saveYourDp', calculatePercentage.dailyValuesTotalSubmit);
            
            kit.app.attachSingle('keyup', '#carbohydrates, #protein, #n-fats', calculatePercentage.macronutritients);
            kit.app.attachSingle('submit', 'form', calculatePercentage.macronutritientsSubmit);
            kit.app.attachSingle('click', 'a#saveYourDp', calculatePercentage.macronutritientsSubmit);
            
            kit.app.attachSingle('change', '#add-image', formValidation.selectProfileImage);
            
            //this will be moved
            $(".food-tags").select2({
                tags: true,
                placeholder: 'Type Food'
            })  
            
        }
        
        return new page();
        
    })()
    
    kit.page = page;
    
})(window.kit = kit || {});

kit.page.initialize()