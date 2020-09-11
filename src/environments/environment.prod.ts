import { ImagesService as MockService } from '../app/core/services/image.mock.service';
import { ImagesService } from '../app/core/services/images.service';

export const environment = {
  production: true,
  baseURL: 'http://localhost:3000/',

  providers: [{ provide: MockService, useClass: ImagesService }],
};
