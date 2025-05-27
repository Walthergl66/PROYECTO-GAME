import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Preguntas {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    texto!: string;

    @Column()
    opcionA!: string;

    @Column()
    opcionB!: string;    

    @Column()   
    opcionC!: string;

    @Column()   
    opcionD!: string;

    @Column()
    respuestaCorrecta!: string;



}