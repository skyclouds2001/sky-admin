/**
 * resolve path to resolved paths array
 * @param path file or dictionary path
 * @returns resolved paths array
 */
export const resolvePath = (path: string): string[] => {
  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new TypeError('Invalid path')
  }

  const paths = path.split('/')

  return paths
}
