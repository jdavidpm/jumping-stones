var DP = []; //Arreglo con las soluciones
var K; //Limite de cuantos escalones puede saltar la rana (1...k)
var N; //numero de escalones
var count = 0;
var cad = '';
var calls = [];
function stones(E)
{
	console.log(count +": " + E)
	calls.push(E);
	count++;
	var i;
	//for(i = 0; i < N; i++)
		//{cad += DP[i] + ' '}
	//console.log(cad);
	//cad = '';
	if (E == N) {console.log(count +": " + "LLEGO");return 1;} //Cuando sea valido
	if (E > N) {console.log(count +": " + "NO");return 0;} //Cuando no sea valido
	if (DP[E] != -1) {console.log(count +": " + "YA");return DP[E];} //Si ya esta calculado

	DP[E] = 0; //Si no, inicializa en 0
	for (i = 1; i <= K; ++i) //Desde 1 hasta k (el número máximo de escalones que puede saltar la rana)
	{
		DP[E] += stones(E + i);
	}  //Se acumulan las posibilidades (todas las soluciones)

	{console.log(count +": " + "FINAL"); return DP[E];} //Se regresa cuando ya se calculo
}

function main(n, k)
{
	i = 0;
	for(i = 0; i < 10005; i++) //Se inicializa el arreglo con las soluciones con valores no validos
		DP.push(-1);
	K = k;
	N = n;
	console.log(stones(0));
	console.log(calls)
}

main(4, 3);