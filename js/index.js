var divArrayElements =[], pArrayElements = []; //Arreglos con los id de los <div> y <p> del arreglo en HTML
var divIndexElements =[], pIndexElements = []; //Arreglos con los id de los <div> y <p> de los indicen en HTML
var sliderStones = document.getElementById("rangeStones"); //Slider de las piedras
var outputStones = document.getElementById("valueStones"); //Salida del slider de las piedras
var sliderJumps = document.getElementById("rangeJumps"); //Slider de los saltos
var outputJumps = document.getElementById("valueJumps"); //Salida del slider de las saltos
var sliderSpeed = document.getElementById("rangeSpeed"); //Slider de los saltos
var outputSpeed = document.getElementById("valueSpeed"); //Salida del slider de la velocidad
var totalTries = document.getElementById("totalTries"); //Salida del slider de la velocidad
var nStones = sliderStones.value, kJumps = sliderJumps.value, vSpeed = 10/(sliderSpeed.value * 10); //Número de Piedras, Numero de Saltos
outputStones.innerHTML = nStones; //Muestra el valor por defecto del Slider
outputJumps.innerHTML = kJumps; //Muestra el valor por defecto del Slider
outputSpeed.innerHTML = sliderSpeed.value; //Muestra el valor por defecto del Slider
var K, N, count = 1; //Limite de cuantos escalones puede saltar la rana (1...k),Numero de escalones, contador
var DP = [], arr = [], aux = [], calls = []; //Arreglo con las soluciones, Arreglos con los nombre de los elementos, Arreglo de llamadas

var lineTime = 2000;
var firstStone = "M 0 175 q 75 -150 150 0";
var allPath = "M 0 175 q 75 -150 150 0";
var newStone = " q 75 -150 150 0";
var frog = document.getElementById("frog");
var river = document.getElementById("river");
var path;

function jumpingFrog(jumps)
{
	allPath = firstStone;
	for (var i = 1; i < jumps; i++)
		allPath += newStone;

	river.setAttribute("width", 400 * jumps);
	frog.setAttribute("d", allPath);
	path = anime.path('path');
	var lineDrawing = anime({
		targets: "path",
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: "easeInOutCubic",
		duration: lineTime * vSpeed,
		delay: function(el, i)
		{
			return lineTime * i;
		},
		begin: function(anim)
		{
			var letters = document.querySelectorAll("path"), i;
			for (i = 0; i < letters.length; ++i)
			{
				letters[i].setAttribute("stroke", "#5EDD5F");
				letters[i].setAttribute("fill", "none");
			}
		},
		autoplay: false,
	});

	var frogBall = anime({
		autoplay: false,
		targets: '.ball',
		translateX: path('x'),
		translateY: path('y'),
		rotate: path('angle'),
		easing: 'easeInOutCubic',
		duration: lineTime * vSpeed
	});
	frogBall.play(); lineDrawing.play();
}

function delayJumpingFrog(j, i)
{
	setTimeout(function() {jumpingFrog(j);}, 2000 * i * vSpeed);
}

function createArray() //Crea la estructura del arreglo
{
	callingJumpingStones(nStones, kJumps);
	for (var i = 0; i < nStones; i++) //Crea N <p> y n <div> elementos
		delayCreateArray(i);
}


function initArray() //Inicializa los valores a -1 y pone los indices
{
	for (var i = 0; i < nStones; i++)
	{
		document.getElementById("pArray" + i).innerHTML = -1;
		document.getElementById("pIndex" + i).innerHTML = i;
	}
	count = 1;
}

function delayCreateArray(i)
{
	setTimeout(function() {createElements(i);}, 1000 * i * vSpeed);
}

function createElements(i)
{
	//Creacion de los indices
	var div = document.createElement("div");
	div.setAttribute("id", "divIndex" + i)
	div.setAttribute("class", "indexed");
	var p = document.createElement("p");
	p.setAttribute("id", "pIndex" + i);
	p.setAttribute("class", "textIndex");
	pIndexElements.push("pIndex" + i);
	divIndexElements.push("divIndex" + i);
	document.body.appendChild(div);
	document.getElementById("divIndex" + i).appendChild(p);

	//Creacion del Arreglo
	var div = document.createElement("div"); //Crea un elemento <div>
	div.setAttribute("id", "divArray" + i) //Le da un id
	div.setAttribute("class", "boxed"); //Le asgina una clase
	var p = document.createElement("p"); //Crea un elemento <p>
	p.setAttribute("id", "pArray" + i); //Le da un id
	p.setAttribute("class", "textBox"); //Le asgina una clase
	pArrayElements.push("pArray" + i);  //Agrega el id a un arreglo
	divArrayElements.push("divArray" + i); //Agrega el id a un arreglo
	document.body.appendChild(div); //Agrega <div> a <body>
	document.getElementById("divArray" + i).appendChild(p); //Agrega <p> a <div>
}

sliderStones.oninput = function() //Actualizar Valor del Slider
{
	nStones = sliderStones.value;
	outputStones.innerHTML = this.value;
}

sliderJumps.oninput = function() //Actualizar Valor del Slider
{
	kJumps = sliderJumps.value;
	outputJumps.innerHTML = this.value;
}

sliderSpeed.oninput = function() //Actualizar Valor del Slider
{
	vSpeed = 10 / (sliderSpeed.value * 10);
	outputSpeed.innerHTML = this.value;
}

function removeElements()
{
	calls = [];
	arr = [];
	for (var e = nStones - 1; e >= 0; e--)
	{
		document.getElementById(pArrayElements[e]).remove();
		document.getElementById(divArrayElements[e]).remove();
		document.getElementById(pIndexElements[e]).remove();
		document.getElementById(divIndexElements[e]).remove();
	}
	ball.pause();
	lineDrawing.pause();
}

function changeElement(j)
{
	var p;
	for(var i = 0; i < nStones; i++)
	{
		p = document.getElementById("pArray" + i);
		p.innerText = arr[j][i];
	}
}

function delayChangeElement(i, flag)
{
	setTimeout(function() {changeElement(i);}, 1000 * i * flag * vSpeed);
}

function changeAll()
{
	for (var i = 1; i < arr.length; i++) 
    {
    	delayChangeElement(i, 1);
    	delayJumpingFrog(calls[i], i);
    }
}

function changeStepByStep()
{
	delayChangeElement(count, 0);
	delayJumpingFrog(calls[count++], 1);
}

function jumpingStones(E)
{
	var i;
	calls.push(E);
	for(i = N - 1; i >= 0; i--)
		{aux.push(DP[i]);}
	arr.push(aux);//console.log(cad);
	aux = [];
	cad = '';
	if (E == N) return 1; //Cuando sea valido
	if (E > N) return 0; //Cuando no sea valido
	if (DP[E] != -1) return DP[E]; //Si ya esta calculado

	DP[E] = 0; //Si no, inicializa en 0
	for (i = 1; i <= K; ++i) //Desde 1 hasta k (el número máximo de escalones que puede saltar la rana)
		DP[E] += jumpingStones(E + i);  //Se acumulan las posibilidades (todas las soluciones)

	return DP[E]; //Se regresa cuando ya se calculo
}

function callingJumpingStones(n, k)
{
	DP = [];
	for (var i = 0; i < n; i++) //Se inicializa el arreglo con las soluciones con valores no validos
		DP.push(-1);
	K = k;
	N = n;
	totalTries.innerHTML = "Total: " + jumpingStones(0);
}