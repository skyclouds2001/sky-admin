export type Awaitable<P> = P extends Promise<infer A> ? A : P

export type Promisify<A> = A extends Promise<infer _> ? A : Promise<A>
