import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {Post} from "./posts.model";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private filesService: FilesService) {}

    async create(createPostDto: CreatePostDto, image: any): Promise<Post> {
        try {
            const fileName: string = await this.filesService.createFile(image)
            const post: Post = await this.postRepository.create({...createPostDto, image: fileName})
            return post;
        } catch (e) {
            console.error(e);
        }

    }

    async findAll(): Promise<Post[]> {
        const posts: Post[] = await this.postRepository.findAll()
        return posts
    }

    async findOne(id: number): Promise<Post> {
        const post = await this.postRepository.findByPk(id)
        return post;
    }

    async findAllUserPosts(id: number): Promise<Post[]> {
        const posts: Post[] = await this.postRepository.findAll({where: {userId: id}})
        return posts
    }
}
