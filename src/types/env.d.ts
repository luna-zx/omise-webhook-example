declare module "bun" {
    export interface Env {
        OMISE_PUBLIC_KEY: string
        OMISE_SECRET_KEY: string
        PORT: string
    }
}