import { NotFoundException } from '@nestjs/common/exceptions'

export class ResourceNotFound extends NotFoundException {
  constructor(public message: string) {
    super('Não encontrado: ' + message)
  }
}
