<script lang="ts">
  import {
    Container,
    Text,
    Image,
    Content,
    SVG,
    Video,
    type VanillaContainer,
  } from '$lib'
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, interactivity } from '@threlte/extras'
  import Fullscreen from './Fullscreen.svelte'
  import { Mesh } from 'three'

  interactivity()

  let elapsed = 0

  let root = $state<VanillaContainer>()
  let cube = new Mesh()

  useTask((delta) => {
    elapsed += delta

    const d = Math.sin(elapsed * 5) * 20
    root?.resetProperties({ width: 330 + d })

    cube.rotation.x += delta
    cube.rotation.y += delta
  })

  let clicked = $state(false)
</script>

<svelte:window onclick={() => (clicked = true)} />

<Fullscreen />

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 10]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.Group>
  <Container
    bind:ref={root}
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    borderColor="#555"
    borderWidth={2}
    padding={20}
    height={300}
    backgroundColor="#fff"
    hover={{
      backgroundColor: '#ccc',
    }}
  >
    <SVG
      src="./svelte.svg"
      width={100}
      padding={5}
    />

    <Container
      width="100%"
      padding={5}
      justifyContent="center"
      alignItems="center"
      backgroundColor="red"
      hover={{
        backgroundColor: 'purple',
      }}
      active={{
        backgroundColor: 'black',
      }}
      onclick={() => {
        console.log('click container')
      }}
      onpointerdown={(event) => console.log('pointerdown container', event)}
      onpointerup={(event) => console.log('pointerup container', event)}
      onpointerenter={() => (event) => console.log('pointerenter container', event)}
      onpointerleave={() => (event) => console.log('pointerleave container', event)}
    >
      <Text
        fontSize={30}
        text="hello uikit!"
        color="#fff"
        onclick={(event) => console.log('click text', event)}
      />
    </Container>
    <Image
      width={200}
      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
    />
  </Container>
</T.Group>

<T.Group position.x={4}>
  <Container>
    <Content
      width={100}
      height={100}
      backgroundColor="#eee"
      depthAlign="back"
    >
      <T
        is={cube}
        name="thingy"
        rotation.x={Math.PI / 4}
        rotation.y={Math.PI / 4}
        position.z={-1}
      >
        <T.BoxGeometry args={[0.1, 0.1, 0.1]} />
        <T.MeshToonMaterial color="turquoise" />
      </T>
    </Content>
  </Container>
</T.Group>

{#if clicked}
  <T.Group position.y={3}>
    <Container
      height={200}
      width={400}
    >
      <Video
        autoplay
        borderRadius={10}
        src="/BigBuckBunny_320x180.mp4"
      />
    </Container>
  </T.Group>
{/if}

<T.DirectionalLight />
<T.AmbientLight />
