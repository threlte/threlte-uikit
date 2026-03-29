<script lang="ts">
  import { T } from '@threlte/core'

  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import Fullscreen from '$lib/components/Fullscreen.svelte'
  import {
    Avatar,
    Badge,
    Button,
    Checkbox,
    Divider,
    Dropdown,
    DropdownButton,
    DropdownList,
    DropdownListItem,
    DropdownTextValue,
    IconIndicator,
    Input,
    InputField,
    Panel,
    ProgressBar,
    RadioGroup,
    RadioGroupItem,
    Slider,
    Toggle,
  } from '$lib/components/horizon/index.js'
  import { Icon } from '$lib/components/lucide/index.js'
  import {
    MailIcon,
    SearchIcon,
    StarIcon,
    TriangleAlertIcon,
  } from '$lib/components/lucide/index.js'
  import { Container, isDarkMode, Text } from '$lib/index.js'

  const mutedText = $derived(isDarkMode.current ? '#737373' : '#525252')
  const hoverBg = $derived(
    isDarkMode.current ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
  )

  let sliderValue = $state(50)
  let checkboxChecked = $state(false)
  let toggleChecked = $state(false)
  let radioValue = $state('x')
  let dropdownValue = $state<string>()
</script>

<Fullscreen
  marginX={15}
  display="flex"
  gap={15}
>
  <Container
    alignItems="flex-end"
    marginY={15}
  >
    <Button onclick={() => goto(resolve('/'))}>
      <Text
        fontSize={13}
        text="Back"
      />
    </Button>
  </Container>
</Fullscreen>

<T.Group
  position.x={-4}
  position.y={0}
>
  <Panel
    width={230}
    padding={12}
    flexDirection="column"
    gap={8}
  >
    <Text
      fontSize={12}
      text="Button variants"
      color={mutedText}
    />
    <Button variant="primary">
      <Text
        fontSize={13}
        text="Primary"
      />
    </Button>
    <Button variant="secondary">
      <Text
        fontSize={13}
        text="Secondary"
      />
    </Button>
    <Button variant="tertiary">
      <Text
        fontSize={13}
        text="Tertiary"
      />
    </Button>
    <Button
      variant="negative"
      disabled
    >
      <Text
        fontSize={13}
        text="Disabled"
      />
    </Button>
    <Divider />
    <Text
      fontSize={12}
      text="Badge"
      color={mutedText}
    />
    <Container
      display="flex"
      flexDirection="row"
      gap={6}
    >
      <Badge
        variant="primary"
        label="Primary"
      />
      <Badge
        variant="secondary"
        label="Secondary"
      />
    </Container>
    <Container
      flexDirection="row"
      gap={6}
    >
      <Badge
        variant="positive"
        label="Good"
        icon={StarIcon}
      />
      <Badge
        variant="negative"
        label="Bad"
      />
    </Container>
    <Divider />
    <Text
      fontSize={12}
      text="Avatar"
      color={mutedText}
    />
    <Container
      flexDirection="row"
      gap={6}
      alignItems="center"
    >
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
        size="sm"
      />
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
        size="md"
      />
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
        size="lg"
      />
    </Container>
    <Divider />
    <Text
      fontSize={12}
      text="Icon"
      color={mutedText}
    />
    <Container
      flexDirection="row"
      gap={8}
      alignItems="center"
    >
      <Icon
        is={TriangleAlertIcon}
        width={24}
        height={24}
      />
    </Container>
  </Panel>
</T.Group>

<T.Group
  position.x={0}
  position.y={0}
>
  <Panel
    width={220}
    padding={12}
    flexDirection="column"
    gap={8}
  >
    <Text
      fontSize={12}
      text="Checkbox"
      color={mutedText}
    />
    <Checkbox
      checked={checkboxChecked}
      oncheckedchange={(v: boolean) => (checkboxChecked = v)}
    />
    <Text
      fontSize={12}
      text="Toggle"
      color={mutedText}
    />
    <Toggle
      checked={toggleChecked}
      oncheckedchange={(v: boolean) => (toggleChecked = v)}
    />
    <Text
      fontSize={12}
      text="ProgressBar"
      color={mutedText}
    />
    <ProgressBar value={sliderValue} />
    <Text
      fontSize={12}
      text="Slider"
      color={mutedText}
    />
    <Slider
      value={sliderValue}
      min={0}
      max={100}
      onvaluechange={(v: number) => (sliderValue = v)}
    />
    <Text
      fontSize={12}
      text="IconIndicator"
      color={mutedText}
    />
    <Container
      flexDirection="row"
      gap={6}
    >
      <IconIndicator variant="none" />
      <IconIndicator variant="good" />
      <IconIndicator variant="poor" />
      <IconIndicator variant="bad" />
    </Container>
  </Panel>
</T.Group>

<T.Group
  position.x={4}
  position.y={0}
>
  <Panel
    width={220}
    padding={12}
    flexDirection="column"
    gap={8}
  >
    <Text
      fontSize={12}
      text="RadioGroup"
      color={mutedText}
    />
    <RadioGroup
      value={radioValue}
      onvaluechange={(v?: string) => v && (radioValue = v)}
    >
      <RadioGroupItem value="x">
        <Text
          fontSize={13}
          text="Option X"
        />
      </RadioGroupItem>
      <RadioGroupItem value="y">
        <Text
          fontSize={13}
          text="Option Y"
        />
      </RadioGroupItem>
    </RadioGroup>
    <Text
      fontSize={12}
      text="Input"
      color={mutedText}
    />
    <Input
      variant="text"
      textAlign="left"
      placeholder="Type here..."
      leftIcon={SearchIcon}
    />
    <Text
      fontSize={12}
      text="InputField"
      color={mutedText}
    />
    <InputField
      label="Email"
      variant="text"
      textAlign="left"
      placeholder="you@example.com"
      leftIcon={MailIcon}
    />
    <Text
      fontSize={12}
      text="Dropdown"
      color={mutedText}
    />
    <Dropdown
      value={dropdownValue}
      onvaluechange={(v?: string) => (dropdownValue = v)}
    >
      <DropdownButton />
      <DropdownTextValue placeholder="Select..." />
      <DropdownList>
        <DropdownListItem value="one">
          <Text
            fontSize={13}
            text="Option One"
          />
        </DropdownListItem>
        <DropdownListItem value="two">
          <Text
            fontSize={13}
            text="Option Two"
          />
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  </Panel>
</T.Group>

<!-- Scroll example -->

<T.Group
  position.x={8}
  position.y={0}
>
  <Panel
    width={220}
    padding={12}
    flexDirection="column"
    gap={8}
  >
    <Text
      fontSize={12}
      text="Scrollable list"
      color={mutedText}
    />
    <Container
      overflow="scroll"
      height={160}
      flexDirection="column"
      gap={4}
    >
      {#each { length: 20 }, index (index)}
        <Container
          padding={8}
          borderRadius={8}
          hover={{ backgroundColor: hoverBg }}
        >
          <Text
            fontSize={13}
            text="Item {index + 1}"
          />
        </Container>
      {/each}
    </Container>
  </Panel>
</T.Group>

<T.DirectionalLight />
<T.AmbientLight />
