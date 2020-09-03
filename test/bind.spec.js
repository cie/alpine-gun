import Alpine from 'alpinejs'
import AlpineGun from 'alpine-gun'
import Gun from 'gun/gun'
import 'gun/lib/open'

test('x-text works', async () => {
  window.gun = Gun()
  gun.get('user').put({ name: 'Jon' })
  document.body.innerHTML = `
    <div x-data="{user: $gun('user')}"><span id="name" x-text="user.name"></span></div>
  `
  Alpine.start()
  await new Promise(r => gun.get('user').once(r))
  expect(document.querySelector('#name').textContent).toBe('Jon')
})

test('bind works', async () => {
  window.gun = Gun()
  gun.get('user').put({ name: 'Jon' })
  document.body.innerHTML = `
    <div x-data="{user: $gun('user')}"><span id="name" :title="user.name"></span></div>
  `
  Alpine.start()
  await new Promise(r => gun.get('user').once(r))
  expect(document.querySelector('#name').title).toBe('Jon')
})

test('empty object works', async () => {
  window.gun = Gun()
  document.body.innerHTML = `
    <div x-data="{user: $gun('nouser')}"><span id="name" x-text="JSON.stringify(user)"></span></div>
  `
  Alpine.start()
  await new Promise(r => requestAnimationFrame(r))
  await new Promise(r => gun.get('nouser').once(r))
  expect(document.querySelector('#name').textContent).toBe('{}')
})
