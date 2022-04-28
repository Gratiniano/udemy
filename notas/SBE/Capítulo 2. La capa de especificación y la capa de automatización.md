# Capítulo 2. La capa de especificación y la capa de automatización.
## 2.1 Las capas de especificaciones ejecutables.
Cada especificación ejecutable tiene dos capas:  *capa de especificación*  y  *capa de automatización*.

 ```mermaid
graph TD
A[Especificación ejecutable] --> B[Capa de especificación]
A --> C[Capa de automatización]
```
### 2.1.1 Capa de especificación
#DEFINICIÓN    *Capa de especificación -* Contiene documentos de texto escritos en Gherkin que los humanos pueden leer.

**Elementos:**
	 - Criterios de aceptación.
	 - Escenarios.
	 - Lenguaje común.

Expresado todo en forma de escenarios *Given-When-Then*.

#DEFINICIÓN    *Suite de especificación -* Colección de especificaciones ejecutables y el código de prueba para un único proyecto. Suele colocarse en el código base ddonde pude ser automatizada y ejecutada.

### 2.2.2 Capa de automatización
#DEFINICIÓN    *Capa de automatización -* ejecuta una simulación de la aplicación implementada para comprobar si el código se comporta según lo definido en la especificación.

Cada vez que quieres escribir una especificaciòn Gherkin debes añadir un nuevo fichero .feature a la capa de especificación de la *suite de especificación*, escribir los escenarios allí y entonces añadir el código de prueba a la suite.

**Gherkin** gestiona todo lo relativo a captura de convesaciones sobre la lógica del negocio, desde reescritura de los criterios de aceptación cómo escenarios hasta el modelado del dominio del negocio usando el lenguaje común. **Cucumber** permite al equipo de entrega probar el sistema usando los mismos ejemplos que se han capturado.

## 2.2 Escribir tu primer escenario Gherkin

### 2.2.1 Feature (Funcionalidad)
*Feature* es la palabra que usa Gherkin para indicar que una nueva especificación ha comenzado. Puede ser sustituida por las palabras *Ability* o *Business Need* que permiten una mejor categorización.

Bajo la linea de *Feature*  se puede añadir una explicación de la funcionalidad.

#DEFINICIÓN    *Resumen de la especificación -* Linea de especificación conteniendo información importante para comprender la especificación.


### 2.2.2 Scenario
Historias que describen como los usuarios interactuan con el sistema.

Debe seguir el patrón *Given-When-Then*:
		- Definir el contexto (*Given*s).
		- Describir un evento que ocurre en el sistema (*When*s).
		- Asegurarse que el resultado esperado tiene lugar (*Then*s)

Se permite incluir cualquier cantidad de información en formato libre entre la palabra reservada *Scenario* y el primer *Given* que ayude a aclarar cual es el propósito del escenario.

### 2.2.3 Given (Dado que)
Responden a la pregunta ¿qué prerequisitos permiten que ocurra el escenario?
Proporcionan un contexto donde el escenario tiene lugar.

```Gherkin
Feature: Planificación

  Dado que la planificación es una funcionalidad muy grande, este fichero de especificación describe solo el escenario de alto nivel más importante
  Scenario: Creación de una reunión

    Given Mike, un miembro del equipo
```
[ Best practice ]--> se usa un ejemplo concreto, Mike y el rol que desempeña.


### 2.2.4 When (Cuando)
Describen las acciones clave que realiza el usuario.
```Gherkin
Feature: Planificación

  Dado que la planificación es una funcionalidad muy grande, este fichero de especificación describe solo el escenario de alto nivel más importante
  
  Scenario: Creación de una reunión

    Given Mike, un miembro del equipo 
	When Mike elige 02.00pm cómo hora de comienzo de su reunión
```


### 2.2.5 Then (Entonces)
Describe las consecuencias de la acción (When) en el contexto (Given). 
Normalmente son representaciones concretas de las reglas que quieren aplicarse.

```Gherkin
Feature: Planificación

  Dado que la planificación es una funcionalidad muy grande, este fichero de especificación describe solo el escenario de alto nivel más importante
  
  Scenario: Creación de una reunión

    Given Mike, un miembro del equipo 
	When Mike elige 02.00pm cómo hora de comienzo de su reunión
	Then he should be able to save his meeting
```


## 2.3 Comprensión de las estructuras de pasos y escenarios.
El paso de la capa de especificación a la de automatización.
#DEFINICIÓN    *Paso -*  la unidad más pequeña de la especificación Gherkin. Usualmente una única línea de código. Consiste en la *palabra reservada* seguida por el contenido en lenguaje natural.

Trabaja en dos niveles:
		- Describe la lógica del negocio en lenguaje natural.
		- Esta estrechamente relacionado con el código de pruebas subyacente.
Desde este punto de vista:
		- *Givens* ejecutan el código  necesario para crear el escenario de pruebas.
		- *Whens* ejecutan la acción principal del escenario que, se supone, cambiará el estado del sistema.
		- *Thens* miden o verifican las consecuencias de la acción realizada.

## 2.4 Probando diferentes salidas.
Para asegurar que la suite de especificación tiene una cobertura de escenarios aceptable, se debe especificar lo que ocurre tanto cuando cuando  un usuario realiza una aproximación exitosa cómo 


