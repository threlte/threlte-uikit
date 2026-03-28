<script lang="ts">
  import {
    Container,
    Content,
    Custom,
    Image,
    Input,
    SVG,
    Text,
    Textarea,
    Fullscreen,
    Video,
    type VanillaContainer,
  } from '$lib/index.js'
  import { T, useTask } from '@threlte/core'
  import { OrbitControls, interactivity } from '@threlte/extras'
  import { Mesh } from 'three'

  interactivity()

  let elapsed = 0
  let root = $state<VanillaContainer>()
  let cube = new Mesh()

  useTask((delta) => {
    elapsed += delta
    root?.resetProperties({ width: 330 + Math.sin(elapsed * 5) * 20 })
    cube.rotation.x += delta
    cube.rotation.y += delta
  })

  let active = $state(false)
  let clicked = $state(false)
</script>

<svelte:window onclick={() => (clicked = true)} />

<Fullscreen>
  <Container alignItems="flex-end">
    <Container
      backgroundColor={active ? 'black' : '#eee'}
      hover={{ backgroundColor: active ? 'black' : '#ddd' }}
      padding={10}
      margin={10}
      onclick={() => {
        active = true
        navigator.clipboard.writeText('npm i threlte-uikit')
        setTimeout(() => (active = false), 1000)
      }}
    >
      <Text
        text={active ? 'copied!' : 'npm i threlte-uikit'}
        color={active ? 'white' : 'black'}
      />
    </Container>
  </Container>
</Fullscreen>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 15]}
  oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.Group
  position.x={0}
  position.y={0}
>
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
    hover={{ backgroundColor: '#ccc' }}
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
      hover={{ backgroundColor: 'purple' }}
      active={{ backgroundColor: 'black' }}
      onclick={() => console.log('click container')}
    >
      <Text
        fontSize={30}
        text="hello uikit!"
        color="#fff"
      />
    </Container>
    <Image
      width={200}
      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
    />
  </Container>
</T.Group>

<T.Group
  position.x={4}
  position.y={0}
>
  <Container>
    <Content
      width={100}
      height={100}
      backgroundColor="#eee"
      depthAlign="back"
    >
      <T
        is={cube}
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

<T.Group
  position.x={8}
  position.y={0}
>
  <Container
    flexDirection="column"
    gap={8}
    padding={10}
    backgroundColor="#fff"
    borderColor="#ccc"
    borderWidth={1}
    width={200}
  >
    <Text
      fontSize={12}
      text="Input / Textarea / Custom"
      color="#666"
    />
    <Input
      height={32}
      fontSize={13}
      backgroundColor="#f5f5f5"
      borderColor="#aaa"
      borderWidth={1}
      padding={6}
      placeholder="type here..."
    />
    <Textarea
      height={60}
      fontSize={13}
      backgroundColor="#f5f5f5"
      borderColor="#aaa"
      borderWidth={1}
      padding={6}
    />
    <Custom
      width={50}
      height={50}
    ></Custom>
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
