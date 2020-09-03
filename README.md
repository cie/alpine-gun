# Alpine GUN adapter

This is very alpha. You can use GUN with Alpine with *some* two-way bindings.


```html
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.6.0/dist/alpine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gun/lib/open.js"></script>
<script src="https://cdn.jsdelivr.net/npm/alpine-gun@0.0.0"></script>

<script>
  window.gun = Gun()
</script>

<main x-data="{user: $gun('user123'), newMessage: ''}">
  <template x-if="user.loading"><span>Loading</span></template>
  <template x-if="!user.loading">
    <div>
      <h1 x-text="user.name"></h1>
      <p>Name: <input x-model="user.name"></p>
      <h2>Messages</h2>
      <template x-if="!user.messages"><p>No messages.</p></template>
      <template x-if="user.messages" x-for="message in $setOf(user, 'messages')">
        <div class="message" x-text="message.text"></div>
      </template>
      <input
        x-model="newMessage"
        x-on:keydown.enter="$addToSet(user, 'messages', {text: newMessage}); newMessage=''"
      >
    <div>
  </template>
</main>
```

## Interface

* `$gun(soul)` Returns a proxy object that contains the entire tree of the node (with `open()`), including `_` properties for metadata. Will update the component on every update of the data. TODO currently updates the entire tree. TODO currently there is no way to unsubscribe
* `$setOf(node object, property name)` Returns an array with the values in the node TODO cannot get keys, maybe rename to `$entries` and return key value pairs?
* `$addToSet(node object, property name, value)` Does `gun(node soul).get(property name).set(value)`.
