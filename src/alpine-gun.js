;(function (setup) {
  if (typeof module !== 'undefined') {
    setup(require('alpinejs'))
  } else {
    setup(Alpine)
  }
})(function (Alpine) {
  Alpine.addMagicProperty('gun', $el => soul => {
    let result = { loading: true }
    const chain = window.gun.get(soul)
    chain.once(r => {
      if (!r) {
        result = {}
        $el.__x.updateElements($el)
      }
    })
    chain.open(
      r => {
        result = r
        $el.__x.updateElements($el)
      },
      { meta: true }
    )
    return new Proxy(
      {
        [Symbol.unscopables]: { console: true },
        $: chain
      },
      {
        has (target, key) {
          if (key in target) return true
          return key in result
        },
        get (target, key) {
          if (key in target) return target[key]
          const r = result[key]
          return r
        },
        set (target, key, value) {
          if (result._) {
            gun.get(result._['#']).put({ [key]: value })
            return value
          } else {
            gun.get(soul).put({ [key]: value })
            return value
          }
        }
      }
    )
  })
  Alpine.addMagicProperty('setOf', $el => (x, field) =>
    Object.entries(x[field] || {})
      .filter(e => e[0] !== '_')
      .map(e => e[1])
  )
  Alpine.addMagicProperty('addToSet', $el => (x, field, value) => {
    gun
      .get(x._['#'])
      .get(field)
      .set(value)
  })
})
