import { Injectable } from '@nestjs/common'
import { Command } from 'nestjs-command'
import { DatabaseSeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  //npx nestjs-command seed:database
  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding')
    await Promise.all([
      this.seedService.addRooms(),
      this.seedService.addServices(),
      this.seedService.addPrices(),
      this.seedService.addUsers(),
    ])
    console.log('🌱 Seeding done 🏁')
  }

  //npx nestjs-command seed:database:services
  @Command({
    command: 'seed:database:services',
    describe: 'seed the database',
  })
  async seedServices() {
    console.log('🌱 Start seeding')
    const r = await this.seedService.addServices()
    console.log(r)
    console.log('🌱 Seeding done 🏁')
  }

  //npx nestjs-command seed:reset
  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting')
    await Promise.all([
      this.seedService.deleteAllRooms(),
      this.seedService.deleteAllServices(),
      this.seedService.deletePrices(),
      this.seedService.deleteUsers(),
    ])
    console.log('🌱 Deleting done 🏁')
  }
}
