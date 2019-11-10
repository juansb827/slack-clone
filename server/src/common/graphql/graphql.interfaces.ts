export interface GqlContext {
    req?: any;
    res?: any;
    user?: {
        id: string | number
    }

}