import docx
document = docx.Document('./base.docx')
for table in document.tables:
    table.style = document.styles['EstiloTable1'] # custom_style must exist in your reference.docx file
document.save("./target_table.docx")