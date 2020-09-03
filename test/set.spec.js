import Alpine from 'alpinejs'
import AlpineGun from 'alpine-gun'
import Gun from 'gun/gun'
import 'gun/lib/open'

test('set works', async () => {
  window.gun = Gun()
  const soul = Gun.text.random()
  gun.get(soul).put({ name: 'Jon' })
  document.body.innerHTML = `
    <div x-data="{user: $gun('${soul}')}">
      <template x-for="message in $setOf(user, 'messages')">
        <span class="message" x-text="message.text"></span>
      </template>
      <button @click="$addToSet(user, 'messages', {text: 'hi'})">
        add message
      </button>
    </div>
  `
  Alpine.start()
  await new Promise(r => gun.get(`${soul}/messages`).once(r))
  expect(document.querySelectorAll('.message').length).toBe(0)
  document.querySelector('button').click()
  console.log(await new Promise(r => gun.get(`${soul}/messages`).once(r)))
  await new Promise(r => setTimeout(r, 0))
  expect(document.querySelectorAll('.message').length).toBe(1)
  expect(document.querySelectorAll('.message')[0].textContent).toBe('hi')
})
