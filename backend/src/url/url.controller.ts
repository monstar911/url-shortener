import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto, UrlResponseDto } from './url.dto';
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('api/urls')
  async create(@Body() createUrlDto: CreateUrlDto): Promise<UrlResponseDto> {
    return this.urlService.create(createUrlDto);
  }

  @Get(':slug')
  @Redirect()
  async redirect(@Param('slug') slug: string) {
    try {
      const url = await this.urlService.findBySlug(slug);
      await this.urlService.incrementVisits(slug);
      return { url: url.originalUrl, statusCode: HttpStatus.MOVED_PERMANENTLY };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
}
