/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface IStudent extends Document{
    readonly name:string
    readonly roleNumber: number;
    readonly class: number;
    readonly gender: string;
    readonly marks: number;
    readonly password: string;
}