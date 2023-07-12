import { ConflictException } from '@nestjs/common'

export class ConflictError extends ConflictException {
  constructor(public message: string) {
    super('Conflito: ' + message)
  }
}
