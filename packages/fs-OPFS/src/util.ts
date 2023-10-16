/**
 * available path type
 */
export type Path = string | URL

/**
 * resolve path to resolved paths array
 * @param path file or dictionary path
 * @returns resolved paths array
 */
export const resolvePath = (path: Path): string[] => {
  if (path instanceof URL) {
    path = path.pathname
  }

  if (!path.startsWith('/') || path.endsWith('/')) {
    throw new TypeError('Invalid path')
  }

  const paths = path.split('/')

  return paths
}
