# Capitulo 3. Dominando la plantilla Given-Then-When

## 3.1 Eligiendo el estilo correcto para los  escenarios Gherkin.
### 3.1.1 Desarrollo de afuera hacia adentro con Gherkin.
###### ESCRIBIR ESCENARIOS ORIENTADOS AL USUARIO
En lugar de indicar el estado en que queda el sistema, indicar cómo afecta esto al usuario ( es notificado, se le muestra..., etc.)
***Usar  strings multilinea***
Cadenas que ocupan más de una línea, conocidas como *doc strings*
```text
Given a text:
	"""
	No hay una regla sobre cómo escribir.
	Algunas veces todo va bien.
	Otras toda se hace imposible.
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