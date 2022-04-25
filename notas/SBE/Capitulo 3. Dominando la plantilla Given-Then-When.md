# Capitulo 3. Dominando la plantilla Given-Then-When

## 3.1 Eligiendo el estilo correcto para los  escenarios Gherkin.
### 3.1.1 Desarrollo de afuera hacia adentro con Gherkin.
###### ESCRIBIR ESCENARIOS ORIENTADOS AL USUARIO
En lugar de indicar el estado en que queda el sistema, indicar cómo afecta esto al usuario ( es notificado, se le muestra..., etc.)
***Usar  strings multilinea***
Cadenas que ocupan más de una línea, conocidas como *doc strings*
```Gherkin
Given a text:
	"""
	No hay una regla sobre cómo escribir.
	Algunas veces todo va bien.
	Otras todo se hace imposible.
	"""
```
#TIP Discutir sobre escenarios Gherkin es una forma muy productiva de generar ideas y descubir funcionalidades. Mejor que los diagramas.

###### DEFINIR ACTORES EN LOS ESCENARIOS
Nombrar a los actores con nombres propios ayuda a visualizar mejor.
#DEFINICIÓN  *Actor -* Cualquier persona o cosa que influencia una accion o un proceso que tiene lugar en el sistem bajo diseño.
	- Interesados.
	- Organizaciones
	- Sistemas.

###### DESARROLLO DE FUERA  HACIA DENTRO Y ESCENARIOS ORIENTADOS AL USUARIO.
#DEFINICION *Desarrollo de fuera hacia dentro -* metodología de desarrollo basada en la comprensión de los objetivos y motivaciones de los interesados.Especialmente en los **usuarios finales**.


#TIP Intentar comprender *quien* quiere una determinada solución y *porqué* la necesita. Recomendable el uso de *mapas de ruta*.

### 3.1.2 Recogiendo datos realistas.
Los datos tomados de la realidad hacen los escenarios más realistas y agradables de leer.
Deben proporcionar el contexto en el que fueron escritos.

### 3.1.3 Favorecer la especificación de intenciones y resultados sobre el interface de usuario.
Los *comportamientos* son acciones realizadas por actores que suponen un cambio en el sistema. 
**Es necesario abstraerlos al nivel adecuado**.

<hr>
*N.del.A.* :* Cucumber y Gherkin están tipicamente asociados con el testeo de sistemas end-to-end. Esta **herencia** hace que mucha gente escriba escenarios Gherkin para hablar acerca de lo que se comprueba en la **capa de automatización**: el interfaz de usuario
<hr>

#DEFINICION *Pruebas end-to-end -* Pruebas que comprueban si el flujo de una aplicación se comporta según lo esperado de principio a fín. 
#TIP [ESTILO] No escriba escenarios sobre el UI. Escriba acerca de resultados del negocio. A nadie le preocupa el UI sino saber que se hará el trabajo.
- Estilo orientado a interfaz - *Imperativo*. Cómo trabajan los testeadores.
- Estilo orientado al negocio - *Declarativo*. Describe *lo que hace* el usuario pero no *como lo hace*. La parte del *como* se delega a los *step definitions* y es gestionada por la capa de automatización.

## 3.2 Componer escenarios de Gherkin
Dos niveles de composición:
- *Composición de bajo nivel -* Cómo formular los pases de Gherkin.
- *Composición de alto nivel -* Cómo balancear los *Givens, Whens* y *Thens* en los escenarios.

### 3.2.1 Empezar con un *Then*
#TIP Empezar con ejemplos de resultados para dar a los usuarios del negocio una idea de lo que pueden obtener. Los resultados o salidas **ya existen** en el mundo real.
#TIP Para obtener mejores resultados, examinar comportamientos ya existentes y tratar de mejorarlos.
#DEFINICION *Miopia de mercado -* prestar más atención a lo que el producto hace que a los beneficios y experiencias proporcionados al cliente.

Los clientes quieren *resultados* y los *Then* son los resultados.
#TIP [ESTILO] Para facilitar el desarrollo de fuera hacia dentro usar como base para los *Then* la siguiente plantilla: ***<un actor/> debería ser capaz de conseguir <el resultado/>***.

### 3.2.2 Usar solo un *When* por escenario.
Los *When* son disparadores. Si se tienen varios no se puede estar seguro de cual provoca el resultado.
Pensar en los *When* como *tareas de usuario* realizadas por actores.
#DEFINICIÓN *Tarea de usuario -* Una instrucción de alto nivel que describe una única actividad del negocio.
#TIP Pensar en la *tarea de usuario* como algo que debería poder realizarse sin encender el ordenador. Debe pertenecer al dominio del negócio, no al dominio técnico.
#TIP [ESTILO] Las tareas de usuario tienen lugar en el presente. Deben ser formuladas en modo activo parea diferenciarlas del contexto y las salidas.

