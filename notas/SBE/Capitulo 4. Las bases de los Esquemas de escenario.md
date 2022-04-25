# Capitulo 4. Las bases de los Esquemas de escenario (*Scenario outlines*)
#DEFINICIÓN *Scenario outline -* Una plantilla que escenarios similares puede compartir para no repetir la misma plantilla *Given-Then-When* varias veces en el mismo fichero de funcionalidad.

El proceso de refinar ejemplos supone: 
	- Mezclar ejemplos similares.
	- Eliminar ejemplos irrelevantes.
	- Enfocarse en los ejemplos clave.
	- Asegurarse de que los ejemplos clave son fáciles de comprender.

## 4.1 Aplicación de Compras. Ejemplo.
Un ejemplo de una aplicación de venta online con conexión a APIS de otras compañias.
## 4.2 Usar *Scenario outlines*.
### 4.2.1 Detectar redundancias en los escenarios Gherkin.
### 4.2.2 Refactorizar escenarios redundantes con *scenario outlines*.
Dos tipos de escenarios:
- Visualmente agrupan ejemplos similares y siguen la misma estructura.
- Escenarios que son lo suficientemente importantes para permanecer separados.
### 4.3 La estructura de un *scenario outline*
`Ejemplo`
```Gherkin
Feature: Shipping
	Scenario Outline: Shipping

		Given a <format> book in Simona's cart
			When she pays for it
			Then the book should be <shipped>
		Examples:
			| format    | shipped |
			| PDF       | sent to a mobile device |
			| Audiobook | sent over email |
			| Hardcover | shipped physically |
			| Paperback | shipped physically |
			| Audio CD  | shipped physically |
```

### 4.3.1 La tabla de ejemplos.
Una tabla de ejemplos simple tendría dos casos para el criterio de aceptación: un *escenario de éxito* y un *escenario fallido*.
### 4.3.2 Parámetros.
### 4.3.3 La palabra clave *Scenario Outline*.
## 4.4 Ventajas de los *scenario outlines*.
- Ocupan menos espacio.
- Agrupan ejemplos concretos de acuerdo a reglas de negocio de nivel alto.

### 4.4.1 Ficheros de *feature* más cortos
### 4.4.2 Fichero de *feature* organizados por reglas de negocio de nivel alto.
## 4.5 Crecimiento y mantenimiento de los *scenario outlines*.
Gherkin permite organizar los ejemplos en múltiples tablas, nombrando a cada una de ellas de forma que se pueda identificar su especificidad.

`Ejemplo`
```Gherkin
Feature: Shipping
	
	Scenario Outline: Shipping
		Given an <item> in Simona's cart
			When she pays for it
			Then the book should be <shipped> by <provider>

		Examples: Ship by sending to a mobile device
			| item | shipped | provider |
			| PDF e-book | sent to mobile device | Apple |
			| PDF e-book | sent to mobile device | Google |
			| PDF e-book | sent to mobile device | Amazon |

		Examples: Ship by sending a download link
			| item | shipped | provider |
			| Audiobook | sent over email | in-house service |

		Examples: Ship by a postal service
			| item | shipped | provider |
			| Hardcover book | shipped physically | postal service |
			| Paperback book | shipped physically | postal service |
			| Audio CD | shipped physically | postal service |

		Examples: Ship by courier
			| item | shipped | provider |
			| E-reader | shipped physically | courier delivery |
			| Tablet | shipped physically | courier delivery |
			| Headphone | shipped physically | courier delivery |
```

## 4.6 Desventajas de los *scenario outlines*.
Pueden ser confusos para interesados no familiarizados con Gherkin. En este caso, mejor no enseñarselos ( eso no quiere decir que no se usen).

## 4.7 Resumen
- Los *scenario outlines* son plantillas para escenarios similares que ayudan a eliminar la redundancia.
- La tabla de ejemplos contiene y agrupa los ejemplos por similitud.
- Cada *scenario outline* puede tener multiples tablas de ejemplos.
- Los parámeteros permiten, a los programas de testeo, trasladar los ejemplos desde la tabla en el esquema.
- Los *scenario outlines* funcionan mejor cuando agrupan ejemplos por reglas de negocio.
- Un *scenario outline* debe poder crecer si aparecen nuevos ejemplos.
- Las desventajas de los *scenario outlines* es que puedan aparecer demasiado técnicos y asociados al código.



