#include <stdio.h>
#include <string.h>
#define LIM 10005

unsigned long long DP[LIM]; //Arreglo con las soluciones
int k, N; //Limite de cuantos escalones puede saltar la rana (1...k), numero de escalones

unsigned long long saltos(int E)
{
	int i;

	if (E == N) return 1; //Cuando sea valido
	if (E > N) return 0; //Cuando no sea valido
	if (DP[E] != -1) return DP[E]; //Si ya esta calculado

	DP[E] = 0; //Si no, inicializa en 0
	for (i = 1; i <= k; ++i) //Desde 1 hasta k (el número máximo de escalones que puede saltar la rana)
		DP[E] += saltos(E + i);  //Se acumulan las posibilidades (todas las soluciones)

	return DP[E]; //Se regresa cuando ya se calculo
}

int main(void)
{
	memset(DP, -1, sizeof(DP)); //Se inicializa el arreglo con las soluciones con valores no validos
	scanf("%d %d", &N, &k);
	printf("%llu\n", saltos(0));
	return 0;
}