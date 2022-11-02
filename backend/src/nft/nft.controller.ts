import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { Request } from 'express'
import { NftQueryDto } from './dto'
import { NftService } from './nft.service'

@Controller('nft')
@ApiTags('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of NFTs for a marketplace' })
  @ApiQuery({ name: 'marketplace', required: true, type: Number })
  @ApiQuery({ name: 'contractAddress', required: false, type: String })
  @ApiQuery({ name: 'withMetadata', required: false, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getNftsForMarketplace(
    @Query('marketplace', ParseIntPipe) marketplaceId: number,
    @Query('contractAddress') contractAddress: string,
    @Query('withMetadata') withMetadata: boolean,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
    return this.nftService.getNftsForMarketplace(
      marketplaceId,
      contractAddress,
      withMetadata,
      limit,
    )
  }

  @Get('owner')
  getOwnersForNft() {
    return 'get owners for nft'
  }

  // @Get()
  // @ApiOperation({ summary: 'Get a list of NFTs for a marketplace' })
  // getNftsForMarketplace(@Query() nftQuery: NftQueryDto) {
  //   return this.nftService.getNftsForMarketplace(nftQuery)
  // }

  findAll() {
    return this.nftService.findAll()
  }

  @Get(':contractAddress/:tokenId')
  findOne(
    @Param('contractAddress') address: string,
    @Param('tokenId') id: string,
  ) {
    console.log({
      address,
      id,
    })
    return this.nftService.findOne(+id)
  }
}
