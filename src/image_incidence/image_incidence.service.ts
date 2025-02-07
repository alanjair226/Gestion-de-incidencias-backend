import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageIncidence } from './entities/image_incidence.entity';
import { CreateImageIncidenceDto } from './dto/create-image_incidence.dto';
import { UpdateImageIncidenceDto } from './dto/update-image_incidence.dto';
import { validate } from 'src/common/utils/validations.utils';
import { Incidence } from 'src/incidences/entities/incidence.entity';

@Injectable()
export class ImageIncidenceService {
  constructor(
    @InjectRepository(ImageIncidence)
    private imageIncidenceRepository: Repository<ImageIncidence>,
    @InjectRepository(Incidence)
    private IncidenceRepository: Repository<Incidence>,
  ) {}

  async create(createImageIncidenceDto: CreateImageIncidenceDto) {
    const incidence = await validate(createImageIncidenceDto.incidenceId , "id", this.IncidenceRepository);
    const newImage = await this.imageIncidenceRepository.create({
      ...createImageIncidenceDto,
      incidence
    })
    const imageIncidence = await this.imageIncidenceRepository.create(newImage);
    await this.imageIncidenceRepository.save(imageIncidence);

    return { message: "Imagen registrada exitosamente" };
  }

  async findAll() {
    return this.imageIncidenceRepository.find();
  }

  async findOne(id: number) {
    return this.imageIncidenceRepository.findOneBy({ id });
  }

  async update(id: number, updateImageIncidenceDto: UpdateImageIncidenceDto) {
    const existingIncidence = await this.imageIncidenceRepository.findOneBy({ id });

  }

  async remove(id: number) {
    const deleteResult = await this.imageIncidenceRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error(`ImageIncidence #${id} not found`);
    }
    return { message: `ImageIncidence #${id} successfully removed` };
  }
}
