import {DataType, Model, Table, Column, BelongsToMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example: 1, description: 'Post ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Title 1', description: 'Post title'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'Main content', description: 'Post details and main content'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: 'image.jpg', description: 'image'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ApiProperty({example: 2, description: 'User ID'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    author: User
}