<hr>
**El patrón Guión**
Organiza los test alrededor de actores que realizan tareas de usuario para conseguir sus objetivos de negocio.
<hr>

En ocasiones, escenarios con multiples *When* son aceptables: Cuando cada tarea de usuario está compuesta de múltiples actividades de bajo nivel llamadas *acciones de usuario*.
```gherkin
Scenario: Printing documents

	Given a 50 pages long draft
		When Vladimir wants to print in the letterhead format
			And he chooses to print all the pages
			And he chooses to print in low quality
	Then the printer should print 50 low quality A4 pages
```

#TIP [COMPOSICION] Para distinguir las *acciones* de las *tareas*, recordar que las tareas deberian permitir al actor proceder con los *Then*. Si un *When* necesita aclaración adicional, es una *acción de usuario*.

### 3.2.3 Especificar prerrequisitos con *Givens*.
Un *Given* crea una captura del mundo representado *antes* de que la acción tenga lugar. Establece el contexto en que se llevarán a cabo las acciones.
#TIP [ESTILO] No formule *Givens* como acciones. Use la voz pasiva o formule cada *Given* cómo una lista de cosas que necesitan ocurrir antes de que los actores puedan actuar.

###### Reusar los Givens como  Backgrounds (Antecedentes).
Cuando varios escenarios comparten los mismos prerequisitos.
#DEFINICIÓN *Background/Antecedentes -* Lista de pasos que se ejecutan antes de cada uno de los escenarios en el mismo fichero de *feature/funcionalidad*

```Gherkin
Feature: Search and replace

	Background:
		Given a text:
			"""
			It was love at first sight, at last sight,
			at ever and ever sight.
			"""
```

### 3.2.4 Eligiendo el nivel de abstracción correcto.
Podría parecer que listar cada acción posible es una buena idea, pero esto no siempre es así.

###### Desventajas de sobre-especificar
El texto se puede hacer más dificl de entender.

###### ¿Cuantos pasos debería haber en un escenario?
#TIP [ESTILO] cómo regla general, se deberían mantener los escenarios a un nivel de abstracción que permita tener los mínimos *Given, When* y *Then* posibles sin sacrificar la legibilidad.

Si se da un *flujo* que debe ser parte del escenario, porque este no pueda tener lugar sin el primero pero que no se esencial para su entendimiento, solo se mencionará brevemente incluyendolo en un concepto más general.

Es bueno ser detallado cuando se está incorporando un concepto nuevo y más abstracto en posteriores menciones.

Puede usarse la *Prueba de pasillo* para determinar si se ha sido lo suficientemente específico.
#DEFINICIÓN *Prueba de pasillo -* Solicitud informal de validación a los usuarios.

## 3.3 Contando historias con impacto en Gherkin.
### 3.3.1 Escibir narrativas de calentamiento. 
Empezar escribiendo narraciones cortas acerca del requisito. No pensar en implementación, limitaciones técnicas o las nuevas funcionalidades. Simplemente escribir.

### 3.3.2  Confrontar criterios de aceptación con ejemplos.
Nuevos ejemplos pueden llevar a nuevos criterios de aceptación y viceversa.
Explorar ejemplos es mejor cuando no se tiene una idea clara de las reglas del sistema o se quieren confrontar las asunciones estereotípicas. Recoger criterios de aceptación es mejor cuando las reglas están bien definida.

### 3.3.3 Explorar contextos cuestionando los Given.
 Es fácil dar por cerrado un escenario incompleto.
La pregunta es **"¿Hay algún contexto en el cual, para el mismo evento, produzca un resultado diferente?"**. 
 
### 3.3.4 Explorar las salidas cuestionando los Then.
La pregunta es **"¿Existe algún otro resultado que sea importante?"**.

Cómo regla general, si un escenario tiene mñas de un producto se debe preguntar si todos los productos pertenecen al mismo dominio del negocio. Si no pertenecen, probablemente deberían ser separados en dos escenarios distintos.

## 3.4 Resolución a los ejercicios.
## 3.5 Resumen.
- El desarrollo de fuera hacia dentro es una metodología que incita a conseguir una comprensión clara de los objetivos y motivaciones de los interesados.
- Empezar a escribir los escenarios con *Then* para enfatizar los productos importantes para los interesados.
- Mantener los escenarios cortos y simples, intentado usar un único *When* por escenario.
- Los *When* deberían describir las reglas del negocio y los comportamientos dirigidos por el negocio, y no implementaciones o el UI.
-  Para separar contexto de acciones y consecuencias, escribir los *Given* redactando en modo pasivo.
- Una narrativa de calentamiento esquematiza brevemente un momento en la vida del actor.
- Examinar ejemplos significa comprobar los limites de los criterios de aceptación.
- Cuestionarse el contexto significa buscar otros posibles *Given* y *Then* para los mismo *When*.
- Cuestionarse los resultados significa buscar otros posibles *Then* para los mismos *Given* y *When*.



