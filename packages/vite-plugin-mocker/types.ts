export interface Mapper {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACK' | 'CONNECT'
  data?: string | Record<string, any>
  headers?: Record<string, string>
}
