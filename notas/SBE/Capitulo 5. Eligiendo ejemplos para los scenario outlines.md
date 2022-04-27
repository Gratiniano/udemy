# Capitulo 5. Eligiendo ejemplos para los scenario outlines
Simplificando los *scenario outlines* se enfocan en traer ejemplos del mundo *exterior* al producto.

## 5.1 Aplicación de compras ejemplo.
## 5.2 Escribiendo *scenario outlines* de fuera hacia dentro.
Describe métodos proactivos para escribir *scenario outlines*.

#DEFINICIÓN *Outside-in scenario outlline -* Un *scenario outline* escrito directamente con los ejemplos recogidos durante la fase de análisis en lugar de mezclar escenarios similares.

El método **de fuera hacia dentro** consiste en dos pasos:
	1. Recoger ejemplos del mundo real para la especificación en forma de tabla.
	2. Escribir el *scenario outline* basado en la tabla, ajustando los pasos y parámetros a los datos.

Esta aproximación requiere analizar los ejemplos primero y escribir los escenarios despues.
La tabla del paso 1 no tiene porqué ser una tabla Gherkin. 

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
Persiguen el descubirimiento de posibles **caminos fallidos** para generar nuevas pruebas.

###### EL CAMINO FELIZ
Describe los principales escenario de éxito. 
###### EL CAMINO DE LA FURIA
Describe los principales escenario de fallo. 
###### EL CAMINO DEL MIEDO
Describe los escenarios más temidos o que mayores consecuencias negativas pueden tener.
###### EL CAMINO DE LA VERGUENZA
Describe los escenarios que más afectan a la credibilidad.
###### EL CAMINO DEL DELITO
Describe los escenarios afectados por las medidas de seguridad.
###### EL CAMINO DEL ESTRES
Describe los escenarios afectados por el rendimiento.
###### EL CAMINO DE LA CODICIA
Describe escenarios de uso intensivo y extensivo de la aplicación.
###### EL CAMINO DEL OLVIDO.
Describe escenarios donde las acciones no son finalizadas.
###### EL CAMINO DE LA DESOLACIÓN
Describe escenarios donde no los inputs necesarios no son proporcionados.
###### EL CAMINO DE LA INDECISIÓN
Describe escenarios donde el usuario realiza y deshace múltiples acciones.

`Ejemplo`
```Gherkin
Feature: Checkout

Scenario Outline: Processing purchases at checkout

	Given <prerequisite>
		When checkout proceeds
		Then the contents of the cart should be <bought?>
			And the credit card should be <charged?> for it
	
	Examples: The happy path
	| prerequisite | bought? | charged? |
	| John adds an item to the cart | bought | charged |
	
	Examples: The angry path
	| prerequisite | bought? | charged? |
	| the item is in stock | bought | charged |
	| the item goes out of stock | not bought | not charged |
	
	Examples: The embarrassing path
	| prerequisite | bought? | charged? |
	| John can pay | bought | charged |
	| John can't pay | not bought | not charged |
	
	Examples: The delinquent path
	| prerequisite | bought? | charged? |
	| minors try to buy an R rated movie | not bought | not charged |
	| adults try to buy an R rated movie | bought | charged |
```

#TIP El parámetro *<prerrequisite\>* sustituye por entero el paso *Given*.  
#TIP Explorar resultados puede ayudar a obtener mejores requisitos. Ayuda a pensar mejor sobre las soluciones y se puede hacer antes de escribir nada. Permite enfocar el trabajo desde múltiples ángulos y descubrir casos límite.

### 5.3.4 Boomerangs
Los *boomerangs* son funcionalidades que tienden a fallar una y otra vez con independencia de los esfuerzos realizados para repararlas.
Pueden aparecer en las siguientes situaciones:
	- La funcionalidad afronta reglas del dominio complejas y dificiles de entender.
	- El equipo no identifica el interesado con autoridad para decidir sobre el proceso.
	- El equipo no atiende las peticiones/sugerencias de un interesado.
	- El equipo tiene el *factor autobus* a uno. ( Es el nº de personas que deben ser atropelladas por un autobus para que el proyecto se detenga).
	- Los clientes no están satisfechos con la solución aunque haga exactamente lo que pedian.

<hr>
**Analizando boomerangs en profundidad**
Recomienda aplicar la *Regla de los Cinco Porqués* para determinar la causa última del fallo.
<hr>

## 5.4 Evitar antipatrones en los esquemas de escenario.
Describe ejemplos que **no deberían usarse** con Gherkin.

