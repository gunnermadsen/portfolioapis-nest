import { NestFactory } from '@nestjs/core'

import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

import * as dotenv from 'dotenv'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as multer from 'multer'
import * as compression from 'compression'
import * as express from 'express'
import * as cluster from 'cluster'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import * as helmet from 'helmet'

declare const module: any

async function bootstrap() {

  // dotenv.config()

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // const options = new DocumentBuilder()
  //   .setTitle('PortfolioAPI-NestJS')
  //   .setDescription('API endpoints for my Portfolio')
  //   .setVersion('1.0')
  //   .addTag('PortfolioAPIs')
  //   .build()

  // const document = SwaggerModule.createDocument(app, options)

  const corsConfig = {
    origin: [
      'http://localhost:4200',
      'https://gunner-madsen.com',
      'https://admin.gunner-madsen.com',
      'https://coolshare.herokuapp.com',
      'https://mindfulmeals.herokuapp.com'
    ],
    methods: ['POST', 'PUT', 'OPTIONS', 'DELETE', 'GET', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept-Encoding', 'Content-Disposition', 'Content-Type', 'Accept', 'Authorization', 'X-XSRF-TOKEN'],
    credentials: true
  }

  app.use(helmet.xssFilter())
  app.use(helmet.frameguard())

  app.enableCors(corsConfig)

  const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './uploads'),
    filename: (req, file, callback) => callback(null, file.originalname)
  })

  const upload = multer({ storage: storage })

  app.disable('x-powered-by')
  
  app.use(upload.any())
  app.use(compression())
  app.use(express.static('thumbnails'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(morgan('dev'))
  app.use(cookieParser())

  // SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

}

bootstrap()