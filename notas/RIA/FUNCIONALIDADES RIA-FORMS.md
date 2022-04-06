# Funcionalidades RIA 

## 1. Introducción 
El proposito de este documento es documentar las funcionalidades existentes en la actual aplicación RIA-FORMS incluyendo las adaptaciones propuestas actualmente.
Está basado en la exploración de la aplicación **RIA-FORMS** y el documento [10-RIA-Estudio viabilidad.docx](https://rema.jccm.es/projects/ria-java/repository/589/entry/trunk/productos/10-RIA-Estudio%20viabilidad.doc)en la ****Sección 4. Descripción del Sistema Propuesto. 1.1 Fase 1: Migración del actual RIA al nuevo programa y herramienta de mantenimiento***.

El documento se estructura en la descripción  del alto nivel de las **FUNCIONALIDADES** detectadas y la inclusión de escenarios de ejecución.

Estas funcionalidades estan agrupadas en torno a **Entidades**, que identificarán aquellos elementos debe gestionar.


## 2. Funcionalidades

### 1. Empresa.
La entidad **Empresa** identifica a la persona física o jurídica que responsable de, al menos, un **Establecimiento** . 

* Varias empresas pueden estar agrupadas en **Grupos de Empresas**.

#### 1.1 Atributos
- **Obligatorios y deben ser proporcionados por el usuario (1)**:
	- nif/cif de la empresa
	- nombre/razón social de la empresa
	- dirección de la empresa
	 - código postal de la empresa
	 - código de provincia de la empresa
	 - código de municipio de la empresa
	 - código de localidad de la empresa
	 - código de forma juridica de empresa
	
- **Obligatorios y deben ser proporcionados automáticamente por el sistema (2)**:
	 - usuario que ha realizado la última actualización
	 - fecha de alta

- **Opcionales y deben ser proporcionados por el usuario**:
	- cif del grupo empresarial al que pertenece la empresa
	 - telefono de la empresa
	- fax de la empresa
	- mail de la empresa
	- dirección web de la empresa
	- empresa es pyme (s/n)
	- empresa ecológica (s/n)
	- empresa paga tasas carnicas (s/n)
	- nif del representante legal de la empresa
	- nombre del representante legal de la empresa
	- cargo del representante legal de la empresa
	- nº de acreedor asignado por tarea
	- código de tercero sicam del solicitante
	- observaciones

-  **Opcionales y deben ser proporcionados automáticamente por el sistema** (3):
	- fecha de última modificación.
	- fecha de baja lógica 

#### 1.1. Alta de empresa
**Funcionalidad:**  Dar de alta una empresa nueva.

**Antecedentes:**
**Dado que** el usuario se ha autenticado
**Y** tiene permisos para dar de alta una empresa.

**Escenario:** crear una empresa.
**Dado que** el usuario se encuentra en la pantalla de creación de empresa
	**Y** la empresa no existía previamente en el sistema
**Cuando** ha rellenado, al menos,  los atributos mínimos obligatorios(1)
	**Y** confirma su intención de crear la empresa
**Entonces** el sistema completa los atributos obligatorios automáticos(2) con el identificador de usuario y la fecha actual.
	**Y** persiste los datos de la empresa,  
	**Y** muestra la pantalla de modificación de empresas
	**Y** [enlace a  Terceros]
	


#### 1.2 Baja de empresa.

**Funcionalidad:**  Dar de baja una empresa existente

**Escenario:**  Dar de baja una empresa sin establecimientos.
**Dado que** el usuario se encuentra en la pantalla de Administración de empresas.
	**Y** se ha seleccionado una empresa existente
	**Y** la empresa seleccionada no tiene establecimientos asociados.
**Cuando** indica su intención de eliminar la empresa seleccionada.
	**Y** ha contestado positivamente a un mensaje que le pide confirmar su intención de eliminar la empresa.
**Entonces** el sistema asigna a los atributos automáticos opcionales(3) a la fecha actual y el identificador del usuario conectado al atributo *usuario que ha realizado la última actualización*.
	**Y** persiste los datos de la empresa
	**Y** vuelve a la pantalla de Administración de empresas.

**Escenario:**  Dar de baja una empresa con establecimientos.
**Dado que** el usuario se encuentra en la pantalla de Administración de empresas.
	**Y** se ha seleccionado una empresa existente
	**Y** la empresa seleccionada tiene establecimientos asociados.
**Cuando** indica su intención de eliminar la empresa seleccionada.
**Entonces** el sistema advierte al usuario de que la empresa no puede darse de baja por tener establecimientos asociados
	**Y** vuelve a la pantalla de Administración de empresas.