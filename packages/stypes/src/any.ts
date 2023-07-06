export type Awaitable<P> = P extends Promise<infer A> ? A : P

export type Promisify<A extends any> = A extends Promise<infer _> ? A : Promise<A>
