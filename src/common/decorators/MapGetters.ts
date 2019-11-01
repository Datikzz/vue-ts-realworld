import { createDecorator } from 'vue-class-component'
import { mapGetters } from 'vuex'

type States = string[]

export function MapGetters (namespace: string, states: States) {
  return createDecorator(options => {
    if (!options.computed) { options.computed = {} }
    Object.assign(options.computed, mapGetters(namespace, states))
  })
}
