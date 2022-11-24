import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";


export class JogadoresValidaOParametrosPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata): any {

        if (!value) {
            throw new BadRequestException(`O Valor do parametro ${metadata.data} deve ser informado!`)
        }
        return value;
    }

}
