# Capitulo 8. Organizando escenarios en una suite de especificación
Se analizan dos métodos:
* *Organizar escenarios por features -* Método de Gherkin/Cucumber por defecto.
* *Organizar escenarios por historias de usuario -* El método recomendado por el autor para SBE.
<hr>
Utiliza como ejemplo una Plataforma de participación del personal para compañias de *Fortune 500* (Las 500 empresas con mayor volumen de ventas del mundo) llamada **Activitee**.
<hr>
Una aproximación de posibles escenarios puede ser: 

	* Editar los perfiles de los empleados
	* Eliminación de antiguos empleados
	* Gestionar otros administradores de RRHH
	* ¿Es una buena idea organizar los escenarios por características? 175
	* Ver la lista de todos los empleados
	* Aprobar nuevos empleados
	* Asignar un nuevo empleado a una sucursal de la empresa
	* Asignar un nuevo empleado a un departamento
	* Sincronizar el organigrama de Activitee con una fuente externa
	* Incorporación de nuevos empleados
	* Enviar correos electrónicos a los empleados con anuncios importantes
	* Conceder acceso administrativo limitado a los jefes de equipo
	* Crear grupos de interés común

¿Cómo dividir los escenarios cuando se trata de grandes funcionalidades?

## 8.1 ¿Organizar escenarios por features es una buena idea?
Los ficheros que almacenan escenarios en Cucumber son *feature files*.

<hr>
**Problemas con los *feature files**.

* *Cualquier cosa puede ser una feature*. Un botón, una pantalla, un módulo completo, etc.
* *Las features cambian y crecen* según evoluciona el producto pudiendo llegar a ser muy grandes.
* Al no haber haber un criterio de de división de features, se pueden realizar divisiones diferentes en distintos momentos (falta de consistencia).
<hr>

## 8.2 Organizar escenarios por historias de usuario.
JBeheave tiene una aproximación distinta a cucumber organizando las especificaciones como *historias* encabezadas por *narrativas* que son descripciones cortas similares a las historias de usuario.

### 8.2.1  La palabra clave *Ability* (capacidad).
Se usa en reemplazo de *Feature*. (no aparece en la documentación de Cucumber).

Mediante la delimitación del ambito de las historias de usuario, se consigue determinar que escenarios deben permanecer juntos en la misma especificación.

Partimos de la historia de usuario
```text
PARA incrementar mi participación
COMO empleado
QUIERO ver eventos y cursos relevantes en mis noticias
```
El empleado solo recibirá avisos de eventos en su área geográfica y área de interes (asociada a su cargo), pero podrán ver cursos de otras áreas geográficas relativos a su área de interes.

`Ejemplo: especificación como feature`
```Gherkin
Feature: Branches and departments
Scenario Outline: Employees should only see content relevant to them
Given <person> from <branch> who works in <department>
When <person> looks at the company dashboard on Activitee
Then <person> should see <type> <content>
Examples: Employees should see afterwork
content only from their location
| person | branch   | department  | type                 | content |
| Jane   | New York | Engineering | New York after-work  | events  |
| Mike   | New York | HR          | New York after-work  | posts   |
| Tom    | Atlanta  | Sales       | Atlanta after-work   | events  |
| Ramona | Atlanta  | Engineering | Atlanta after-work   | posts   |
Examples: Employees should see work-related content from all locations
| person | branch   | department  | type                 | content |
| Mike   | New York | HR          | Atlanta HR           | events  |
| Jane   | New York | Engineering | Atlanta engineering  | posts   |
| Jane   | New York | Engineering | New York engineering | events  |
| Tom    | Atlanta  | Sales       | Atlanta sales        | events  |
| Ramona | Atlanta  | Engineering | Atlanta engineering  | posts   |
| Ramona | Atlanta  | Engineering | New York engineering | events  |
```

###### RELABORAR LAS FEATURES COMO ABILITIES
Se reescribe la feature como Ability con los implicados, salida y solución técnica.
```Gherkin
Ability: Employees can engage with content they like in their new feeds.
```
#NOTA Aún no se ha introducido la gestión de departamentos y divisiones territoriales.

###### ORGANIZAR LA SUITE DE ESPECIFICACIÓN CON ABILITIES.
Se sigue el siguiente orden.
	1. Ability
	2. Interesado
	3. Resultado.

Esto daría como resultado la siguiente estructura:
![fig8.2](assets/ch08/fig82.png)
Reglas: 
 1. Dos escenarios para dos interesados diferentes son, por definición dos requisitos distintos, así que deben ser dos diferentes abilities.
 2. Dos escenarios que describen dos salidas diferentes son probablemente dos requisitos distintos y deben ser divididos en dos abilities diferentes.
 3. Si comportamientos que parecen similares al principio producen distintos resultados deberian ser puestos en abilities diferentes. 

`Ejemplo regla 3`
* *Comportamiento*: Una compañía puede adherirse a la plataforma de Actividades.
	* *Resultado 1*: el invita a los empleados a crear una cuenta en Activitee.
	* *Resultado 2*: el departamento de ventas de Activitee debería ser notificado de la nueva solicitud.
 
