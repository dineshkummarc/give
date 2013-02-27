window.onload = function(){
//Created by Dadon Noe. Follow me on twitter ! twitter.com/NoeDadon
  
	
	var progr = document.getElementById('progr');
	var progr2 = document.getElementById('progr2');
	var progr3 = document.getElementById('progr3');
	var b1 = document.getElementById('b1');
	var b2 = document.getElementById('b2');
	var b3 = document.getElementById('b3');
	var gameFinished = 0;

	var consume = function() {

		progr.setAttribute('value',parseInt(progr.getAttribute('value'))-6 );
		progr2.setAttribute('value',parseInt(progr2.getAttribute('value'))-6 );
		progr3.setAttribute('value',parseInt(progr3.getAttribute('value'))-6 );

		if(parseInt(progr.getAttribute('value')) <= 0 || parseInt(progr2.getAttribute('value')) <= 0 || parseInt(progr.getAttribute('value')) <= 0){

			gameFinished = 1;
			alert('GAME OVER!');//continua a rifare alert ! fix it
			if(gameFinished == 1){ window.location.reload();}

		}

	}

	setInterval(consume,2000);//call consume function every 2seconds

	progr.setAttribute('max',50);progr2.setAttribute('max',50);progr3.setAttribute('max',50);
	progr.setAttribute('value',50);progr2.setAttribute('value',50);progr3.setAttribute('value',50);
	b1.style.backgroundColor = '#B00000';
	b1.style.borderColor = '#B00000';
	b2.style.backgroundColor = '#B00000';
	b2.style.borderColor = '#B00000';
	b3.style.backgroundColor = '#B00000';
	b3.style.borderColor = '#B00000';
	progr.style.height = '50px';
	progr2.style.height = '30px';progr2.style.width = '300px';
	progr3.style.height = '70px';progr3.style.width = '20px';


	document.body.style.backgroundColor = '#000000';//all black if you image's url is broken.
	document.body.style.backgroundImage = 'url(http://imageshack.us/a/img853/9756/loltp.jpg)';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundSize = 'cover';
	

	b1.style.position = 'absolute';
	b1.style.color = '#B00000';
	b1.style.top = '70%';
	b1.style.left = '49%';
	b2.style.position = 'absolute';
	b2.style.color = '#B00000';
	b2.style.top = '70%';
	b2.style.left = '11%';
	b3.style.position = 'absolute';
	b3.style.color = '#B00000';
	b3.style.top = '70%';
	b3.style.left = '82%';
	progr.style.position = 'absolute';
	progr.style.top = '30%';
	progr.style.left = '58%';
	progr2.style.position = 'absolute';
	progr2.style.top = '29%';
	progr2.style.left = '3%';
	progr3.style.position = 'absolute';
	progr3.style.top = '9%';
	progr3.style.left = '77%';


	b1.onclick = function() { progr.setAttribute('value',parseInt(progr.getAttribute('value'))+2 ); }
	b2.onclick = function() { progr2.setAttribute('value',parseInt(progr2.getAttribute('value'))+2 ); }
	b3.onclick = function() { progr3.setAttribute('value',parseInt(progr3.getAttribute('value'))+2 ); }
	


}
