import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  NotFoundException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto, UrlResponseDto } from './url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('api/urls')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @Request() req,
  ): Promise<UrlResponseDto> {
    return this.urlService.create(createUrlDto, req.user.userId);
  }

  @Get('api/urls/my-urls')
  @UseGuards(JwtAuthGuard)
  async getMyUrls(@Request() req): Promise<UrlResponseDto[]> {
    return this.urlService.findByUserId(req.user.userId);
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