### 5.4.1 Validaciones típicas de datos.
Por ejemplo, ¿deberían validarse si los números o fechas introducidos cumplen un formato determinado? 
<hr>
**Las especificaciones ejecutables son solo una parte de la suite de pruebas completa que una aplicación de software puede tener. El principal papel de los escenarios es proporcionar un marco de comunicación para hablar con los interesados que permita escribir un sistema de documentación vivo. No se debe intentar usar una suite de especificaciones para reemplazar otros tipos de tests. Las especificaciones ejecutables solo deben optimizar tres cosas: ser claras, autoexplicativas y legibles tanto para los miembros técnicos como no técnicos del equipo.**
<hr>
Pensar siempre en **quien toma las decisiones**.

### 5.4.2 Resultados combinatorios simples
Funcionalidades que admiten muchos inputs diferentes que generan muchos posibles resultados.
¿Crear tablas imposibles de leer o arriesgarse a dejar casos límite importantes sin cubrir? 

#DEFINICIÓN *Pruebas por parejas -* Una heuristica de pruebas basada en la observación que la mayor parte de los fallos están causado por una combinación de, como mucho, dos factores. 

`Ejemplo`
```Gherkin
Feature: Search

Scenario Outline: Filtering
	Given books:
		| title | genre | author | release |
		| "Sorrow" | adventure | Damion Melville | 1994 |
		| "Setup" | humor | Beyhan Topuz | 2000 |
		| "Recruits" | adventure | Fionna Walker | 2005 |
		| "Aliens" | sci-fi | Phan Uoc | 2013 |
		| "Invent" | horror | Stela Vánová | 1988 |
	When Simona searches for <filter>
		And she wants to find <value>
	Then she should see <results>
	
	Examples:
		| filter | value | results |
		| title | "Lord of the Rings" | no results |
		| title | "Setup" or "Invent" | "Setup", "Invent" |
		| genre | adventure | "Sorrow", "Recruits" |
		| author and release | Phan Uoc, 2013 | "Aliens" |
		| author and release | Phan Uoc, 1994 | no results |
```

### 5.4.3 Modelos de base de datos.
#ADVERTENCIA Escribir esquemas que parezcan tablas SQL es un antipatrón. Com oregla general, solo se debería resolver dificultades técnicas en la capa de automatización, en vez de intentar resolverlas en la capa de especificación.

<hr>
La confusión viene del hecho de que algunas personas no tratan a Gherkin como una envoltura para automatizar conversaciones sobre los requisitos. En su lugar, quieren usarlo como una envoltura que facilita la escritura de pruebas, sin tener que escribir nuevo código de pruebas todo el tiempo.
<hr>

### 5.4.4 Clases de equivalencia
Las *clases de equivalencia* son ejemplos del tipo "X es menor que Y".
No recomienda su uso porque fomenta una falsa sensación de conocimiento compartido.

#DEFINICIÓN *Principio de Ricitos de Oro -* requiere al menos tres ejemplos de prueba cuando sea posible. Los ejemplos deberían incluir un ejemplo promedio ( aceptable ) y dos o mas ejemplos extremos (casos límite).

## 5.6 Resumen
- Los esquemas de escenario de fuera hacia dentro se escriben directamente desde ejemplos recogidos durante la fase de análisis en vez de mezclar escenarios similares.
- Los ejemplos ilustrativos son test que solo comprueban las entradas y salidas significativas. Distinto de los test exhaustivos que buscan cubrir toda posible combinacion de entradas y salidas posible para maximizar la cobertura de pruebas.
- Los esquemas de escenario trabajan bien con ejemplos representativos que ilustran los aspectos importantes de la funcionalidad del negocio.
- Los ejemplos deberían ser siempre ilustrados con contrajemplos en atención a mostrar claramente los límites entre reglas del negocio.
- El *Principio de Ricitos de Oro* establece que para un ejemplo simple debe haber entidades pertenecientes a los extremos, pero siempre una entidad pertenceciente al promedio.
- Los Boomerangs son areas de dificil implementación, con problemas de producción, y buenos candidatos para incluir en los esquemas de escenario.
- Los ejemplos como validación de campos son de demasiado bajo nivel para ser incluidos en las especificaciones ejecutables.
- Los ejemplos creados por combinación de todas las posibles entradas, a menudo hacen ilegibles, fragiles y lentas a las especificaciones.
- Siempre se debería resolver las dificultades técnicas en la capa de automatización y no en la de especificación.
