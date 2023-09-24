import {
  describe, expect, it,
} from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('Base Button Color Prop', () => {
  it('Accepts red color prop', () => {
    const wrapper = shallowMount(BaseButton, { propsData: { color: 'red' } })
    expect(wrapper.classes()).toContain('bg-red-700')
  })

  it('Uses default blue color prop', () => {
    const wrapper = shallowMount(BaseButton)
    expect(wrapper.classes()).toContain('bg-blue-700')
  })
})
