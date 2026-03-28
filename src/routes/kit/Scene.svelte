<script lang="ts">
  import { Text } from '$lib/index.js'
  import {
    Alert,
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
  import { Container } from '$lib/index.js'
  import { T } from '@threlte/core'
  import { OrbitControls, interactivity } from '@threlte/extras'

  interactivity()

  let sliderValue = $state(40)
  let switchChecked = $state(false)
  let checkboxChecked = $state(false)
  let radioValue = $state('a')
  let toggleChecked = $state(false)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 15]}
  oncreate={(ref) => ref.lookAt(0, -5, 0)}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<!-- Row 0: Buttons, Badge, Label, Avatar, Separator, Skeleton -->

<T.Group
  position.x={-4}
  position.y={0}
>
  <Container
    flexDirection="column"
    gap={6}
    padding={12}
    backgroundColor="#fff"
    borderColor="#ccc"
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Button variants"
      color="#666"
    />
    <Button
      ><Text
        fontSize={13}
        text="Default"
      /></Button
    >
    <Button variant="destructive"
      ><Text
        fontSize={13}
        text="Destructive"
      /></Button
    >
    <Button variant="outline"
      ><Text
        fontSize={13}
        text="Outline"
      /></Button
    >
    <Button variant="secondary"
      ><Text
        fontSize={13}
        text="Secondary"
      /></Button
    >
    <Button variant="ghost"
      ><Text
        fontSize={13}
        text="Ghost"
      /></Button
    >
    <Button disabled
      ><Text
        fontSize={13}
        text="Disabled"
      /></Button
    >
    <Separator />
    <Text
      fontSize={12}
      text="Badge variants"
      color="#666"
    />
    <Container
      flexDirection="row"
      gap={4}
    >
      <Badge
        ><Text
          fontSize={11}
          text="Default"
        /></Badge
      >
      <Badge variant="secondary"
        ><Text
          fontSize={11}
          text="Secondary"
        /></Badge
      >
      <Badge variant="destructive"
        ><Text
          fontSize={11}
          text="Destructive"
        /></Badge
      >
      <Badge variant="outline"
        ><Text
          fontSize={11}
          text="Outline"
        /></Badge
      >
    </Container>
    <Separator />
    <Label
      ><Text
        fontSize={13}
        text="Label text"
      /></Label
    >
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
        color="#333"
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
    backgroundColor="#fff"
    borderColor="#ccc"
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Progress"
      color="#666"
    />
    <Progress value={sliderValue} />
    <Text
      fontSize={12}
      text="Skeleton"
      color="#666"
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
      color="#666"
    />
    <Switch
      checked={switchChecked}
      onCheckedChange={(v) => (switchChecked = v)}
    />
    <Text
      fontSize={12}
      text="Checkbox"
      color="#666"
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
        color="#333"
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
    backgroundColor="#fff"
    borderColor="#ccc"
    borderWidth={1}
    width={220}
  >
    <Text
      fontSize={12}
      text="Slider"
      color="#666"
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
      color="#666"
    />
    <RadioGroup
      value={radioValue}
      onValueChange={(v) => v && (radioValue = v)}
    >
      <RadioGroupItem value="a"
        ><Text
          fontSize={13}
          text="Option A"
          color="#333"
        /></RadioGroupItem
      >
      <RadioGroupItem value="b"
        ><Text
          fontSize={13}
          text="Option B"
          color="#333"
        /></RadioGroupItem
      >
      <RadioGroupItem value="c"
        ><Text
          fontSize={13}
          text="Option C"
          color="#333"
        /></RadioGroupItem
      >
    </RadioGroup>
    <Separator />
    <Text
      fontSize={12}
      text="Toggle"
      color="#666"
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
      color="#666"
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
    backgroundColor="#fff"
    borderColor="#ccc"
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
        color="#666"
      />
    </Container>
    <Accordion width="100%">
      <AccordionItem value="item-1">
        <AccordionTrigger paddingX={12}>
          <Text
            fontSize={13}
            text="Is it accessible?"
            color="#333"
          />
        </AccordionTrigger>
        <AccordionContent paddingX={12}>
          <Text
            fontSize={13}
            text="Yes. It adheres to the WAI-ARIA design pattern."
            color="#555"
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger paddingX={12}>
          <Text
            fontSize={13}
            text="Is it styled?"
            color="#333"
          />
        </AccordionTrigger>
        <AccordionContent paddingX={12}>
          <Text
            fontSize={13}
            text="Yes. It comes with default styles."
            color="#555"
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
    backgroundColor="#fff"
    borderColor="#ccc"
    borderWidth={1}
    width={240}
    padding={12}
  >
    <Text
      fontSize={12}
      text="Tabs"
      color="#666"
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
          color="#555"
        />
      </TabsContent>
      <TabsContent value="password">
        <Text
          fontSize={13}
          text="Change your password here."
          color="#555"
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
        color="#555"
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
      <AlertTitle
        ><Text
          fontSize={14}
          text="Heads up!"
        /></AlertTitle
      >
      <AlertDescription
        ><Text
          fontSize={13}
          text="You can add components to your app."
        /></AlertDescription
      >
    </Alert>
    <Alert variant="destructive">
      <AlertTitle
        ><Text
          fontSize={14}
          text="Error"
        /></AlertTitle
      >
      <AlertDescription
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
      backgroundColor="#fff"
      borderColor="#ccc"
      borderWidth={1}
    >
      <Text
        fontSize={12}
        text="KitInput / KitTextarea"
        color="#666"
      />
      <KitInput placeholder="Email" />
      <KitTextarea />
    </Container>
  </Container>
</T.Group>

<T.DirectionalLight />
<T.AmbientLight />
