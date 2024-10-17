import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() createPostDto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.create(createPostDto, image)
    }

}
