# PANDOC
Pandoc is a [Haskell](https://www.haskell.org/) library for converting from one markup format to another, and a command-line tool that uses this library

## Referencias.

- [Table Extended](https://github.com/aidenlx/table-extended#table-extended). Extend basic table in Obsidian with MultiMarkdown table syntax.
- [Pandoc User’s Guide ](https://pandoc.org/MANUAL.html)
- [Markdown to docx, including complex template - Stack Overflow](https://stackoverflow.com/questions/14249811/markdown-to-docx-including-complex-template)
- 

## Ejemplo conversión a ,docx
```shell
# pipeline
pandoc -t latex -f gfm "RIA. Propuesta tramitación.md" | pandoc -f latex --data-dir=. -o "RIA. Propuesta tramitación.docx"


# renderizar mermaid y usar custom-reference.docx con los estilos a aplicar
pandoc --filter mermaid-filter.cmd "RIA. Propuesta tramitación.md" --reference-doc=.\data\custom-reference.docx  -o "RIA. Propuesta tramitación.docx"

# concatenacion
pandoc -s -f markdown -t latex file1.md file2.md file3.md -o combined.tex
pandoc -s .\data\custom-reference.docx "RIA. Propuesta tramitación.docx" -o output.docx

# convertir a MD extrayendo imagenes
pandoc --extract-media ./assets .data/custom-reference.docx -o output.md 

## COVER PAGE AGRICULTURA EVS
pandoc "./data/AGRI_cover_page.md"  --reference-doc=.\data\custom-reference.docx  -o "AGRI_cover_page_md.docx"

```


## Estilos en DOCX
A la hora de definir los estilos en Word se pueden definir cómo asociados a caracter o asociados a parrafo.
Dependiendo de esto se podrán referir en el documento markdown de dos formas distintas.
```markdown
**Asociados a caracter**
[texto a resaltar]{custom-style="estilo"}

**Asociados a parrafo**
::: {custom-style="estilo"}
  lineas del
  parrafo a 
  resaltar
:::

```

## Estilos definidos en references.docx
```
C:\repositorios\udemy\notas\pruebas>pandoc custom-reference.docx -f docx+styles -t markdown

#  Heading 1

##  Heading 2

###  Heading 3

####  Heading 4

#####  Heading 5

######  Heading 6

#######  Heading 7

########  Heading 8

#########  Heading 9

::: {custom-style="First Paragraph"}
First Paragraph.
:::

::: {custom-style="Body Text"}
Body Text. Body Text Char. ` Verbatim Char ` .
[[Hyperlink]{custom-style="Hyperlink"}](http://example.com) . Footnote.
[^1]
:::

::: {custom-style="Block Text"}
> Block Text.
:::

::: {custom-style="Table Caption"}
Table caption.
:::

  -----------------------------------------------------------------------
  Table                               Table
  ----------------------------------- -----------------------------------
  1                                   2

  -----------------------------------------------------------------------

  : Table caption.

::: {custom-style="Image Caption"}
Image Caption
:::

DefinitionTerm

:   Definition

DefinitionTerm

:   Definition

::: {custom-style="Prueba"}
Prueba
:::

[^1]:
    ::: {custom-style="footnote text"}
    []{custom-style="footnote reference"} Footnote Text.
    :::
``` 

## Estilos de Tabla.
**Pandoc** aplica siempre el *estilo de tabla* por defecto *Table* que no es editable en *Word 2016*.

La alternativa más sencilla encontrada ha sido incluir un post-proceso en Python mediante la librería [python-docx](https://python-docx.readthedocs.io/en/latest/) que reasigne el estilo de tabla al deseado.

```python
import docx
document = docx.Document('./base.docx')
for table in document.tables:
    table.style = document.styles['EstiloTable1'] # custom_style must exist in your reference.docx file
document.save("./target_table.docx")
```

## +hard_line_breaks
La conversión de algunos documentos simples en *MarkDown* a *docx* no preserva los *cambios de linea*. 
Es necesario añadir la extensión *+hard_line_breaks*
```shell
pandoc -f markdown+hard_line_breaks tmp.md -o tmp.docx
```
