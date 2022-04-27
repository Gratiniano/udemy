# Capitulo 5. Elegir ejemplos para los escenarios outline
... merge

### 5.2.1 Recoger ejemplos para los esquemas de escenario de fuera hacia dentro.
El escenario se plantea en forma de preguntas/respuestas: 
	- *¿IVA para España ? - 21%*
	- *¿IVA para Alemania? - 24%*
	- etc.
Y en función de

`Ejemplo`
```Gherkin
	Feature: Vender mediante intermediarios
		Scenario Outline: Comisiones establecidas
			Given Un intermediario llamado Quick-Ship
				And realiza una compra desde <region>
			  When Quick-Ship recibe su comisión por la compra
			  Then deberiamos tomar <commision> del precio 
			Examples:
				| region | commisson |
				| North America | 10% |
				| South America | 11.4% |
				| Europe | 12.9% |
				| Asia | 12.9% |
				| Africa | 13.5% |
```
## 5.3 Encontrar ejemplos clave para los esquemas de escenario.
Técnicas (*heurísticas de pruebas*):
	- Identificar casos del negocio importantes
	- Estar seguro de que se cubren todos los ejemplos relevantes.
	- Detectar ejemplos problemáticos que aparecen con frecuencia.

#DEFINICIÓN *Heurísticas de prueba -* Un conjunto de reglas generales, opiniones informadas, juicios intuitivos y sentido común usado por los testeadores para generar nuevas ideas de prueba.

<hr>
Aunque la idea de generar los máximos test posibles de forma automatizada es buena, en principio **Gherkin no funciona así**. 
Gherkin prioriza la legibilidad y la ejemplaridad. 
Se debe distinguir entre *ejemplos exhaustivos* y *ejemplos ilustrativos*.
<hr>

#DEFINICIÓN  *Ejemplos exhaustivos -* Una aproximación en la cual la cobertura de test se mide en base a cuantas comprobaciones y ejemplos se tienen. Cuantos más, mejor.

#DEFINICIÓN *Ejemplos ilustrativos -* Una aproximación en la cual se usan sólo los ejemplos más representativos y solo los mínimos necesarios para comprender el propósito del test. Se trata de obtener *un modelo simplificado*.

**Ejemplos clave** tipicos:
	- *Cada aspecto importante de la funcionalidad del negocio*.
	- *Cada caso técnico límite importante*.
	- *Cada area particularmente problemática de la implementación esperada*.
### 5.3.1 Ejemplos específicos del domínio.
Generalmente no hay heurísticas fáciles para descubrir y gestionar ejemplos específicos del dominio. Suele ser necesario la asistencia de un experto.

`Ejemplo`
```Gherkin
Feature: Pricing
	Scenario Outline: Discounts
		Given items like <items> costing <price> in John's cart
			And a <discount> discount
		  When John proceeds to checkout
		  Then he should only pay <final> for the items in his cart
		
		Examples: Daily deals
			Daily deals are always 17% discounts.
			| items | price | discount | final |
			| "Writing Great Specifications" | $44.99 | 17% | $37.34 |
		
		Examples: Coupons
			There are five different types of coupons available.
			| items | price | discount | final |
			| "Writing Great Specifications" | $44.99 | 5% | $42.74 |
			| "Writing Great Specifications" | $44.99 | 15% | $38.24 |
			| "Writing Great Specifications" | $44.99 | 30% | $31.49 |
			| "Writing Great Specifications" | $44.99 | 50% | $22.49 |
			| "Writing Great Specifications" | $44.99 | 75% | $11.24 |
		
		Examples: Bundles
			We offer "buy two, pay for one" bundles.
			| items | price | discount | final |
			| "Specification by Example" bundle | $44.99 | 50% | $22.49 |
```

<hr>
**Usar resumenes de tabla**
Texto libre que proporciona contexto e información adicional a los ejemplos utilizados.
<hr>

### 5.3.2 Contraejemplos
#DEFINICIÓN *Contrajemplo -* Una combinación de inputs que producen resultados *diferentes* en el mismo flujo. 
Ayudan a definir los limites entre diferentes combinaciones de inputs y resultados. Ilustran los casos límites.

`Ejemplo`
```Gherkin
Feature: Free shipping
	Scenario Outline: Orders over $100 should be shipped for free
		Given items worth <purchase> in John's cart
			When John proceeds to checkout
			Then he should be offered <shipping>
		
		Examples:
		| purchase | shipping |
		| $99 | $5 shipping |
		| $100 | free shipping |
```

### 5.3.3 Resultados exploratorios
Persiguen el descubirimiento de posibles *caminos fallidos* para generar nuevas pruebas.
###### El camino 

