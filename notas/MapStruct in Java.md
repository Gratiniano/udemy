# [StackAbuse. Guide to MapStruct in Java - Advanced Mapping Library]([Guide to MapStruct in Java - Advanced Mapping Library (stackabuse.com)](https://stackabuse.com/guide-to-mapstruct-in-java-advanced-mapping-library/))

## MapStruct 
Es una librería *open-source* para la generación de código de mapeo entre clases en Java.
Usa el procesado de anotaciones para la generación de clases de implementación de mapeo.

## Dependencias 
Dependencias para [Maven y Gradle ](https://stackabuse.com/guide-to-mapstruct-in-java-advanced-mapping-library/#:~:text=written%20by%20hand.-,MapStruct%20Dependencies).

## Mapeo Básico
Usamos siempre la etiqueta **@Mapper**
Dadas una clase entity y otra clase dto con los mismos atributos. 
```java
@Mapper 
public interface DoctorMapper { 
	DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class); 
	DoctorDto toDto(Doctor doctor); 
}
```

Esto generará una clase de implementación [DoctorMapperImpl](https://stackabuse.com/guide-to-mapstruct-in-java-advanced-mapping-library/#:~:text=public%20class-,DoctorMapperImpl,-implements%20DoctorMapper%20%7B%0A%20%20%20%20%40Override) con un método toDto que copiará los valores de los atributos de la *entidad* al *dto*.

## Mapeo entre atributos con diferente nombre
Indicamos la correspondencia dentro de la interfaz mediante **@Mapping**
```java
@Mapper 
public interface DoctorMapper { 
	DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class); 
	
	@Mapping(source = "doctor.specialty", target = "specialization") 
	DoctorDto toDto(Doctor doctor); 
}
```

# Multiples Clases Fuente
El caso de extraer un atributo de un tipo primitivo de un objeto de una clase dependiente: 
```java
@Mapper 
public interface DoctorMapper { 
	DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class); 
	
	@Mapping(source = "doctor.specialty", target = "specialization") 
	@Mapping(source = "education.degreeName", target = "degree")
	DoctorDto toDto(Doctor doctor, Education education); 
}
```

## Mapeo de Entidades hijas
Requiere generar un [*mapper*](https://stackabuse.com/guide-to-mapstruct-in-java-advanced-mapping-library/#:~:text=the%20DTO%20property.-,Mapping%20Child%20Entities,-In%20most%20cases). para cada pareja entidad/dto implicada  y luego generar el *mapper* del conjunto.

```java
public class Doctor { 
	private int id; 
	private String name; 
	private String specialty; 
	private List<Patient> patientList; 
}
```

Mapeo de la clase *Patient* (dependiente)
```java
@Mapper 
public interface PatientMapper {
	PatientMapper INSTANCE = Mappers.getMapper(PatientMapper.class); 
	
	PatientDto toDto(Patient patient); 
}
```

Mapeo de la clase *Doctor* (principal). Notar la cláusula *uses*
```java
@Mapper(uses = {PatientMapper.class}) 
public interface DoctorMapper {
	DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class); 
	
	@Mapping(source = "doctor.patientList", target = "patientDtoList") 
	@Mapping(source = "doctor.specialty", target = "specialization") 
	DoctorDto toDto(Doctor doctor); 
}
```

## Actualizar instancias existentes
Utiliza el método *updateModel* con la  anotación *@MappingTarget*
```java
@Mapper(uses = {PatientMapper.class}) 
public interface DoctorMapper { 
	DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class); 
	@Mapping(source = "doctorDto.patientDtoList", target = "patientList") 
	@Mapping(source = "doctorDto.specialization", target = "specialty") 
	void updateModel(DoctorDto doctorDto, @MappingTarget Doctor doctor); 
}
```


## Inyección de dependencias.
Si estamos usando Spring, en lugar de explicitar la clase a mapear podermos inyectarla
```java
@Mapper(componentModel = "spring") 
public interface DoctorMapper {}
```

Lo que provocará que la clase implementación esté marcada como *Component*
