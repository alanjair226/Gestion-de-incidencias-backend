import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageIncidence } from './entities/image_incidence.entity';
import { CreateImageIncidenceDto } from './dto/create-image_incidence.dto';
import { UpdateImageIncidenceDto } from './dto/update-image_incidence.dto';
import { validate } from 'src/common/utils/validations.utils';
import { Incidence } from 'src/incidences/entities/incidence.entity';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Injectable()
export class ImageIncidenceService {
  constructor(
    @InjectRepository(ImageIncidence)
    private imageIncidenceRepository: Repository<ImageIncidence>,
    @InjectRepository(Incidence)
    private IncidenceRepository: Repository<Incidence>,
    private googleDriveService: GoogleDriveService,
  ) {}

  async create(createImageIncidenceDto: CreateImageIncidenceDto, file: Express.Multer.File) {
    const incidenceId = parseInt(createImageIncidenceDto.incidenceId, 10);
    const incidence = await validate(incidenceId, "id", this.IncidenceRepository)

    const uploadedFileId = await this.googleDriveService.uploadFile(file.path, file.mimetype, file.originalname);
    const url = await this.googleDriveService.generatePublicUrl(uploadedFileId)

    const newImage = this.imageIncidenceRepository.create({
      url: url.webViewLink,
      incidence
    });

    await this.imageIncidenceRepository.save(newImage);

    return { message: "Imagen registrada exitosamente", imageUrl: url };
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
