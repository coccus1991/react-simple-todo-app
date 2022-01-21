export default class BaseEntity {
  toJSON() {
    const obj: Record<string, unknown> = {}

    for (const n in this) {
      if (!n.match(/^_/) && typeof this[n] != 'function') obj[n] = this[n]
    }

    return obj
  }

  set(obj: unknown) {
    for (const key in obj as this) {
      if (typeof this[key] !== undefined) this[key as keyof this] = (obj as this)[key as keyof this]
    }

    return this
  }
}
