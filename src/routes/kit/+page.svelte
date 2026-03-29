<script lang="ts">
  import { Container, isDarkMode, Text } from '$lib/index.js'
  import { Icon } from '$lib/components/lucide/index.js'
  import { InfoIcon, TriangleAlertIcon } from '$lib/components/lucide/index.js'
  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Avatar,
    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Checkbox,
    KitInput,
    KitTextarea,
    Label,
    Progress,
    RadioGroup,
    RadioGroupItem,
    Separator,
    Skeleton,
    Slider,
    Switch,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Toggle,
    ToggleGroup,
    ToggleGroupItem,
  } from '$lib/components/kit/index.js'
  import { T } from '@threlte/core'
  import Fullscreen from '$lib/components/Fullscreen.svelte'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'

  const dark = $derived(isDarkMode.current)
  const bg = $derived(dark ? '#0a0a0a' : '#ffffff')
  const border = $derived(dark ? '#262626' : '#e5e5e5')
  const mutedText = $derived(dark ? '#737373' : '#525252')
  const text = $derived(dark ? '#fafafa' : '#1a1a1a')
  const muted = $derived(dark ? '#171717' : '#f5f5f5')
  const accentHover = $derived(dark ? '#1f1f1f' : '#e8e8e8')

  let sliderValue = $state(40)
  let switchChecked = $state(false)
  let checkboxChecked = $state(false)
  let radioValue = $state('a')
  let toggleChecked = $state(false)
</script>

<!-- Row 0: Buttons, Badge, Label, Avatar, Separator, Skeleton -->

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
  <Container
    flexDirection="column"
    gap={6}
    padding={12}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Button variants"
      color={mutedText}
    />
    <Button>
      <Text
        fontSize={13}
        text="Default"
      />
    </Button>
    <Button variant="destructive">
      <Text
        fontSize={13}
        text="Destructive"
      />
    </Button>
    <Button variant="outline">
      <Text
        fontSize={13}
        text="Outline"
      />
    </Button>
    <Button variant="secondary">
      <Text
        fontSize={13}
        text="Secondary"
      />
    </Button>
    <Button variant="ghost">
      <Text
        fontSize={13}
        text="Ghost"
      />
    </Button>
    <Button disabled>
      <Text
        fontSize={13}
        text="Disabled"
      />
    </Button>
    <Separator />
    <Text
      fontSize={12}
      text="Badge variants"
      color={mutedText}
    />
    <Container
      flexDirection="row"
      gap={4}
    >
      <Badge>
        <Text
          fontSize={11}
          text="Default"
        />
      </Badge>
      <Badge variant="secondary">
        <Text
          fontSize={11}
          text="Secondary"
        />
      </Badge>
    </Container>
    <Container
      flexDirection="row"
      gap={4}
    >
      <Badge variant="destructive">
        <Text
          fontSize={11}
          text="Destructive"
        />
      </Badge>
      <Badge variant="outline">
        <Text
          fontSize={11}
          text="Outline"
        />
      </Badge>
    </Container>
    <Separator />
    <Label>
      <Text
        fontSize={13}
        text="Label text"
      />
    </Label>
    <Container
      flexDirection="row"
      gap={8}
      alignItems="center"
    >
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Lil-Bub-2013.jpg"
      />
      <Text
        fontSize={12}
        text="Avatar"
        color={text}
      />
    </Container>
  </Container>
</T.Group>

<T.Group
  position.x={0}
  position.y={0}
>
  <Container
    flexDirection="column"
    gap={8}
    padding={12}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Progress"
      color={mutedText}
    />
    <Progress value={sliderValue} />
    <Text
      fontSize={12}
      text="Skeleton"
      color={mutedText}
    />
    <Skeleton
      width="100%"
      height={16}
    />
    <Skeleton
      width="80%"
      height={16}
    />
    <Skeleton
      width="60%"
      height={16}
    />
    <Separator />
    <Text
      fontSize={12}
      text="Switch"
      color={mutedText}
    />
    <Switch
      checked={switchChecked}
      onCheckedChange={(v) => (switchChecked = v)}
    />
    <Text
      fontSize={12}
      text="Checkbox"
      color={mutedText}
    />
    <Container
      flexDirection="row"
      gap={8}
      alignItems="center"
    >
      <Checkbox
        checked={checkboxChecked}
        onCheckedChange={(v) => (checkboxChecked = v)}
      />
      <Text
        fontSize={13}
        text="Check me"
        color={text}
      />
    </Container>
  </Container>
</T.Group>

<T.Group
  position.x={4}
  position.y={0}
>
  <Container
    flexDirection="column"
    gap={8}
    padding={12}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={220}
  >
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
    <Separator />
    <Text
      fontSize={12}
      text="RadioGroup"
      color={mutedText}
    />
    <RadioGroup
      value={radioValue}
      onValueChange={(v) => v && (radioValue = v)}
    >
      <RadioGroupItem value="a"
        ><Text
          fontSize={13}
          text="Option A"
          color={text}
        /></RadioGroupItem
      >
      <RadioGroupItem value="b"
        ><Text
          fontSize={13}
          text="Option B"
          color={text}
        /></RadioGroupItem
      >
      <RadioGroupItem value="c"
        ><Text
          fontSize={13}
          text="Option C"
          color={text}
        /></RadioGroupItem
      >
    </RadioGroup>
    <Separator />
    <Text
      fontSize={12}
      text="Toggle"
      color={mutedText}
    />
    <Toggle
      checked={toggleChecked}
      onCheckedChange={(v) => (toggleChecked = v)}
    >
      <Text
        fontSize={13}
        text="Bold"
      />
    </Toggle>
    <Text
      fontSize={12}
      text="ToggleGroup"
      color={mutedText}
    />
    <ToggleGroup>
      <ToggleGroupItem
        ><Text
          fontSize={12}
          text="Left"
        /></ToggleGroupItem
      >
      <ToggleGroupItem
        ><Text
          fontSize={12}
          text="Center"
        /></ToggleGroupItem
      >
      <ToggleGroupItem
        ><Text
          fontSize={12}
          text="Right"
        /></ToggleGroupItem
      >
    </ToggleGroup>
  </Container>
