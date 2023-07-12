import { BadRequestException } from '@nestjs/common'

export class DataError extends BadRequestException {
  constructor(public message: string) {
    super('Dado inválido: ' + message)
  }
}
