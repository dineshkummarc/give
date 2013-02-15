//Author : Dadon Noe
//See the Window property 'localStorage' (page 589 JavaScript definitive guide 6th) to store all the data (otherwise
//it will be deleted after a browser refresh)
	

	//Once the page is initialized (pageinit):
	$(document).bind( 'pageinit', function(){

		/*Each exam is a property of the localStorage obj. Browsers don't support structured values so
		localStorage properties must be strings. Each exam is represented inside the localStorage obj 
		with three items : examName_name , examName_description, examName_currentId (to know which month is
		associated to).
		See page 589, JavaScript definitive guide 6th, for localStorage documentation.*/

	
		
		//These vars are local to the function (JavaScript core rule)
		//Take the first Node that has attribute name set to 'janList':
		var janListElem = document.getElementsByName('janList')[0];
		//We have to associate each add button with its corresponding event handler:
		var addButtonsList = document.getElementsByName('add');
		var ul_List = document.getElementsByName('ul_List');//ul_List[0],...,ul_List[9]
		var backCEButton = document.getElementById('backCE');//backCE : back button from createExam page
		var saveCEButton = document.getElementById('saveCE');
		var textCEButton = document.getElementById('ename');
		var examCEdescription = document.getElementById('textarea1');

		var currentId = 0;//Keep the current ID so we know where to put the newly created exam.
		//see restore below_______________________________________________________
		var name = []; var a1,a3 = ''; var a2 = 0;
		var li = document.createElement('li');
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var span = document.createElement('span');
		var a = document.createElement('a');
		var childrenUL = {};
		var thereisnot = true;//do nothing if we already have the exam with its page.
		
		//________________________________________________________________________


		for(var i=0;i < addButtonsList.length; i++){
		//Associate for each add button in the page its event function handler.
		
			$(addButtonsList[i]).bind( 'tap', function(event){
			//tap is an event (button press)
			//Each time the user press the 'add' button these html components are created:
		
				event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'

				currentId = parseInt(event.target.parentNode.parentNode.parentNode.getAttribute('id'));//let me know which add button has been pressed.	
					

				//See : jquerymobile.com/demos/1.2.0/docs/api/methods.html
				$.mobile.changePage($("#createExam")),{transition:'slide'}
				//clear textarea and exam's name inside the page createExam:
				textCEButton.value = 'Exam\'s name';
				examCEdescription.value = '';
		

			});

		}

		//Restore the eventually previous exams___________________________________________
		
	
			
			for(var i=0; i<window.localStorage.length;i++){
			//Get all the exams names and  store them in an array:

				a1 = window.localStorage.key(i);//bbb_name or bbb_description
				a2 = a1.indexOf('_'); 
				a3 = a1.substring(a2+1);
				if(a3 == 'name'){name.push(window.localStorage.getItem(a1))}
			}
				/*console.log('names found:');
				for(var j=0; j<name.length;j++){
					console.log(name[j]);
				}
				*/

			//For each exam re-create the corresponding page and add it to the corresponding month:
			for(var j=0; j<name.length;j++){
				
				//name[j] current exam analyzed.
			

				childrenUL = ul_List[parseInt(window.localStorage.getItem(name[j]+'_currentId'))].children;
				

				for(var t=0; t < childrenUL.length ;t++){
				
					if(childrenUL[t].getAttribute('name') == name[j]){
						thereisnot = false;
					}
				}

				
				//If there isn't the exam's button and the corresponding page:
				if(thereisnot){
				
				//create the corresponding page:
				associateButton(window.localStorage.getItem(name[j]+'_name'),window.localStorage.getItem(name[j]+'_description'),window.localStorage.getItem(name[j]+'_currentId'));

				li.setAttribute('data-theme','c');
				li.setAttribute('class','ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c');
				li.setAttribute('data-iconpos','right');
				li.setAttribute('data-icon','arrow-r');
				li.setAttribute('data-iconshadow','true');
				li.setAttribute('data-shadow','false');	
				li.setAttribute('data-corners','false');
				li.setAttribute('data-wrapperels','div');
				//Setting the attribute name to li is useful to know from which element 'add' has been called:
				li.setAttribute('name',window.localStorage.getItem(name[j]+'_name'));
				div1.setAttribute('class','ui-btn-inner ui-li ui-corner-top');
				div2.setAttribute('class','ui-btn-text');
				span.setAttribute('class','ui-icon ui-icon-arrow-r ui-icon-shadow');
	
				a.setAttribute('data-transition','slide');
				a.setAttribute('class','ui-link-inherit');
				//textContent : text between <a> and </a>
				a.textContent = window.localStorage.getItem(name[j]+'_name');

				li.appendChild(div1);
				div1.appendChild(div2);
				div1.appendChild(span);
				div2.appendChild(a);
				//Add the exam button to the current monthList (where the user has pressed the add button) only if there isn't one with the same name:
	
	
				ul_List[parseInt(window.localStorage.getItem(name[j]+'_currentId'))].appendChild(li);
				

				
				$(a).bind( 'tap', function(event){
					event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
					/*event.target.textContent : target is the target object for this event,
					the element represented by the <a> tag. textContent takes the name of the exam.
					*/
					
					$.mobile.changePage($('#'+window.localStorage.getItem(event.target.textContent+'_name')+'Page'),{transition:'slide'});
				});	

				//new Elements for the next exam:
				li = document.createElement('li');
				div1 = document.createElement('div');
				div2 = document.createElement('div');
				span = document.createElement('span');
				a = document.createElement('a');

				}

				thereisnot = true;

			}
	
			

		

		//Restore________________________________________________________________________


		$(backCEButton).bind( 'tap', function(event){
		//tap is an event (button press)

			event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
		
			//See : jquerymobile.com/demos/1.2.0/docs/api/methods.html
			$.mobile.changePage($("#page1"),{transition:'slide'});
		

		});

		$(saveCEButton).bind( 'tap', function(event){
		/*tap is an event (button press). This is the function handler invoked when the save button of create
		Exam page(this page is unique) is pressed.
		*/
			event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'

			
			var examName = textCEButton.value;//the exam's name from the createExam page.
			var examDescription = examCEdescription.value;

			var li = document.createElement('li');
			var div1 = document.createElement('div');
			var div2 = document.createElement('div');
			var span = document.createElement('span');
			var a = document.createElement('a');

			//We don't accept two exam with the same name, one of the two will have an index after its name:
			while(window.localStorage.getItem(examName+'_name')){
					
					examName = examName + '0';
					//Don't use the '*' character.

			}
				
			

			//setItem(itemName,string value)
			window.localStorage.setItem(examName+'_name',examName);
			window.localStorage.setItem(examName+'_description',examDescription);
			window.localStorage.setItem(examName+'_currentId',currentId);

	
	

			li.setAttribute('data-theme','c');
			li.setAttribute('class','ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c');
			li.setAttribute('data-iconpos','right');
			li.setAttribute('data-icon','arrow-r');
			li.setAttribute('data-iconshadow','true');
			li.setAttribute('data-shadow','false');	
			li.setAttribute('data-corners','false');
			li.setAttribute('data-wrapperels','div');
			//Setting the attribute name to li is useful to know from which element 'add' has been called:
			li.setAttribute('name',window.localStorage.getItem(examName+'_name'));
			div1.setAttribute('class','ui-btn-inner ui-li ui-corner-top');
			div2.setAttribute('class','ui-btn-text');
			span.setAttribute('class','ui-icon ui-icon-arrow-r ui-icon-shadow');
	
			a.setAttribute('data-transition','slide');
			a.setAttribute('class','ui-link-inherit');
			//textContent : text between <a> and </a>
			a.textContent = window.localStorage.getItem(examName+'_name');
	
			/*Call the function that create the page for this button. That page need to be added as a child of <body>
			*/
			associateButton(window.localStorage.getItem(examName+'_name'),window.localStorage.getItem(examName+'_description'),currentId);
		

			
			
			
			//console.log('#'+window.localStorage.getItem(examName+'_name')+'Page');
			$(a).bind( 'tap', function(event){
				event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
			
				
				$.mobile.changePage($('#'+window.localStorage.getItem(examName+'_name')+'Page'),{transition:'slide'});
				

			});			

			li.appendChild(div1);
			div1.appendChild(div2);
			div1.appendChild(span);
			div2.appendChild(a);
			//Add the exam button to the current monthList (where the user has pressed the add button):
			ul_List[currentId].appendChild(li);

			

			//See : jquerymobile.com/demos/1.2.0/docs/api/methods.html
			$.mobile.changePage($("#page1"),{transition:'slide'});
		

		});
	
			function associateButton(examName,examDescription,currentId){
			/*This function is called each time an exam is created : it associates the corresponding button
			to its page and tap event. Once the page for the exam is created, we have to add it as a child
			to the app.html's body.
			*/
	

				
				var div1 = document.createElement('div');
				var div2 = document.createElement('div');
				var div3 = document.createElement('div');
				var div4 = document.createElement('div');
				var div5 = document.createElement('div');
				var inputDiv3 = document.createElement('input');
				var a1Div3 = document.createElement('a');
				var a2Div3 = document.createElement('a');
				var a3Div3 = document.createElement('a');
				var fieldSetDiv5 = document.createElement('fieldset');
				var labelFS = document.createElement('label');
				var textAreaFS = document.createElement('textarea');

		
				div1.setAttribute('style','min-height: 552px;');
				div1.setAttribute('class','ui-page ui-body-a');
				div1.setAttribute('tabindex','0');
				div1.setAttribute('data-url',examName+'Page');//must be the same as the id attribute
				div1.setAttribute('data-role','page');
				//You don't need to set the theme for each child of div1 because they inherit from it:
				div1.setAttribute('data-theme','a');
				//The id of the page associated to the button is the exam name:
				div1.setAttribute('id',examName+'Page');//ex: MathPage
				div2.setAttribute('role','banner');
				div2.setAttribute('class','ui-header ui-bar-a');
				div2.setAttribute('data-role','header');
				div3.setAttribute('data-role','content');
				div3.setAttribute('role','main');
				div3.setAttribute('class','ui-content');
				div4.setAttribute('data-role','footer');
				div1.appendChild(div2);div1.appendChild(div3);div1.appendChild(div4);
				inputDiv3.setAttribute('type','text');
				inputDiv3.setAttribute('class','ui-input-text ui-body-a ui-corner-all ui-shadow-inset');
				inputDiv3.setAttribute('value',examName);
				inputDiv3.setAttribute('disabled','true');
				div3.appendChild(inputDiv3);div3.appendChild(div5);
				div5.setAttribute('data-role','fieldcontain');
	
				a1Div3.setAttribute('data-role','button');
				a1Div3.setAttribute('data-icon','delete');
				a1Div3.textContent = 'Save';
				$(a1Div3).bind( 'tap', function(event){
				    event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
				    //User eventually changed exam description
				    window.localStorage.setItem(examName+'_description',textAreaFS.textContent);
				    $.mobile.changePage($("#page1"),{transition:'slide'});

				});
				a2Div3.setAttribute('data-role','button');
				a2Div3.setAttribute('data-icon','delete');
				a2Div3.setAttribute('data-theme','e');
				a2Div3.textContent = 'Remove';
				$(a2Div3).bind( 'tap', function(event){
				    event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
				    //Remove the exam from localStorage,the corresponding page and the corresponding
				    //ul_List child.

					var childNodes = ul_List[currentId].childNodes;
					//Let's find the node with the correct name:
					for(var i=0; i < childNodes.length; i++){
													
						
		                		if(childNodes[i].nodeName == 'LI' && childNodes[i].getAttribute('name') == window.localStorage.getItem(examName+'_name')){				
							ul_List[currentId].removeChild(childNodes[i]);
						}
					}					

					window.localStorage.removeItem(examName+'_name');
					window.localStorage.removeItem(examName+'_description');
					$.mobile.changePage($("#page1"),{transition:'slide'});//go back to home
				
					//Remove the corresponding page:
					window.document.body.removeChild(document.getElementById(examName+'Page'));

				});
				a3Div3.setAttribute('data-role','button');
				a3Div3.setAttribute('data-icon','arrow-l');
				a3Div3.textContent = 'Back';
				$(a3Div3).bind( 'tap', function(event){
				    event.stopImmediatePropagation();//see page 919 'Java script definitive guide 6thED'
				
					$.mobile.changePage($("#page1"),{transition:'slide'});
				});
				div3.appendChild(a1Div3);div3.appendChild(a2Div3);div3.appendChild(a3Div3);
				fieldSetDiv5.setAttribute('data-role','controlgroup');
				div5.appendChild(fieldSetDiv5);
				labelFS.setAttribute('for',examName+'textArea');
				labelFS.setAttribute('class','ui-input-text');
				textAreaFS.setAttribute('name','');
				textAreaFS.setAttribute('id',examName+'textArea');
				textAreaFS.setAttribute('placeHolder','');
				textAreaFS.textContent = examDescription;
				textAreaFS.setAttribute('data-theme','e');	
				fieldSetDiv5.appendChild(labelFS);
				fieldSetDiv5.appendChild(textAreaFS);

				//Let's add the newly created page to the body of the current document:
				window.document.body.appendChild(div1);

				

			}//associateButton


	});

	window.onerror = function(){
	//The onerror event is triggered in response to JS errors.

		$.mobile.changePage($("#onerror"),{transition:'slide'});


	}
