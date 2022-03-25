# Spring REST API + OAuth2 + Angular
ref: - https://www.baeldung.com/rest-api-spring-oauth2-angular

## 1. Introducción
El proposito del artículo sera **asegurar un API REST con OAuth2 y consumirla desde un cliente Angular sencillo.**
La aplicación constará de tres módulos separados: 
* Servidor de autorización
* Servidor de Recursos
* UI de autorización: una aplicación  de front-end que utiliza *Authorization Code Flow*.
**Se usará el stack de OAuth para Spring Security 5**. 

## 2. El Servidor de Autorización (AS) de OAuth
De forma simple,  un **Servidor de autorización es una aplicación que emite tokens para autorización**.

Se usará ***KeyCloack***. Es un servidor de Identidad y Gestión de Acceso open-source administrado por Red Hat. Soporta OAuth2, OpenID Connect y SAML.

Para realizar el tutorial será necesario poner en marcha un [**Servidor embebido Keycloack en una app de Spring**](https://www.baeldung.com/keycloak-embedded-in-a-spring-boot-application/).

## 3. El Servidor de Recursos (RS)
**Un Servidor de Recursos, esencialmente, es el REST API que queremos poder utilizar**.
### 3.1 Configuración Maven
Será la misma que para el Servidor de Autorización, con una dependencia adicional sin el llavero y con una dependencia adicional.
```html
<dependency> 
	<groupId>org.springframework.boot</groupId> 
	<artifactId>spring-boot-starter-oauth2-resource-server</artifactId> </dependency>
```

### 3.2 Configuración de la seguridad.
Se realizará una configuración mínima usando **boot properties** en el ficharo *application.yml*:

```yml
server: 
	port: 8081 
	servlet: 
		context-path: /resource-server 
		
spring: 
	security: 
		oauth2: 
			resourceserver: 
				jwt: issuer-uri: http://localhost:8083/auth/realms/baeldung 
				jwk-set-uri: http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/certs
				
```

Aquí se especifica que usaremos tokens JWT para la autorización.

**La propiedad *jwk-set-uri* apunta a la URI conteniendo la clave pública de forma que nuestro Servidor de Recursos pueda verificar la integridad de los tokens.

La propiedad *issuer-uri* representa una medida de seguridad adicional para validar al emisor de los tokens (que es el Servidor de Autorización). Añadir esta propiedad obliga que el Servidor de Autorización deba estar ejecutandose  antes de que el servidor de recursos pueda iniciarse.

A continuación se debe establecer **una configuración de seguridad del API para asegurar los *endpoints***.

```java
@Configuration 
public class SecurityConfig extends WebSecurityConfigurerAdapter { 
	@Override 
	protected void configure(HttpSecurity http) throws Exception {
		 http.cors()
		  .and()
		   .authorizeRequests()
		    .antMatchers(HttpMethod.GET, "/user/info", "/api/foos/**")
		     .hasAuthority("SCOPE_read")
		      .antMatchers(HttpMethod.POST, "/api/foos")
		       .hasAuthority("SCOPE_write")
		        .anyRequest()
		         .authenticated()
		          .and()
		           .oauth2ResourceServer()
		            .jwt();
	} 
}
```

Se pueder ver que lo métodos GET solo permiten peticiones que tengan un ámbito de *lectura*. En el método POST el solicitante debe tener autorización para *escribir* además de para *leer*. Para el resto de endpoints la solicitud solo necesita estar autenticada con cualquier usuario.

Además, el método **oatuh2ResourceServer()** especifica que este servidor de recursos utiliza tokens con formato *jwt()*.

### 3.4 El modelo y el Repositorio
Definir un *javax.persistence.Entity* para nustro modelo, *Foo*:

```java
@Entity
public class Foo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	// constructor, getters and setters
}
```

Ahora se necesita un repositorio para *Foos*. Usaremos *PagingAndSortingRepository* de Spring.

```java
public interface IFooRepository extends PagingAndSortingRepository<foo, Long{
}
```

### 3.5 Servicio e implementación
Finalmente, definimos e implementamos un servicio simple para nuestra API: 
```java
public interface IFooService{

	Optional <Foo> findById(Long id);

	Foo save(Foo foo);

	Iterable<Foo> findall();

}


@Service
public class FooServiceImpl implements IFooService {

	private IFooRepository fooRepository;

	public fooServiceImpl(IFooRepository fooRepository){
		this.fooRepository = fooRepository;
	}

	@Override
	public Optional<Foo> findBy(Long id) {
		return fooRepository.findById(id)
	}
	
	@Override
	public Foo save(Foo foo){
		return fooRepository.save(foo);
	}

	@Override
	public Iterable<Foo> findAll(){
		return fooRepository.findAll();
	}
}
```


### 3.6 Controlador ejemplo.
Se implementa un controllador simple que exponga el recurso *Foo* vía DTO:
```java
@RestController
@RequestMapping(value = "/api/foos")
public class FooController {
	private IFooService fooService;

	public FooController(iFooService fooservice){
		this.fooService = fooService;
	}

	@CrossOrigin(origins = "http://localhost:8089")
	@GetMapping(value="/{id}")
	public FooDto findOne(@PathVariable Long id){
		Foo entity = fooService.findById(id)
			.orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		return convertToDto(entity)
	}

	@GetMapping
	public Collection<FooDto> findAll(){
		Iterable<Foo> foos = this.fooService.findAll();
		List <FooDto> fooDtos = new ArrayList<>();
		foos.forEach( p -> fooDtos.add(converToDto(p)));
		return fooDtos;
	}
	
	protected FooDto converToDto(Foo entity){
		FooDto dto = new FooDto(entitty.getId(), entity.getName());
		return dto;
	}

}
```
***@CrossOrigin:***  permite CORS a nivel controlador desde la aplicación Angular que se ejecuta en la URL indicada.

*FooDto:*
```java
public class FooDto{
	privatre long id;
	private String name;
}
```


## 4. Configuración del Front End

Se realiza la implementación de un front-end sencillo de Angular que accedera a la API REST.
Se usarán npm y Angular CLI para generar y administrar los módulos del front-end.
Para construir el front-end se utilizará el [frontend-maven-plugin]( https://github.com/eirslett/frontend-maven-plugin).
```xml
<build>
	<plugins>
		<plugin>
			<groupId>com.github.eirslett</groupId>
			<artifactId>frontend-maven-plugin</artifactId>
			<version>1.3</version>
			<configuration>
				<nodeVersion>v6.10.2</nodeVersion>
				<npmVersion>3.10.10</npmVersion>
				<workingDirectory>sr/main/resoruces</workingDirectory>
			</configuration>
			<executions>
				<execution>
					<id> install-node-and_npm </id>
					<goals>
						<goal>install-node-and-npm</goal>
					</goals>
				</execution>
				<execution>
					<id>npm install</id>
					<goals>
						<goal>npm</goal>
					</goals>
				</execution>
				<execution>
				</execution>
					<id>npm run build</id>
					<goals>
						<goal>npm</goal>						
					</goals>
					<configuration>
						<arguments>run build</arguments>
					</configuration>
			</executions>
		</plugin>
	</plugins>
</build>
```

Finalmente, **generamos un nuevo modulo mediante Angular CLI:**
```bash
ng new oauthApp
```
