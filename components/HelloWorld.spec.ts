import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
  it('component renders Hello world properly', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.text()).toContain('Hello world')
  })
})
