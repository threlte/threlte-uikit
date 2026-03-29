<script lang="ts">
  import { Container, Text } from '$lib/index.js'
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
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { isDarkMode } from '@pmndrs/uikit'
  import { fromStore } from 'svelte/store'

  interactivity()

  const _dark = fromStore(isDarkMode)
  const dark = $derived(_dark.current)
  const mutedText = $derived(dark ? '#737373' : '#525252')
  const hoverBg = $derived(dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')

  let sliderValue = $state(50)
  let checkboxChecked = $state(false)
  let toggleChecked = $state(false)
  let radioValue = $state('x')
  let dropdownValue = $state<string>()
</script>

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
      onCheckedChange={(v) => (checkboxChecked = v)}
    />
    <Text
      fontSize={12}
      text="Toggle"
      color={mutedText}
    />
    <Toggle
      checked={toggleChecked}
      onCheckedChange={(v) => (toggleChecked = v)}
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
      onValueChange={(v) => (sliderValue = v)}
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
      onValueChange={(v) => v && (radioValue = v)}
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
      onValueChange={(v) => (dropdownValue = v)}
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
      {#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
        <Container
          padding={8}
          borderRadius={8}
          hover={{ backgroundColor: hoverBg }}
        >
          <Text
            fontSize={13}
            text="Item {n}"
          />
        </Container>
      {/each}
    </Container>
  </Panel>
</T.Group>

<T.DirectionalLight />
<T.AmbientLight />
