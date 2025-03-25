import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDto, UrlResponseDto } from './url.dto';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private configService: ConfigService,
  ) {}

  async create(
    createUrlDto: CreateUrlDto,
    userId: string,
  ): Promise<UrlResponseDto> {
    const { originalUrl, customSlug } = createUrlDto;

    // Check if URL already exists for this user
    const existingUrl = await this.urlRepository.findOne({
      where: { originalUrl, user: { id: userId } },
    });
    if (existingUrl) {
      return this.mapToResponseDto(existingUrl);
    }

    // Generate a unique slug
    let slug = customSlug;
    if (!slug) {
      let isUnique = false;
      while (!isUnique) {
        slug = nanoid(6);
        const existingUrl = await this.urlRepository.findOne({
          where: { slug },
        });
        if (!existingUrl) {
          isUnique = true;
        }
      }
    } else {
      // Check if custom slug already exists
      const existingUrl = await this.urlRepository.findOne({ where: { slug } });
      if (existingUrl) {
        throw new ConflictException('This slug is already in use');
      }
    }

    // Create new URL entry
    const url = this.urlRepository.create({
      originalUrl,
      slug,
      user: { id: userId },
    });

    const savedUrl = await this.urlRepository.save(url);

    return this.mapToResponseDto(savedUrl);
  }

  async findByUserId(userId: string): Promise<UrlResponseDto[]> {
    const urls = await this.urlRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    return urls.map((url) => this.mapToResponseDto(url));
  }

  async findBySlug(slug: string): Promise<Url> {
    const url = await this.urlRepository.findOne({ where: { slug } });
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    return url;
  }

  async incrementVisits(slug: string): Promise<void> {
    const url = await this.findBySlug(slug);
    url.visits += 1;
    await this.urlRepository.save(url);
  }

  private mapToResponseDto(url: Url): UrlResponseDto {
    const baseUrl = this.configService.get('BASE_URL', 'https://short.ly');

    return {
      id: url.id,
      originalUrl: url.originalUrl,
      slug: url.slug,
      shortUrl: `${baseUrl}/${url.slug}`,
      visits: url.visits,
      createdAt: url.createdAt,
    };
  }
}
