export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type Required<T> = {
  [P in keyof T]-?: T[P]
}

export type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}
