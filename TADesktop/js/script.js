console.log('Javascript Ready');

$(document).ready(function(){
	console.log('jQuery Loaded');
	
	$('#dialog').dialog({
		draggable : false,
		resizable : false,
		modal : true,
		autoOpen : false,
		buttons : {
			"OK" : function() {
				$(this).dialog('close');
			}
		}
	});
	$('#finalCheck').dialog({
		draggable : false,
		resizable : false,
		modal : true,
		autoOpen : false,
		buttons : {
			"Submit" : function() {
				$(this).dialog('close');
			},
			"Cancel" : function() {
				$(this).dialog('close');
			}
		}
	});
	
	$('#tabs').tabs();
	
	$( "#tabs" ).tabs( "option", "disabled", [ 1, 2, 3, 4 ] );
	
	//tab 1
	
	
	$('#availDate').datepicker({
        changeMonth : true,
        minDate : 0,
        dateFormat : 'm/dd/yy'
    });
	
	$('#availDate').change(function() {
		$(this).valid();
	});
	
	$('input[type="radio"]').button();
	
	$('#state').selectmenu()
		.selectmenu("menuWidget")
		.addClass("overflow");
	
	$('#position').selectmenu()
		.selectmenu("menuWidget")
		.addClass("overflow");
	
	$('.citizenhide').hide();
	
	$('#workbox').hide();
	
	$('#felonyexplain').hide();
	
	$('input[name="us"]').click(function() {
		if ($(this).val()=="n"){
			$('.citizenhide').show();
			$('#canwork').addClass('required');
		} else {
			$('.citizenhide').hide();
			$('#canwork').removeClass('required');
		}
	});
	
	$('input[name="prevwork"]').click(function() {
		if ($(this).val()=="y"){
			$('#workbox').show();
			$('#workexplain').addClass('required');
		} else {
			$('#workbox').hide();
			$('#workexplain').removeClass('required');
		}
	});
	
	$('input[name="felony"]').click(function() {
		if ($(this).val()=="y"){
			$('#felonyexplain').show();
			$('#explainfelon').addClass('required');
		} else {
			$('#felonyexplain').hide();
			$('#explainfelon').removeClass('required');
		}
	});
	
	$('#state').selectmenu({change: function() {
		var sel = $('#state option:selected').val();
		if (sel == "ss") {
			$('#stateError').text("Please specify a different (non-default) value").css('display', 'visible');
		}
		else {
			$('#stateError').text(" ");
		}
		
	}});
	
	$('#position').selectmenu({change: function() {
		var sel = $('#position option:selected').val();
		if (sel == "sp") {
			$('#positionError').text("Please specify a different (non-default) value").css('display', 'visible');
		} else {
			$('#positionError').text(" ");
		}
	}});
	

	
	$('#firstNext').click(function() {
		var isValid = true;
		var sel = $('#state option:selected').val();
		if (sel == "ss") {
			isValid = false;
			$('#stateError').text("Please specify a different (non-default) value").css('display', 'visible');
		} else {
			$('#stateError').text(" ");
		}
		if ($('#position option:selected').val() == "sp") {
			isValid	= false;
			$('#positionError').text("Please specify a different (non-default) value").css('display', 'visible');
		} else {
			$('#positionError').text(" ");
		}
		if($('#generalForm').valid() && isValid) {
			var currentTab = ($('#tabs').tabs('option', 'active'));
			/*$('#tabs').tabs('enable', currentTab + 1);
			$('#tabs').tabs('option', 'active', currentTab + 1);*/
			moveToNextTab(currentTab);
		} else {
			$('#dialog').dialog('open');
		}
	});
	
	//tab 2
	
	$('.other').hide();
	
	$('.schooldate').datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: 0,
		yearRange: '-120:+0',
		dateFormat: 'MM yy'
	});
	
	$('.schooldate').change(function() {
		$(this).valid();
	});
	
	$('input[name="hsgrad"]').click(function() {
		if ($(this).val()=="n"){
			$('.nohs').hide();
			$('input[name="hsdiploma"]').removeClass('required');
			$('input[name="hsdiploma"]').removeClass('required');
			$('input[name="collegeName"]').removeClass('required');
			$('input[name="collegeaddress"]').removeClass('required');
			$('input[name="collegeStart"]').removeClass('required');
			$('input[name="collegeEnd"]').removeClass('required');
			$('input[name="clgrad"]').removeClass('required');
			$('input[name="collegedegree"]').removeClass('required');
		} else {
			$('.nohs').show();
			$('input[name="hsdiploma"]').addClass('required');
			$('input[name="collegeName"]').addClass('required');
			$('input[name="collegeaddress"]').addClass('required');
			$('input[name="collegeStart"]').addClass('required');
			$('input[name="collegeEnd"]').addClass('required');
			$('input[name="clgrad"]').addClass('required');
			$('input[name="collegedegree"]').addClass('required');
		}
	});
	
	$('input[name="clgrad"]').click(function() {
		if ($(this).val()=="n"){
			$('.nocol').hide();
			$('input[name="collegedegree"]').removeClass('required');
		} else {
			$('.nocol').show();
			$('input[name="collegedegree"]').addClass('required');
		}
	});
	
	$('#addOther').button({
		icons : {
			primary : 'ui-icon-plusthick'
		}
	}).click(function(){
		if($(this).button('option', 'label')=="Add Other Education") {
			$('.other').show();
			$('input[name="otherName"]').addClass('required');
			$('input[name="otheraddress"]').addClass('required');
			$('input[name="otherStart"]').addClass('required');
			$('input[name="otherEnd"]').addClass('required');
			$('input[name="otgrad"]').addClass('required');
			$('input[name="otherdegree"]').addClass('required');
			$(this).button('option', 'label', 'Remove Other Education');
			$(this).button({
				icons : {
					primary : 'ui-icon-minusthick'
				}
			});
		} else {
			$('.other').hide();
			$('input[name="otherName"]').removeClass('required');
			$('input[name="otheraddress"]').removeClass('required');
			$('input[name="otherStart"]').removeClass('required');
			$('input[name="otherEnd"]').removeClass('required');
			$('input[name="otgrad"]').removeClass('required');
			$('input[name="otherdegree"]').removeClass('required');
			$(this).button('option', 'label', 'Add Other Education');
			$(this).button({
				icons : {
					primary : 'ui-icon-plusthick'
				}
			});
		}
		
	});
	
	$('input[name="otgrad"]').click(function() {
		if ($(this).val()=="n"){
			$('.noother').hide();
			$('input[name="otherdegree"]').removeClass('required');
		} else {
			$('.noother').show();
			$('input[name="otherdegree"]').addClass('required');
		}
	});
	
	$('#secondNext').click(function() {
		if($('#educationForm').valid()) {
			var currentTab = ($('#tabs').tabs('option', 'active'));
			//$('#tabs').tabs('option', 'active', currentTab + 1);
			moveToNextTab(currentTab);
		} else {
			$('#dialog').dialog('open');
		}
	});
	
	//Tab 3
	
	var numReferences;
	numReferences = 1;
	
	var numEmps;
	numEmps = 1;
	
	$('#ref2').hide();
	$('#ref3').hide();
	$('#emp2').hide();
	$('#emp3').hide();
	
	$('#addReference').button({
		icons : {
			primary : 'ui-icon-plusthick'
		}
	}).click(function(){
		if (numReferences != 3) {
			numReferences = numReferences + 1;
			if($("#ref2").css('display') == 'none') {
				$('#ref2').show();
				var inputs2 = $('#ref2 :input');
				inputs2.addClass('required');			
			} else {
				$('#ref3').show();
				var inputs3 = $('#ref3 :input');
				inputs3.addClass('required');
			}
		}
		if (numReferences == 3) {
			$(this).button({
				disabled: true
			});
		}
	});
	
	$('#removeReferenceText2').click(function(){
		
		if ($("#ref3").css('display') == 'none'){
			$('#ref2').hide();
			var inputs2 = $('#ref2 :input');
				inputs2.removeClass('required');
			clearRef(2);
		} else {
		//If we are 'removing' the second section, copy data from the third one and remove that
		var inputs2 = $('#ref2 :input');
		var inputs3 = $('#ref3 :input');
		for (var i = 0; inputs3[i]; i++) {
			inputs2[i].value = inputs3[i].value;
			inputs3[i].value = "";
		}
		$('#ref3').hide();
		inputs2.removeClass('required');
		clearRef(3);
		}
		numReferences = numReferences - 1;
		$('#addReference').button({
			disabled: false
		});
	});
	
	$('#removeReferenceText3').click(function(){
		$('#ref3').hide();
		var inputs3 = $('#ref3 :input');
		inputs3.removeClass('required');
		clearRef(3);
		numReferences = numReferences - 1;
		$('#addReference').button({
			disabled: false
		});
	});
	
	$('.employeedate').datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: 0,
		yearRange: '-120:+0',
		dateFormat: 'MM yy'
	});
	
	$('.employeedate').change(function() {
		$(this).valid();
	});
	
	$('#addEmp').button({
		icons : {
			primary : 'ui-icon-plusthick'
		}
	}).click(function(){
		if (numEmps != 3) {
			numEmps = numEmps + 1;
			if($("#emp2").css('display') == 'none') {
				$('#emp2').show();
				var inputs2 = $('#emp2 :input');
				inputs2.addClass('required');
			} else {
				$('#emp3').show();
				var inputs3 = $('#emp3 :input');
				inputs3.addClass('required');
			}
		}
		if (numEmps == 3) {
			$(this).button({
				disabled: true
			});
		}
	});
	
	
	$('#removeEmpText2').click(function(){
		
		if ($("#emp3").css('display') == 'none'){
			$('#emp2').hide();
			var inputs2 = $('#emp2 :input');
			inputs2.removeClass('required');
			clearEmp(2);
		} else {
		//If we are 'removing' the second section, copy data from the third one and remove that
		var inputs2 = $('#emp2 :input');
		var inputs3 = $('#emp3 :input');
		for (var i = 0; inputs3[i]; i++) {
			inputs2[i].value = inputs3[i].value;
			inputs3[i].value = "";
		}
		$('#emp3').hide();
		inputs3.removeClass('required');
		clearEmp(3);
		}
		numEmps = numEmps - 1;
		$('#addEmp').button({
			disabled: false
		});
	});
	
	$('#removeEmpText3').click(function(){
		$('#emp3').hide();
		var inputs3 = $('#emp3 :input');
		inputs3.removeClass('required');
		clearEmp(3);
		numEmps = numEmps - 1;
		$('#addEmp').button({
			disabled: false
		});
	});
	
	$('#thirdNext').click(function() {
		if($('#referenceForm').valid() && $('#employmentForm').valid()) {
			var currentTab = ($('#tabs').tabs('option', 'active'));
			//$('#tabs').tabs('option', 'active', currentTab + 1);
			moveToNextTab(currentTab);
		} else {
			$('#dialog').dialog('open');
		}
	});
	
	
	//Tab 4

	$('.military').hide();
	$('#dischargeExplain').hide();
	
	$('.militarydate').datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: 0,
		yearRange: '-120:+0',
		dateFormat: 'MM yy'
	});
	$('.militarydate').change(function() {
		$(this).valid();
	});
	
	$('input[name="military"]').click(function() {
		if ($(this).val()=="n"){
			$('.military').hide();
			var inputs = $('#military :input');
			inputs.removeClass('required');
			$('honorable').removeClass('required');
			$('#expOfDischarge').removeClass('required');
		} else {
			$('.military').show();
			var inputs = $('#military :input');
			inputs.addClass('required');
			$('#expOfDischarge').addClass('required');
			$('#honorable').addClass('required');
		}
	});
	
	$('input[name="discharge"]').click(function() {
		if ($(this).val()=="oth"){
			$('#dischargeExplain').show();
			$('#expOfDischarge').addClass('required');
		} else {
			$('#dischargeExplain').hide();
			$('#expOfDischarge').removeClass('required');
		}
	});
	
	$('#fourthNext').click(function() {
		if($('#militaryForm').valid()) {
			var currentTab = ($('#tabs').tabs('option', 'active'));
			//$('#tabs').tabs('option', 'active', currentTab + 1);
			moveToNextTab(currentTab);
		} else {
			$('#dialog').dialog('open');
		}
	});
	
	// submit
	
	$('#submit').click(function() {
		if($('#generalForm').valid() && $('#educationForm').valid() && 
		$('#referenceForm').valid() && $('#employmentForm').valid() &&
		$('#militaryForm').valid() && $('#sigForm').valid()) {
			$('#finalCheck').dialog('open');
		} else {
			$('#dialog').dialog('open');
		}
	});
	
	// general
	
	$('#tabs').tabs({ activate: function() {
		var currentTab = ($('#tabs').tabs('option', 'active'));
		disableFollowingTabs(currentTab);
	}
	});
	
	
	//jQuery.validator.addMethod("notEqual", function(value, element, param) {
	//	return this.optional(element) || value != param;
	//	}, "Please specify a different (non-default) value");
	
	
	$('#generalForm').validate({
		rules: {
			zip : {
				required : true,
				rangelength : [5,5]
			},
			AreaCode : {
				rangelength : [3,3]
			},
			First3 : {
				rangelength : [3,3]
			},
			Last4 : {
				rangelength : [4,4]
			},
			SSNFirst : {
				rangelength : [3,3]
			},
			SSNMid : {
				rangelength : [2,2]
			},
			SSNLast : {
				rangelength : [4,4]
			}
		},
		messages : {
			zip : {
				rangelength : "Must be 5 digits"
			},
			AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			Last4 : {
				rangelength : "Must be 4 digits"
			},
			SSNFirst : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			SSNMid : {
				required : "",
				rangelength : "Must be 2 digits"
			},
			SSNLast : {
				rangelength : "Must be 4 digits"
			}
		}
	});
	
	$('#referenceForm').validate({
		rules : {
			relationship1AreaCode : {
				rangelength : [3,3]
			},
			relationship1First3 : {
				rangelength : [3,3]
			},
			relationship1Last4 : {
				rangelength : [4,4]
			},
			relationship2AreaCode : {
				rangelength : [3,3]
			},
			relationship2First3 : {
				rangelength : [3,3]
			},
			relationship2Last4 : {
				rangelength : [4,4]
			},
			relationship3AreaCode : {
				rangelength : [3,3]
			},
			relationship3First3 : {
				rangelength : [3,3]
			},
			relationship3Last4 : {
				rangelength : [4,4]
			}
		},
		messages : {
			relationship1AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship1First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship1Last4 : {
				rangelength : "Must be 4 digits"
			},
			relationship2AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship2First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship2Last4 : {
				rangelength : "Must be 4 digits"
			},
			relationship3AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship3First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			relationship3Last4 : {
				rangelength : "Must be 4 digits"
			}
		}
	});
	
	$('#employmentForm').validate({
		rules : {
			company1AreaCode : {
				rangelength : [3,3]
			},
			company1First3 : {
				rangelength : [3,3]
			},
			company1Last4 : {
				rangelength : [4,4]
			},
			company2AreaCode : {
				rangelength : [3,3]
			},
			company2First3 : {
				rangelength : [3,3]
			},
			company2Last4 : {
				rangelength : [4,4]
			},
			company3AreaCode : {
				rangelength : [3,3]
			},
			company3First3 : {
				rangelength : [3,3]
			},
			company3Last4 : {
				rangelength : [4,4]
			}
		},
		messages : {
			company1AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company1First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company1Last4 : {
				rangelength : "Must be 4 digits"
			},
			company2AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company2First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company2Last4 : {
				rangelength : "Must be 4 digits"
			},
			company3AreaCode : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company3First3 : {
				required : "",
				rangelength : "Must be 3 digits"
			},
			company3Last4 : {
				rangelength : "Must be 4 digits"
			}
		}
	});
	
	
	
	
	$('.next').button({
		icons : {
			secondary : 'ui-icon-arrowthick-1-e'
		}
	});
	
	//if($("#personalForm").valid())
	
	/*$('.next').click(function() {
		var currentTab = ($('#tabs').tabs('option', 'active'));
		$('#tabs').tabs('option', 'active', currentTab + 1);
	});*/
	
	$('.prev').button({
		icons : {
			primary : 'ui-icon-arrowthick-1-w'
		}
	});
	
	$('.prev').click(function() {
		var currentTab = ($('#tabs').tabs('option', 'active'));
		$('#tabs').tabs('option', 'active', currentTab - 1);
	});
	
	$('#submit').button({
		icons : {
			secondary : 'ui-icon-check'
		}
	});
	
});

function clearRef(number) {
	var inputs = $('#ref' + number + ' :input');
	
	for (var i = 0; inputs[i]; i++) {
		var input = inputs[i];
		input.value = "";
	}
}

function clearEmp(number) {
	var inputs = $("#emp" + number + " :input");
	
	for (var i = 0; inputs[i]; i++) {
		var input = inputs[i];
		input.value = "";
	}
}

function moveToNextTab(currentTabNumber) {
	$('#tabs').tabs('enable', currentTabNumber + 1);
	$('#tabs').tabs('option', 'active', currentTabNumber + 1);
}

function disableFollowingTabs(currentTabNumber) {
	var disabledTabs = [];
	for (var i = currentTabNumber + 1; i <= 4; i++) {
		disabledTabs.push(i);
	}
	$('#tabs').tabs('option', 'disabled', disabledTabs);
}














































