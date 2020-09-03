import Alpine from 'alpinejs'
import AlpineGun from 'alpine-gun'
import Gun from 'gun/gun'
import 'gun/lib/open'

test('model works', async () => {
  window.gun = Gun()
  gun.get('user').put({ name: 'Jon' })
  document.body.innerHTML = `
    <div x-data="{user: $gun('user')}"><input id="name" x-model="user.name"></div>
  `
  Alpine.start()
  await new Promise(r => gun.get('user').once(r))
  expect(document.querySelector('#name').value).toBe('Jon')
  document.querySelector('#name').value = 'John'
  document.querySelector('#name').dispatchEvent(new InputEvent('input'))
  expect((await new Promise(r => gun.get('user').once(r))).name).toBe('John')
})