</T.Group>

<!-- Row 1: Accordion, Tabs, Card, Alert, KitInput/KitTextarea -->

<T.Group
  position.x={-4}
  position.y={-5}
>
  <Container
    flexDirection="column"
    gap={0}
    padding={0}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={220}
  >
    <Container
      padding={12}
      paddingBottom={0}
    >
      <Text
        fontSize={12}
        text="Accordion"
        color={mutedText}
      />
    </Container>
    <Accordion width="100%">
      <AccordionItem value="item-1">
        <AccordionTrigger paddingX={12}>
          <Text
            fontSize={13}
            text="Is it accessible?"
            color={text}
          />
        </AccordionTrigger>
        <AccordionContent paddingX={12}>
          <Text
            fontSize={13}
            text="Yes. It adheres to the WAI-ARIA design pattern."
            color={mutedText}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger paddingX={12}>
          <Text
            fontSize={13}
            text="Is it styled?"
            color={text}
          />
        </AccordionTrigger>
        <AccordionContent paddingX={12}>
          <Text
            fontSize={13}
            text="Yes. It comes with default styles."
            color={mutedText}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Container>
</T.Group>

<T.Group
  position.x={0}
  position.y={-5}
>
  <Container
    flexDirection="column"
    gap={0}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={240}
    padding={12}
  >
    <Text
      fontSize={12}
      text="Tabs"
      color={mutedText}
      marginBottom={8}
    />
    <Tabs
      defaultValue="account"
      width="100%"
    >
      <TabsList width="100%">
        <TabsTrigger
          value="account"
          flexGrow={1}
          ><Text
            fontSize={12}
            text="Account"
          /></TabsTrigger
        >
        <TabsTrigger
          value="password"
          flexGrow={1}
          ><Text
            fontSize={12}
            text="Password"
          /></TabsTrigger
        >
      </TabsList>
      <TabsContent value="account">
        <Text
          fontSize={13}
          text="Manage your account settings."
          color={mutedText}
        />
      </TabsContent>
      <TabsContent value="password">
        <Text
          fontSize={13}
          text="Change your password here."
          color={mutedText}
        />
      </TabsContent>
    </Tabs>
  </Container>
</T.Group>

<T.Group
  position.x={4}
  position.y={-5}
>
  <Card width={220}>
    <CardHeader>
      <CardTitle
        ><Text
          fontSize={18}
          text="Card Title"
        /></CardTitle
      >
      <CardDescription
        ><Text
          fontSize={13}
          text="Card description goes here."
        /></CardDescription
      >
    </CardHeader>
    <CardContent>
      <Text
        fontSize={13}
        text="Card content area."
        color={mutedText}
      />
    </CardContent>
    <CardFooter>
      <Button
        ><Text
          fontSize={13}
          text="Action"
        /></Button
      >
    </CardFooter>
  </Card>
</T.Group>

<T.Group
  position.x={8}
  position.y={-5}
>
  <Container
    flexDirection="column"
    gap={8}
    width={220}
  >
    <Alert>
      <AlertIcon
        ><Icon
          is={InfoIcon}
          width={16}
          height={16}
        /></AlertIcon
      >
      <AlertTitle paddingLeft={24}
        ><Text
          fontSize={14}
          text="Heads up!"
        /></AlertTitle
      >
      <AlertDescription paddingLeft={24}
        ><Text
          fontSize={13}
          text="You can add components to your app."
        /></AlertDescription
      >
    </Alert>
    <Alert variant="destructive">
      <AlertIcon
        ><Icon
          is={TriangleAlertIcon}
          width={16}
          height={16}
        /></AlertIcon
      >
      <AlertTitle paddingLeft={24}
        ><Text
          fontSize={14}
          text="Error"
        /></AlertTitle
      >
      <AlertDescription paddingLeft={24}
        ><Text
          fontSize={13}
          text="Your session has expired."
        /></AlertDescription
      >
    </Alert>
    <Container
      flexDirection="column"
      gap={6}
      padding={12}
      backgroundColor={bg}
      borderColor={border}
      borderWidth={1}
    >
      <Text
        fontSize={12}
        text="KitInput / KitTextarea"
        color={mutedText}
      />
      <KitInput placeholder="Email" />
      <KitTextarea placeholder="Type here.." />
    </Container>
  </Container>
</T.Group>

<!-- Scroll example -->

<T.Group
  position.x={0}
  position.y={-10}
>
  <Container
    flexDirection="column"
    gap={6}
    padding={12}
    backgroundColor={bg}
    borderColor={border}
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Scrollable list"
      color={mutedText}
    />
    <Container
      overflow="scroll"
      height={120}
      flexDirection="column"
      gap={4}
    >
      {#each { length: 20 }, index (index)}
        <Container
          padding={8}
          backgroundColor={muted}
          borderRadius={4}
          hover={{ backgroundColor: accentHover }}
        >
          <Text
            fontSize={13}
            text="Item {index + 1}"
            color={text}
          />
        </Container>
      {/each}
    </Container>
  </Container>
</T.Group>

<T.DirectionalLight />
<T.AmbientLight />