Seguir estas reglas debería genear una suite llena de *feature files* cortos.
Cada esquema de escenario debería ser una ability diferente para distintos interesados con resultados similares agrupados en unas pocas tablas con ejemplos.

###### ELEGIR EL NIVEL CORRECTO DE GRANULARIDAD PARA LAS ABILITIES
Suponiendo la necesidad de un buscador de eventos en Activitee.

`Ejemplo. Una mala especificación`
```Gherkin
Feature: Event search
	Scenario Outline: Filtering events
		Given events:
			| name          | department | branch   | type         | users |
			| Sales 101     | Sales      | New York | work-related | Mike, John |
			| Weekly status | HR         | New York | work-related | Simona, John |
			| Bowling       | -          | Atlanta  | after-work   | Jane |
		
			When Simona searches for events by <filter>
				And she wants to find <value>
			Then she should see <results>
		
		Examples:
			| filter     | value          | results |
			| name       | "Staff picnic" | no results |
			| department | "Sales"        | "Sales 101" |
			| branch     | "New York"     | "Sales 101", "Weekly status" |
			| type       | "After-work"   | "Bowling" |
			| user       | "Mike"         | "Sales 101" |
```

Este escenario no "modela" filtros complejos como filtros AND/OR, organizadores, fecha, etc.

Se pueden pensar dos posibles soluciones:
	- Dividir los escenarios en distintos en distinto abilities donde cada uno de ellos contendria único esquema para los posibles casos límite.
	- Redefinir los *ejemplos clave* para este caso particular.

### 8.2.2 Comprender la estructura de las historias de usuario.
Formato de inyección de funcionalidad.
	*Con el proposito de [conseguir un resultado de negocio]
	Cómo [actor o interesado]
	Quiero [una solución técnica]*

Formato Connextra
	*Cómo [actor o interesado]
	Quiero [una solución]
	Para que [se consiga un beneficio para el negocio]*

### 8.2.3 Analizando la relación entre hisotrias de usuario y especificaciones ejecutables.
Un proyecto típico tendrá más historias de usuario que especificaciones.

###### Similitudes entre historias de usuario y especificaciones ejecutables
Una especificación ejecutable es similar a una historia de usuario plenamente desarrollada. Cada especificación debería poder ser rastreada hasta una historia de usuario.

###### Diferencias entre historias de usuario y especificaciones ejecutables
Las historias de usuario: 
	- Representan el alcance *futuro* del trabajo.
	- Discuten los cambios que deberían hacerse al sistema.
	- Expiran si permanecen demasiado tiempo en el *product backlog*.

Las especificaciones ejecutables.
	- Representan el alcance del trabajo que se ha hecho ya.
	- Discuten el *estado actual* de la parte elegida del sistema.
	- Se vuelven más precisas conforme pasa el tiempo, gracias a los test automatizados y el *feeback*.

### 8.2.4 Peligros de las iteraciones al organizar los escenarios por historias de usuario.
Historias de usuario y especificaciones pueden no ser equivalente debido a que, a menudo, *las historias de usuario solo son requisitos para la iteración actual*.

En el ejemplo del buscador, podría ser una funcionalidad más avanzada programada para una iteración posterior.

Desde un punto de vista técnico, una historia de usuario será un requisito completo si introduce una capacidad nueva al sistema. Si cambia una capacidad existente el requisito estará formado por las dos historias.

Las historias de usuario son como *commits* de git, que van añadiendo información.

Debido a esta naturaleza de las historias de usuario, no es conveniente incluirlas en el resumen de las especificaciones. 

Recomendaciones: 

	- No almacenar historias de usuario en las especificaciones. En vez de eso, extraer lo resultados deseados de las historias y nombrar las especificaciones en funcion de esos resultaods. Mencionar a los interesados para poner a los actores en el contexto.
	- Crear nuevas especificaciones ejecutables solo para historias de usuarios que impliquen nuevos resultados del negocio.
	- Si una historia de usuario implica un cambio en el comportamiento de un resultado existente, revisar la especificacion actual para ver si los nuevos escenarios son los suficientemente importantes para cambiar la definición del *Ability*.
	- A veces los cambios son tan importantes que crear nuevos ejemplos o escenarios no es suficiente. En este caso se debe comprobar si el cambio resulta en una nueva capacidad para un actor existente o nuevo. Si es así lo ability actual se debe dividir en dos.

## 8.3 Requisitos no funcionales.
#DEFINICIÓN *Requisito no funcional -* Define una cualidad general que el sistema debe proporcionar horizontalmente.
#DEFINICIÓN *Requisito funcional -* Definie una función de un sistema como la habilidad de resolver un problema o conseguir un objetivo.

### 8.3.1 Lidiar con requisitos no funcionales en SBE.
Dificiles de especificar o encontrar ejemplos.
### 8.3.2 ¿Puede Gherkin especificar requisitos no funcionales?
Algunos requisitos no funcionales (seguridad) pueden expresarse como requisitos funcionales (doble factor de verificación ) o comportamientos (debe introducirse la contraseña correcta en no más de tres intentos).

A menudo es posible reescribir un requisito no funcional desde el punto de vista de un actor
```text
	Given a search query
	When the system runs the query 100 times
	Then the average execution time should be less than 100 seconds
```

### 8.3.3 Presentando la nueva 
