import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
 } from "typeorm"


export enum UserRole {
    ADMiN = "admin",
    EDITOR = "editor",
    USER = "user"
}


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({unique:true})
    email!: string

    @Column({nullable:false})
    password!: string

    @Column({nullable:false})
    firstName!:string

    @Column({nullable:false})
    lastName!:string

    @Column({type:"enum", enum:UserRole, default:UserRole.USER})
    role!: UserRole

    @Column({default:true})
    active!: boolean

    @CreateDateColumn()
    createdAt!:Date

    @UpdateDateColumn()
    updatedAt!:Date

}