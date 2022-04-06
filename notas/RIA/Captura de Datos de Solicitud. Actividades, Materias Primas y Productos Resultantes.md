# Funcionalidad:
## Captura de datos de actividades, materias primas y productos resultantes 

**Observaciones:** Cada establecimiento realiza al menos una actividad orientada al tratamiento de productos agroalimentarios. 
Esta actividad utiliza una o varias materias primas como entrada y genera uno o varios productos.
Si el establecimiento realizase varias actividades, una de ellas será considerada cómo primaria resultando las demas secuendarias.

**Como** operador de la aplicación RIA.
**Quiero que** en la captura de los datos, las decisiones sobre actividades y materias primas estén condicionadas por el contexto.
**Para que** los datos registrados sean consistentes.


#Antecedentes:  En la pantalla de captura de datos del Establecimiento hemos seleccionado un sector y un subsector.

#Escenario:  Selección de una actividad.
**Cuando:** despliego la lista de actividades.
**Entonces:** me aparecen solo las actividades permitidas para el sector y subsector seleccionados.
**Y:** puedo seleccionar una o varias actividades de esa lista (si las hubiese).

#Escenario: Establecer  la actividad primaria cuando solo se desarrolla una actividad.
**Dado que:** el establecimiento solo desarrolla una actividad.
**Cuando:**  selecciono una única actividad de la lista de actividades posibles.
**Entonces:** La actividad seleccionada queda marcada cómo 'primaria'.

#Escenario: Establecer la actividad primaria por defecto entre varias actividades.
**Dado que:** el establecimiento desarrolla varias actividades.
**Cuando:** selecciono varias actividades de la lista de actividades posibles.
**Entonces:** todas las actividades quedan marcadas como 'secundarias'

#Escenario: Establecer la actividad primaria entre varias actividades .
**Dado que:** Se han establecido varias actividades para el establecimiento.
**Cuando:**  marco una actividad como 'primaria'
**Entonces:** el resto de actividades quedan marcadas como 'secundarias'.

#Escenario: Selecciónar  materia prima.
**Dado que:**  he seleccionado previamente una actividad.
**Cuando:**  despliego la lista de materias primas.
**Entonces:** me aparecen solo las materias primas permitidas para esa actividad en el sector y subsector seleccionados.
**Y:** puedo seleccionar una o varias materias primas de esa lista (si las hubiese).

#Escenario: Selecciónar producto resultante.
**Dado que:**  he seleccionado previamente una actividad.
**Cuando:**  despliego la lista de materias primas.
**Entonces:** me aparecen solo las materias primas permitidas para esa actividad en el sector y subsector seleccionados.
**Y:** puedo seleccionar uno o varios productos de esa lista (si los hubiese).

