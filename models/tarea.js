const { v4: uuidv4 } = require('uuid')

class Tarea {
  id = ''
  desc = ''
  completadoEn = null
  constructor(desc) {
    this.id = uuidv4() // Aplicar librería
    this.desc = desc
    this.completadoEn = null //redundar porque esta inicializado arriba .-.
  }
}

module.exports = Tarea
