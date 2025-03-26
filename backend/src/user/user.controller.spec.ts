import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto } from './user.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const mockRegisterDto: RegisterUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
      },
      token: 'mock-jwt-token',
    };

    it('should successfully register a new user', async () => {
      mockUserService.register.mockResolvedValue(mockResponse);

      const result = await controller.register(mockRegisterDto);

      expect(result).toEqual(mockResponse);
      expect(userService.register).toHaveBeenCalledWith(mockRegisterDto);
    });

    it('should throw ConflictException when email is already registered', async () => {
      mockUserService.register.mockRejectedValue(
        new ConflictException('Email already registered'),
      );

      await expect(controller.register(mockRegisterDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    const mockLoginDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse = {
      user: {
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
      },
      token: 'mock-jwt-token',
    };

    it('should successfully login a user', async () => {
      mockUserService.login.mockResolvedValue(mockResponse);

      const result = await controller.login(mockLoginDto);

      expect(result).toEqual(mockResponse);
      expect(userService.login).toHaveBeenCalledWith(mockLoginDto);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockUserService.login.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(controller.login(mockLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
